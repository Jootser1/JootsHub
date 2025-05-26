#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🔧 Correction automatique selon les règles Cursor JootsHub...\n')

// Configuration des règles
const RULES = {
  // Supprimer les semicolons (sauf cas spéciaux)
  removeSemicolons: true,
  // Convertir les guillemets doubles en simples
  singleQuotes: true,
  // Vérifier l'indentation (2 espaces)
  indentation: 2,
  // Limiter les lignes à 100 caractères
  lineLength: 100,
}

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
 * Corrige un fichier selon les règles Cursor
 */
function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8')
    let modified = false

    // 1. Supprimer les semicolons (sauf cas spéciaux)
    if (RULES.removeSemicolons) {
      const originalContent = content

      // Supprimer les semicolons en fin de ligne (sauf cas spéciaux)
      content = content.replace(/;(\s*$)/gm, '$1')

      // Garder les semicolons nécessaires pour disambiguation
      // Cas 1: IIFE (Immediately Invoked Function Expression)
      content = content.replace(/^(\s*)\(async \(\) => \{/gm, '$1;(async () => {')
      content = content.replace(/^(\s*)\(\(\) => \{/gm, '$1;(() => {')

      // Cas 2: Array access après une ligne
      content = content.replace(/^(\s*)\[/gm, '$1;[')

      if (content !== originalContent) {
        modified = true
      }
    }

    // 2. Convertir les guillemets doubles en simples (sauf JSX)
    if (RULES.singleQuotes) {
      const originalContent = content

      // Remplacer les guillemets doubles par des simples (hors JSX)
      content = content.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, (match, inner) => {
        // Ne pas changer dans les attributs JSX ou si contient des apostrophes
        if (inner.includes("'")) {
          return match
        }
        return `'${inner}'`
      })

      if (content !== originalContent) {
        modified = true
      }
    }

    // 3. Vérifier et corriger l'indentation (2 espaces)
    if (RULES.indentation) {
      const originalContent = content
      const lines = content.split('\n')

      const fixedLines = lines.map(line => {
        // Remplacer les tabs par des espaces
        if (line.includes('\t')) {
          return line.replace(/\t/g, '  ')
        }
        return line
      })

      content = fixedLines.join('\n')

      if (content !== originalContent) {
        modified = true
      }
    }

    // Écrire le fichier modifié
    if (modified) {
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
 * Vérifie les violations des règles de nommage
 */
function checkNamingConventions(filePath) {
  const violations = []
  const content = fs.readFileSync(filePath, 'utf8')
  const fileName = path.basename(filePath)

  // Vérifier le nommage des fichiers (kebab-case avec exceptions)
  const isNestJSFile =
    /\.(controller|service|module|guard|interceptor|middleware|dto|entity|gateway|decorator)\.ts$/.test(
      fileName
    )
  const isTestFile =
    fileName.includes('.spec.') || fileName.includes('.test.') || fileName.includes('.e2e-')
  const isConfigFile =
    /\.(config|d)\.ts$/.test(fileName) ||
    /\.(eslintrc|prettierrc|postcss\.config)\.js$/.test(fileName)
  const isSpecialFile = fileName === 'axiosInstance.ts' || fileName === 'next.config.js'

  if (
    !isNestJSFile &&
    !isTestFile &&
    !isConfigFile &&
    !isSpecialFile &&
    !/^[a-z0-9-]+\.(ts|tsx|js|jsx)$/.test(fileName)
  ) {
    violations.push(`Nom de fichier non conforme (kebab-case): ${fileName}`)
  }

  // Vérifier les interfaces (PascalCase + suffixes)
  const interfaceMatches = content.match(/interface\s+([A-Za-z0-9_]+)/g)
  if (interfaceMatches) {
    interfaceMatches.forEach(match => {
      const interfaceName = match.replace('interface ', '')
      if (!/^[A-Z][A-Za-z0-9]*$/.test(interfaceName)) {
        violations.push(`Interface non conforme (PascalCase): ${interfaceName}`)
      }
    })
  }

  // Vérifier les fonctions (camelCase + verbe)
  const functionMatches = content.match(/function\s+([A-Za-z0-9_]+)/g)
  if (functionMatches) {
    functionMatches.forEach(match => {
      const functionName = match.replace('function ', '')
      if (!/^[a-z][A-Za-z0-9]*$/.test(functionName)) {
        violations.push(`Fonction non conforme (camelCase): ${functionName}`)
      }
    })
  }

  return violations
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
  let totalViolations = 0

  // Traiter chaque fichier
  allFiles.forEach(filePath => {
    // Corriger le style de code
    const wasFixed = fixFile(filePath)
    if (wasFixed) {
      fixedFiles++
    }

    // Vérifier les conventions de nommage
    const violations = checkNamingConventions(filePath)
    if (violations.length > 0) {
      console.log(`⚠️  Violations dans ${filePath}:`)
      violations.forEach(violation => {
        console.log(`   - ${violation}`)
      })
      totalViolations += violations.length
    }
  })

  console.log('\n📈 Résumé:')
  console.log(`✅ ${fixedFiles} fichiers corrigés automatiquement`)
  console.log(`⚠️  ${totalViolations} violations de nommage détectées`)

  if (totalViolations > 0) {
    console.log('\n💡 Les violations de nommage doivent être corrigées manuellement.')
  }

  // Exécuter Prettier pour finaliser le formatage
  try {
    console.log('\n🎨 Application de Prettier...')
    execSync('npx prettier --write "**/*.{ts,tsx,js,jsx}" --ignore-path .gitignore', {
      stdio: 'inherit',
      cwd: projectRoot,
    })
    console.log('✅ Prettier appliqué avec succès')
  } catch (error) {
    console.log("⚠️  Prettier non disponible ou erreur lors de l'exécution")
  }

  console.log('\n🎉 Correction terminée !')
  console.log('\n📋 Prochaines étapes:')
  console.log('1. Vérifiez les modifications avec git diff')
  console.log('2. Corrigez manuellement les violations de nommage')
  console.log('3. Exécutez les tests pour vérifier que tout fonctionne')
  console.log('4. Commitez les changements')
}

// Exécuter le script
if (require.main === module) {
  main()
}

module.exports = { fixFile, checkNamingConventions }
