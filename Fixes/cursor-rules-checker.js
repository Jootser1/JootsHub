#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')

class CursorRulesChecker {
  constructor() {
    this.rules = this.loadCursorRules()
    this.currentFile = null
    this.violations = []
  }

  loadCursorRules() {
    return {
      // Règles de nommage
      naming: {
        files: {
          components: 'PascalCase', // UserCard.tsx
          hooks: 'camelCase',       // useAuth.ts
          services: 'kebab-case',   // chat-service.ts
          types: 'kebab-case',      // user.types.ts
          stores: 'kebab-case',     // user-store.ts
          utils: 'kebab-case',      // string-utils.ts
          pages: 'lowercase'        // page.tsx
        },
        code: {
          classes: 'PascalCase',
          components: 'PascalCase',
          interfaces: 'PascalCase',
          types: 'PascalCase',
          variables: 'camelCase',
          functions: 'camelCase',
          methods: 'camelCase',
          hooks: 'camelCase',
          properties: 'camelCase'
        }
      },
      // Règles de syntaxe
      syntax: {
        semicolons: false,        // Pas de semicolons sauf si requis
        quotes: 'single',         // Guillemets simples
        exportDefault: false,     // Exports nommés préférés
        functionDeclaration: 'function' // export function au lieu de const =
      },
      // Règles de structure
      structure: {
        imports: {
          order: ['react', 'next', 'external', 'internal', 'relative'],
          grouping: true
        },
        components: {
          useFC: false,           // Pas de React.FC
          exportType: 'named'     // Export nommé
        }
      }
    }
  }

  checkFile(filePath) {
    if (!fs.existsSync(filePath)) return []

    const content = fs.readFileSync(filePath, 'utf8')
    const violations = []

    // Vérifier le nom du fichier
    violations.push(...this.checkFileName(filePath))
    
    // Vérifier le contenu du fichier
    violations.push(...this.checkFileContent(filePath, content))

    return violations
  }

  checkFileName(filePath) {
    const violations = []
    const fileName = path.basename(filePath, path.extname(filePath))
    const ext = path.extname(filePath)
    
    // Déterminer le type de fichier
    const fileType = this.getFileType(filePath)
    const expectedCase = this.rules.naming.files[fileType]

    if (!this.isCorrectCase(fileName, expectedCase)) {
      violations.push({
        type: 'naming',
        severity: 'warning',
        message: `Le fichier "${fileName}${ext}" devrait être en ${expectedCase}`,
        line: 0,
        suggestion: this.convertCase(fileName, expectedCase) + ext
      })
    }

    return violations
  }

  checkFileContent(filePath, content) {
    const violations = []
    const lines = content.split('\n')
    const ext = path.extname(filePath)

    // Vérifications pour les fichiers TypeScript/JavaScript
    if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
      violations.push(...this.checkSyntaxRules(lines))
      violations.push(...this.checkNamingInCode(lines))
      violations.push(...this.checkImportStructure(lines))
      
      if (ext === '.tsx') {
        violations.push(...this.checkComponentRules(lines))
      }
    }

    return violations
  }

  checkSyntaxRules(lines) {
    const violations = []

    lines.forEach((line, index) => {
      const lineNum = index + 1
      
      // Vérifier les semicolons
      if (this.hasUnnecessarySemicolon(line)) {
        violations.push({
          type: 'syntax',
          severity: 'info',
          message: 'Semicolon non nécessaire détecté',
          line: lineNum,
          suggestion: line.replace(/;(\s*)$/, '$1')
        })
      }

      // Vérifier les guillemets
      if (this.hasIncorrectQuotes(line)) {
        violations.push({
          type: 'syntax',
          severity: 'info',
          message: 'Utiliser des guillemets simples au lieu de doubles',
          line: lineNum,
          suggestion: line.replace(/"/g, "'")
        })
      }

      // Vérifier export default
      if (line.includes('export default')) {
        violations.push({
          type: 'syntax',
          severity: 'warning',
          message: 'Préférer les exports nommés aux exports par défaut',
          line: lineNum,
          suggestion: 'Utiliser export function/const au lieu de export default'
        })
      }

      // Vérifier React.FC
      if (line.includes('React.FC') || line.includes(': FC')) {
        violations.push({
          type: 'syntax',
          severity: 'warning',
          message: 'Éviter React.FC, utiliser des fonctions simples',
          line: lineNum,
          suggestion: 'export function ComponentName(props: Props) {'
        })
      }
    })

    return violations
  }

  checkNamingInCode(lines) {
    const violations = []

    lines.forEach((line, index) => {
      const lineNum = index + 1

      // Vérifier les noms de fonctions
      const functionMatch = line.match(/(?:function|const)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g)
      if (functionMatch) {
        functionMatch.forEach(match => {
          const name = match.split(/\s+/)[1]
          if (name && !this.isCorrectCase(name, 'camelCase') && !this.isCorrectCase(name, 'PascalCase')) {
            violations.push({
              type: 'naming',
              severity: 'warning',
              message: `La fonction "${name}" devrait être en camelCase ou PascalCase`,
              line: lineNum,
              suggestion: this.convertCase(name, 'camelCase')
            })
          }
        })
      }

      // Vérifier les noms de variables
      const varMatch = line.match(/(?:let|const|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g)
      if (varMatch) {
        varMatch.forEach(match => {
          const name = match.split(/\s+/)[1]
          if (name && !this.isCorrectCase(name, 'camelCase')) {
            violations.push({
              type: 'naming',
              severity: 'info',
              message: `La variable "${name}" devrait être en camelCase`,
              line: lineNum,
              suggestion: this.convertCase(name, 'camelCase')
            })
          }
        })
      }
    })

    return violations
  }

  checkImportStructure(lines) {
    const violations = []
    const imports = []
    let lastImportLine = -1

    lines.forEach((line, index) => {
      if (line.trim().startsWith('import ')) {
        imports.push({ line: line.trim(), lineNum: index + 1 })
        lastImportLine = index
      }
    })

    // Vérifier l'ordre des imports
    const importGroups = this.categorizeImports(imports)
    const expectedOrder = ['react', 'next', 'external', 'internal', 'relative']
    
    let currentGroup = 0
    imports.forEach(imp => {
      const group = this.getImportGroup(imp.line)
      const groupIndex = expectedOrder.indexOf(group)
      
      if (groupIndex < currentGroup) {
        violations.push({
          type: 'structure',
          severity: 'info',
          message: `Import mal ordonné: ${group} devrait venir avant`,
          line: imp.lineNum,
          suggestion: 'Réorganiser les imports selon l\'ordre: React → Next → External → Internal → Relative'
        })
      }
      currentGroup = Math.max(currentGroup, groupIndex)
    })

    return violations
  }

  checkComponentRules(lines) {
    const violations = []

    lines.forEach((line, index) => {
      const lineNum = index + 1

      // Vérifier les noms de composants
      const componentMatch = line.match(/(?:function|const)\s+([A-Z][a-zA-Z0-9]*)/g)
      if (componentMatch) {
        componentMatch.forEach(match => {
          const name = match.split(/\s+/)[1]
          if (name && !this.isCorrectCase(name, 'PascalCase')) {
            violations.push({
              type: 'naming',
              severity: 'error',
              message: `Le composant "${name}" doit être en PascalCase`,
              line: lineNum,
              suggestion: this.convertCase(name, 'PascalCase')
            })
          }
        })
      }
    })

    return violations
  }

  // Méthodes utilitaires
  getFileType(filePath) {
    const fileName = path.basename(filePath, path.extname(filePath))
    const ext = path.extname(filePath)
    
    if (fileName === 'page' && ext === '.tsx') return 'pages'
    if (fileName.startsWith('use') && ['.ts', '.tsx'].includes(ext)) return 'hooks'
    if (ext === '.tsx') return 'components'
    if (fileName.includes('.types') || fileName.includes('.type')) return 'types'
    if (fileName.includes('-store') || fileName.includes('Store')) return 'stores'
    if (fileName.includes('-service') || fileName.includes('Service')) return 'services'
    if (fileName.includes('-utils') || fileName.includes('Utils')) return 'utils'
    
    return 'services' // Par défaut
  }

  isCorrectCase(str, caseType) {
    switch (caseType) {
      case 'camelCase':
        return /^[a-z][a-zA-Z0-9]*$/.test(str)
      case 'PascalCase':
        return /^[A-Z][a-zA-Z0-9]*$/.test(str)
      case 'kebab-case':
        return /^[a-z][a-z0-9-]*$/.test(str)
      case 'lowercase':
        return /^[a-z]+$/.test(str)
      default:
        return true
    }
  }

  convertCase(str, caseType) {
    switch (caseType) {
      case 'camelCase':
        return str.charAt(0).toLowerCase() + str.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())
      case 'PascalCase':
        return str.charAt(0).toUpperCase() + str.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())
      case 'kebab-case':
        return str.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')
      case 'lowercase':
        return str.toLowerCase()
      default:
        return str
    }
  }

  hasUnnecessarySemicolon(line) {
    const trimmed = line.trim()
    if (!trimmed.endsWith(';')) return false
    
    // Exceptions où le semicolon est nécessaire
    if (trimmed.includes('for (') || trimmed.includes('while (')) return false
    if (trimmed.match(/^\s*;/)) return false // Ligne vide avec semicolon
    if (trimmed.match(/\[.*\];\s*$/)) return false // Propriétés calculées
    
    return true
  }

  hasIncorrectQuotes(line) {
    // Vérifier s'il y a des guillemets doubles qui ne sont pas dans des commentaires
    const withoutComments = line.replace(/\/\/.*$/, '').replace(/\/\*.*?\*\//g, '')
    return withoutComments.includes('"') && !withoutComments.includes("'")
  }

  categorizeImports(imports) {
    return imports.map(imp => ({
      ...imp,
      group: this.getImportGroup(imp.line)
    }))
  }

  getImportGroup(importLine) {
    if (importLine.includes("'react'") || importLine.includes('"react"')) return 'react'
    if (importLine.includes("'next/") || importLine.includes('"next/')) return 'next'
    if (importLine.includes("'@/") || importLine.includes('"@/')) return 'internal'
    if (importLine.includes("'./") || importLine.includes('"./') || 
        importLine.includes("'../") || importLine.includes('"../')) return 'relative'
    return 'external'
  }

  formatViolations(violations) {
    if (violations.length === 0) {
      return '✅ Aucune violation des règles Cursor détectée !'
    }

    const grouped = violations.reduce((acc, violation) => {
      if (!acc[violation.type]) acc[violation.type] = []
      acc[violation.type].push(violation)
      return acc
    }, {})

    let output = `\n🔍 Vérification des règles Cursor - ${violations.length} violation(s) détectée(s):\n\n`

    Object.entries(grouped).forEach(([type, viols]) => {
      const icon = type === 'naming' ? '📝' : type === 'syntax' ? '⚡' : '🏗️'
      output += `${icon} ${type.toUpperCase()} (${viols.length}):\n`
      
      viols.forEach(v => {
        const severity = v.severity === 'error' ? '❌' : v.severity === 'warning' ? '⚠️' : 'ℹ️'
        output += `  ${severity} Ligne ${v.line}: ${v.message}\n`
        if (v.suggestion) {
          output += `     💡 Suggestion: ${v.suggestion}\n`
        }
      })
      output += '\n'
    })

    return output
  }

  watchFile(filePath) {
    console.log(`🔍 Surveillance du fichier: ${filePath}`)
    
    const watcher = chokidar.watch(filePath, {
      persistent: true,
      ignoreInitial: false
    })

    watcher.on('change', () => {
      console.log(`\n📝 Fichier modifié: ${path.basename(filePath)}`)
      const violations = this.checkFile(filePath)
      console.log(this.formatViolations(violations))
    })

    watcher.on('add', () => {
      console.log(`\n📁 Fichier ouvert: ${path.basename(filePath)}`)
      const violations = this.checkFile(filePath)
      console.log(this.formatViolations(violations))
    })

    return watcher
  }

  startBackgroundChecker() {
    console.log('🤖 Agent IA de vérification des règles Cursor démarré...')
    console.log('📋 Règles surveillées:')
    console.log('  • Nommage des fichiers et du code')
    console.log('  • Syntaxe (semicolons, guillemets, exports)')
    console.log('  • Structure des imports')
    console.log('  • Conventions des composants React')
    console.log('\n⏳ En attente d\'ouverture de fichiers...\n')

    // Surveiller les fichiers TypeScript/JavaScript dans le projet
    const watcher = chokidar.watch([
      'joots-frontend/src/**/*.{ts,tsx,js,jsx}',
      'joots-backend/src/**/*.{ts,js}'
    ], {
      persistent: true,
      ignoreInitial: true,
      ignored: ['**/node_modules/**', '**/.next/**', '**/dist/**']
    })

    watcher.on('change', (filePath) => {
      console.log(`\n📝 Fichier modifié: ${path.relative(process.cwd(), filePath)}`)
      const violations = this.checkFile(filePath)
      console.log(this.formatViolations(violations))
    })

    return watcher
  }
}

// Utilisation
if (require.main === module) {
  const checker = new CursorRulesChecker()
  
  // Si un fichier est passé en argument, le vérifier
  if (process.argv[2]) {
    const filePath = process.argv[2]
    console.log(`🔍 Vérification du fichier: ${filePath}`)
    const violations = checker.checkFile(filePath)
    console.log(checker.formatViolations(violations))
  } else {
    // Sinon, démarrer la surveillance en arrière-plan
    checker.startBackgroundChecker()
  }
}

module.exports = CursorRulesChecker 