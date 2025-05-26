#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🔍 Identification des fichiers selon les vraies règles Cursor JootsHub...\n')

// Extensions de fichiers à traiter
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx']

// Dossiers à exclure
const EXCLUDE_DIRS = ['node_modules', '.next', 'dist', 'build', '.git', 'coverage', 'logs']

/**
 * Parcourt récursivement les fichiers du projet
 */
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      if (!EXCLUDE_DIRS.includes(file)) {
        getAllFiles(filePath, fileList)
      }
    } else {
      const ext = path.extname(file)
      if (FILE_EXTENSIONS.includes(ext)) {
        fileList.push(filePath)
      }
    }
  })

  return fileList
}

/**
 * Détermine le type de fichier selon son contenu
 */
function getFileType(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const fileName = path.basename(filePath)
    
    // 1. Fichiers backend NestJS - GARDER leurs conventions
    const isNestJSFile = /\.(controller|service|module|guard|interceptor|middleware|dto|entity|gateway|decorator)\.ts$/.test(fileName)
    if (isNestJSFile) return 'nestjs'
    
    // 2. Fichiers de test - GARDER leurs conventions
    const isTestFile = fileName.includes('.spec.') || fileName.includes('.test.') || fileName.includes('.e2e-')
    if (isTestFile) return 'test'
    
    // 3. Fichiers de configuration - GARDER leurs conventions
    const isConfigFile = /\.(config|d)\.ts$/.test(fileName) || 
                        /\.(eslintrc|prettierrc|postcss\.config)\.js$/.test(fileName) ||
                        fileName === 'next.config.js' || 
                        fileName === 'next.config.ts' ||
                        fileName === 'tailwind.config.ts'
    if (isConfigFile) return 'config'
    
    // 4. Fichiers backend (dans joots-backend/) - GARDER leurs conventions
    if (filePath.includes('joots-backend/')) return 'backend'
    
    // 5. Exceptions spéciales Next.js - GARDER leurs conventions
    if (fileName === 'page.tsx' || fileName === 'layout.tsx' || fileName === 'loading.tsx' || 
        fileName === 'error.tsx' || fileName === 'not-found.tsx') {
      return 'nextjs-special'
    }
    
    // 6. Providers spéciaux - GARDER PascalCase
    if (fileName.includes('Provider.tsx') || fileName === 'GlobalUserSocketProvider.tsx') {
      return 'provider-special'
    }
    
    // 5. Analyser le contenu pour déterminer le type
    
    // Hook personnalisé (export function useXxx) - PRIORITÉ ABSOLUE
    if (/export\s+(default\s+)?function\s+use[A-Z][a-zA-Z]*/.test(content) || 
        fileName.startsWith('use') && /^use[A-Z]/.test(fileName)) {
      return 'hook'
    }
    
    // Composant React - Détection améliorée
    // 1. Fichier .tsx (très probablement un composant)
    if (fileName.endsWith('.tsx')) {
      return 'component'
    }
    
    // 2. Export function avec PascalCase + JSX
    if (/export\s+(default\s+)?function\s+[A-Z][a-zA-Z]*/.test(content) && 
        (content.includes('return') && (content.includes('<') || content.includes('jsx')))) {
      return 'component'
    }
    
    // 3. Patterns spécifiques de composants
    if (/export\s+(default\s+)?function\s+[A-Z]/.test(content) && 
        (/return\s*\([\s\S]*</.test(content) || /return\s*</.test(content))) {
      return 'component'
    }
    
    // Store Zustand
    if (/create<.*>\(\(set.*get.*\)\s*=>\s*\({/.test(content) || fileName.includes('Store')) {
      return 'store'
    }
    
    // Service (fonctions d'API, utilitaires métier)
    if (fileName.includes('Service') || fileName.includes('service') || 
        /export\s+(const|function)\s+\w*(Service|Api|Client)/.test(content)) {
      return 'service'
    }
    
    // Types/Interfaces uniquement
    if (/^(import.*\n)*\s*(export\s+)?(interface|type)\s+/.test(content) && 
        !/export\s+(const|function|default)/.test(content)) {
      return 'types'
    }
    
    // Utilitaires (fonctions helper)
    if (/export\s+(const|function)\s+[a-z]/.test(content)) {
      return 'utils'
    }
    
    return 'other'
  } catch (error) {
    return 'unknown'
  }
}

/**
 * Détermine la convention de nommage selon le type
 */
function getExpectedNaming(fileType) {
  switch (fileType) {
    case 'component':
      return 'PascalCase' // UserCard.tsx
    case 'hook':
      return 'camelCase'  // useAuth.ts
    case 'store':
    case 'service':
    case 'utils':
    case 'types':
    case 'other':
      return 'kebab-case' // chat-service.ts, user.types.ts
    case 'nestjs':
    case 'test':
    case 'config':
    case 'backend':
    case 'nextjs-special':
    case 'provider-special':
      return 'keep' // Garder la convention existante
    default:
      return 'kebab-case'
  }
}

/**
 * Vérifie si un fichier respecte sa convention attendue
 */
function isCorrectlyNamed(filePath, fileType) {
  const fileName = path.basename(filePath)
  const expectedNaming = getExpectedNaming(fileType)
  
  if (expectedNaming === 'keep') return true
  
  const nameWithoutExt = fileName.replace(/\.[^.]+$/, '')
  
  switch (expectedNaming) {
    case 'PascalCase':
      return /^[A-Z][a-zA-Z0-9]*$/.test(nameWithoutExt)
    case 'camelCase':
      return /^[a-z][a-zA-Z0-9]*$/.test(nameWithoutExt)
    case 'kebab-case':
      return /^[a-z0-9-]+$/.test(nameWithoutExt)
    default:
      return true
  }
}

/**
 * Convertit un nom selon la convention
 */
function convertToNaming(fileName, targetNaming) {
  const [name, ...extensions] = fileName.split('.')
  let convertedName = name
  
  switch (targetNaming) {
    case 'PascalCase':
      // kebab-case ou camelCase vers PascalCase
      convertedName = name
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')
      break
    case 'camelCase':
      // PascalCase ou kebab-case vers camelCase
      if (/^[A-Z]/.test(name)) {
        // PascalCase vers camelCase
        convertedName = name.charAt(0).toLowerCase() + name.slice(1)
      } else {
        // kebab-case vers camelCase
        convertedName = name
          .split('-')
          .map((part, index) => 
            index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
          )
          .join('')
      }
      break
    case 'kebab-case':
      // PascalCase ou camelCase vers kebab-case
      convertedName = name
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase()
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
      break
  }
  
  return `${convertedName}.${extensions.join('.')}`
}

/**
 * Fonction principale
 */
function main() {
  const projectRoot = process.cwd()
  console.log(`📁 Analyse du projet: ${projectRoot}\n`)

  // Obtenir tous les fichiers
  const allFiles = getAllFiles(projectRoot)
  console.log(`📊 ${allFiles.length} fichiers analysés\n`)

  const filesToRename = []
  const filesByType = {}

  // Analyser chaque fichier
  allFiles.forEach(filePath => {
    const fileType = getFileType(filePath)
    const expectedNaming = getExpectedNaming(fileType)
    
    if (!filesByType[fileType]) filesByType[fileType] = []
    filesByType[fileType].push(filePath)
    
    if (!isCorrectlyNamed(filePath, fileType) && expectedNaming !== 'keep') {
      const fileName = path.basename(filePath)
      const newFileName = convertToNaming(fileName, expectedNaming)
      const dirPath = path.dirname(filePath)
      const newFilePath = path.join(dirPath, newFileName)
      
      filesToRename.push({
        current: filePath,
        new: newFilePath,
        currentName: fileName,
        newName: newFileName,
        type: fileType,
        expectedNaming
      })
    }
  })

  // Afficher les statistiques par type
  console.log('📊 **Analyse par type de fichier :**\n')
  Object.entries(filesByType).forEach(([type, files]) => {
    const expectedNaming = getExpectedNaming(type)
    console.log(`📁 ${type} (${expectedNaming}) : ${files.length} fichiers`)
  })
  console.log()

  // Afficher les fichiers à renommer
  if (filesToRename.length === 0) {
    console.log('✅ Tous les fichiers respectent leurs conventions de nommage !')
    return
  }

  console.log(`🔄 ${filesToRename.length} fichiers à renommer :\n`)
  
  // Grouper par type pour une meilleure lisibilité
  const byType = {}
  filesToRename.forEach(file => {
    if (!byType[file.type]) byType[file.type] = []
    byType[file.type].push(file)
  })

  Object.entries(byType).forEach(([type, files]) => {
    const expectedNaming = getExpectedNaming(type)
    console.log(`📁 **${type}** (${expectedNaming}) :`)
    files.forEach(file => {
      console.log(`   ${file.currentName} → ${file.newName}`)
    })
    console.log()
  })

  console.log(`📈 **Résumé :**`)
  console.log(`   • Composants (PascalCase) : ${(byType.component || []).length} fichiers`)
  console.log(`   • Hooks (camelCase) : ${(byType.hook || []).length} fichiers`) 
  console.log(`   • Services/Utils (kebab-case) : ${(byType.service || []).length + (byType.utils || []).length + (byType.other || []).length} fichiers`)
  console.log(`   • Types (kebab-case) : ${(byType.types || []).length} fichiers`)
  console.log(`   • Stores (kebab-case) : ${(byType.store || []).length} fichiers`)
}

// Exécuter le script
if (require.main === module) {
  main()
} 