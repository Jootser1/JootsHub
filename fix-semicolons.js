#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🔧 Suppression des semicolons selon les règles Cursor JootsHub...\n')

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
 * Supprime les semicolons d'un fichier
 */
function removeSemicolons(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8')
    const originalContent = content

    // Supprimer les semicolons en fin de ligne
    content = content.replace(/;(\s*)$/gm, '$1')

    // Supprimer les semicolons avant les commentaires
    content = content.replace(/;(\s*\/\/)/g, '$1')

    // Supprimer les semicolons avant les accolades fermantes
    content = content.replace(/;(\s*})/g, '$1')

    // Garder les semicolons nécessaires pour disambiguation
    // Cas 1: IIFE (Immediately Invoked Function Expression)
    content = content.replace(/^(\s*)\(async \(\) => \{/gm, '$1;(async () => {')
    content = content.replace(/^(\s*)\(\(\) => \{/gm, '$1;(() => {')

    // Cas 2: Array access après une ligne
    content = content.replace(/^(\s*)\[/gm, '$1;[')

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8')
      console.log(`✅ Corrigé: ${filePath}`)
      return true
    }

    return false
  } catch (error) {
    console.error(`❌ Erreur lors de la correction de ${filePath}:`, error.message)
    return false
  }
}

/**
 * Fonction principale
 */
function main() {
  const projectRoot = process.cwd()
  console.log(`📁 Analyse du projet: ${projectRoot}\n`)

  // Obtenir tous les fichiers
  const allFiles = getAllFiles(projectRoot)
  console.log(`📊 ${allFiles.length} fichiers trouvés\n`)

  let fixedFiles = 0

  // Traiter chaque fichier
  allFiles.forEach(filePath => {
    const wasFixed = removeSemicolons(filePath)
    if (wasFixed) {
      fixedFiles++
    }
  })

  console.log('\n📈 Résumé:')
  console.log(`✅ ${fixedFiles} fichiers corrigés`)
  console.log('\n🎉 Suppression des semicolons terminée !')
}

// Exécuter le script
if (require.main === module) {
  main()
}
