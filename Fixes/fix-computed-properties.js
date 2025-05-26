#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🔧 Correction des propriétés calculées...\n')

// Fichiers avec des erreurs de propriétés calculées
const FILES_TO_FIX = [
  'joots-frontend/src/features/chat/stores/chatStore.ts',
  'joots-frontend/src/features/contacts/stores/contactStore.ts',
  'joots-frontend/src/features/chat/sockets/ChatSocketProvider.tsx',
  'joots-frontend/src/features/user/sockets/GlobalUserSocketProvider.tsx',
  'joots-frontend/src/hooks/useSocketManager.ts'
]

/**
 * Corrige les propriétés calculées dans un fichier
 */
function fixComputedProperties(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8')
    const originalContent = content

    // Corriger les propriétés calculées avec semicolon incorrect
    content = content.replace(/;(\[[\w\s\.\[\]]+\]):/g, '$1:')
    
    // Corriger les tableaux de dépendances avec semicolon incorrect
    content = content.replace(/,\s*;(\[\])/g, ',\n    $1')
    content = content.replace(/,\s*;(\[[\w\s,\[\]]+\])/g, ',\n    $1')

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
  console.log(`📁 Correction des propriétés calculées\n`)

  let fixedFiles = 0

  // Traiter chaque fichier
  FILES_TO_FIX.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      const wasFixed = fixComputedProperties(filePath)
      if (wasFixed) {
        fixedFiles++
      }
    } else {
      console.log(`⚠️  Fichier non trouvé: ${filePath}`)
    }
  })

  console.log('\n📈 Résumé:')
  console.log(`✅ ${fixedFiles} fichiers corrigés`)
  console.log('\n🎉 Correction des propriétés calculées terminée !')
}

// Exécuter le script
if (require.main === module) {
  main()
} 