#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🔍 Identification des fichiers à renommer selon les règles Cursor...\n')

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
 * Vérifie si un fichier doit être renommé
 */
function shouldRename(filePath) {
  const fileName = path.basename(filePath)
  const dirPath = path.dirname(filePath)
  
  // 1. Fichiers backend NestJS - GARDER leurs conventions
  const isNestJSFile = /\.(controller|service|module|guard|interceptor|middleware|dto|entity|gateway|decorator)\.ts$/.test(fileName)
  if (isNestJSFile) return false
  
  // 2. Fichiers de test - GARDER leurs conventions
  const isTestFile = fileName.includes('.spec.') || fileName.includes('.test.') || fileName.includes('.e2e-')
  if (isTestFile) return false
  
  // 3. Fichiers de configuration - GARDER leurs conventions
  const isConfigFile = /\.(config|d)\.ts$/.test(fileName) || 
                      /\.(eslintrc|prettierrc|postcss\.config)\.js$/.test(fileName) ||
                      fileName === 'next.config.js' || 
                      fileName === 'next.config.ts' ||
                      fileName === 'tailwind.config.ts'
  if (isConfigFile) return false
  
  // 4. Exceptions spéciales - GARDER leurs noms
  const isSpecialFile = fileName === 'axiosInstance.ts'
  if (isSpecialFile) return false
  
  // 5. Fichiers backend (dans joots-backend/) - GARDER leurs conventions
  if (filePath.includes('joots-backend/')) return false
  
  // 6. Vérifier si le fichier frontend respecte kebab-case
  const isKebabCase = /^[a-z0-9-]+\.(ts|tsx|js|jsx)$/.test(fileName)
  
  // Si ce n'est pas en kebab-case ET que c'est un fichier frontend, il faut le renommer
  return !isKebabCase
}

/**
 * Convertit un nom de fichier en kebab-case
 */
function toKebabCase(fileName) {
  const [name, ...extensions] = fileName.split('.')
  const kebabName = name
    // Convertir PascalCase/camelCase en kebab-case
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
    // Nettoyer les tirets multiples
    .replace(/-+/g, '-')
    // Supprimer les tirets en début/fin
    .replace(/^-|-$/g, '')
  
  return `${kebabName}.${extensions.join('.')}`
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

  // Analyser chaque fichier
  allFiles.forEach(filePath => {
    if (shouldRename(filePath)) {
      const fileName = path.basename(filePath)
      const newFileName = toKebabCase(fileName)
      const dirPath = path.dirname(filePath)
      const newFilePath = path.join(dirPath, newFileName)
      
      filesToRename.push({
        current: filePath,
        new: newFilePath,
        currentName: fileName,
        newName: newFileName
      })
    }
  })

  // Afficher les résultats
  if (filesToRename.length === 0) {
    console.log('✅ Tous les fichiers respectent déjà les conventions de nommage !')
    return
  }

  console.log(`🔄 ${filesToRename.length} fichiers à renommer :\n`)
  
  // Grouper par dossier pour une meilleure lisibilité
  const byDirectory = {}
  filesToRename.forEach(file => {
    const dir = path.dirname(file.current)
    if (!byDirectory[dir]) byDirectory[dir] = []
    byDirectory[dir].push(file)
  })

  Object.keys(byDirectory).sort().forEach(dir => {
    console.log(`📁 ${dir}/`)
    byDirectory[dir].forEach(file => {
      console.log(`   ${file.currentName} → ${file.newName}`)
    })
    console.log()
  })

  console.log(`📈 Résumé: ${filesToRename.length} fichiers frontend à renommer en kebab-case`)
  console.log('\n💡 Ces fichiers ne respectent pas la convention kebab-case pour le frontend.')
  console.log('💡 Les fichiers backend NestJS gardent leurs conventions métier.')
}

// Exécuter le script
if (require.main === module) {
  main()
} 