#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🔧 Conversion des composants React : Arrow Functions → Function Declarations\n')

// Dossiers à traiter
const TARGET_DIRS = [
  'joots-frontend/src/components',
  'joots-frontend/src/features',
  'joots-frontend/src/app',
]

/**
 * Convertit les arrow functions en function declarations pour les composants React
 */
function convertArrowToFunction(content) {
  let modified = false

  // Pattern pour détecter les composants React avec arrow functions
  const arrowComponentPattern = /export const ([A-Z][A-Za-z0-9]*)\s*=\s*\(([^)]*)\)\s*=>\s*{/g

  const convertedContent = content.replace(
    arrowComponentPattern,
    (match, componentName, params) => {
      modified = true
      return `export function ${componentName}(${params}) {`
    }
  )

  return { content: convertedContent, modified }
}

/**
 * Traite un fichier
 */
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const { content: newContent, modified } = convertArrowToFunction(content)

    if (modified) {
      fs.writeFileSync(filePath, newContent, 'utf8')
      console.log(`✅ Converti: ${filePath}`)
      return true
    }

    return false
  } catch (error) {
    console.error(`❌ Erreur lors du traitement de ${filePath}:`, error.message)
    return false
  }
}

/**
 * Parcourt récursivement les dossiers
 */
function processDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.warn(`⚠️  Dossier non trouvé: ${dir}`)
    return []
  }

  const files = []
  const items = fs.readdirSync(dir)

  items.forEach(item => {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      files.push(...processDirectory(fullPath))
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      files.push(fullPath)
    }
  })

  return files
}

/**
 * Fonction principale
 */
function main() {
  let totalFiles = 0
  let convertedFiles = 0

  TARGET_DIRS.forEach(dir => {
    console.log(`📁 Traitement du dossier: ${dir}`)
    const files = processDirectory(dir)

    files.forEach(file => {
      totalFiles++
      if (processFile(file)) {
        convertedFiles++
      }
    })
  })

  console.log('\n📊 Résumé:')
  console.log(`📁 ${totalFiles} fichiers analysés`)
  console.log(`✅ ${convertedFiles} composants convertis`)
  console.log(`🎉 Conversion terminée !`)

  if (convertedFiles > 0) {
    console.log('\n📋 Prochaines étapes:')
    console.log("1. Vérifiez que l'application fonctionne toujours")
    console.log('2. Exécutez les tests')
    console.log('3. Commitez les changements')
  }
}

// Exécuter le script
if (require.main === module) {
  main()
}

module.exports = { convertArrowToFunction, processFile }
