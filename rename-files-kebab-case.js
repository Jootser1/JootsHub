#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🔄 Renommage des fichiers en kebab-case et mise à jour des imports...\n')

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
 * Met à jour les imports dans un fichier
 */
function updateImportsInFile(filePath, renameMap) {
  try {
    let content = fs.readFileSync(filePath, 'utf8')
    let hasChanges = false

    // Parcourir toutes les correspondances de renommage
    Object.entries(renameMap).forEach(([oldPath, newPath]) => {
      const oldName = path.basename(oldPath, path.extname(oldPath))
      const newName = path.basename(newPath, path.extname(newPath))
      
      // Patterns d'import à rechercher
      const patterns = [
        // import ... from './oldName'
        new RegExp(`(import\\s+[^'"]*)(['"]\\./[^'"]*/)${oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(['"])`, 'g'),
        // import ... from '../oldName'
        new RegExp(`(import\\s+[^'"]*)(['"]\\.\\.\/[^'"]*/)${oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(['"])`, 'g'),
        // import ... from '@/features/.../oldName'
        new RegExp(`(import\\s+[^'"]*)(['"]@\/[^'"]*/)${oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(['"])`, 'g'),
      ]

      patterns.forEach(pattern => {
        const newContent = content.replace(pattern, `$1$2${newName}$3`)
        if (newContent !== content) {
          content = newContent
          hasChanges = true
        }
      })
    })

    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8')
      return true
    }
    return false
  } catch (error) {
    console.error(`❌ Erreur lors de la mise à jour des imports dans ${filePath}:`, error.message)
    return false
  }
}

/**
 * Fonction principale
 */
function main() {
  const projectRoot = process.cwd()
  console.log(`📁 Traitement du projet: ${projectRoot}\n`)

  // Obtenir tous les fichiers
  const allFiles = getAllFiles(projectRoot)
  
  // Identifier les fichiers à renommer
  const filesToRename = []
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

  if (filesToRename.length === 0) {
    console.log('✅ Tous les fichiers respectent déjà les conventions de nommage !')
    return
  }

  console.log(`🔄 Renommage de ${filesToRename.length} fichiers...\n`)

  // Créer la map de renommage
  const renameMap = {}
  filesToRename.forEach(file => {
    renameMap[file.current] = file.new
  })

  // Étape 1: Renommer les fichiers
  let renamedCount = 0
  filesToRename.forEach(file => {
    try {
      fs.renameSync(file.current, file.new)
      console.log(`✅ ${file.currentName} → ${file.newName}`)
      renamedCount++
    } catch (error) {
      console.error(`❌ Erreur lors du renommage de ${file.currentName}:`, error.message)
    }
  })

  console.log(`\n📝 ${renamedCount} fichiers renommés avec succès\n`)

  // Étape 2: Mettre à jour les imports dans tous les fichiers
  console.log('🔄 Mise à jour des imports...\n')
  
  // Obtenir la nouvelle liste de fichiers après renommage
  const updatedFiles = getAllFiles(projectRoot)
  let updatedImportsCount = 0

  updatedFiles.forEach(filePath => {
    if (updateImportsInFile(filePath, renameMap)) {
      updatedImportsCount++
    }
  })

  console.log(`\n📈 Résumé:`)
  console.log(`   • ${renamedCount} fichiers renommés en kebab-case`)
  console.log(`   • ${updatedImportsCount} fichiers avec imports mis à jour`)
  console.log(`\n✅ Renommage terminé ! Tous les fichiers frontend respectent maintenant la convention kebab-case.`)
}

// Exécuter le script
if (require.main === module) {
  main()
} 