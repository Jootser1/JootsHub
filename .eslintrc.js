module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'next/core-web-vitals',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  rules: {
    // ✅ Règles Cursor JootsHub
    
    // Semicolons - Interdits (sauf cas spéciaux)
    'semi': ['error', 'never'],
    '@typescript-eslint/semi': ['error', 'never'],
    
    // Guillemets simples
    'quotes': ['error', 'single', { avoidEscape: true }],
    '@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true }],
    
    // Indentation 2 espaces
    'indent': ['error', 2, { SwitchCase: 1 }],
    '@typescript-eslint/indent': ['error', 2, { SwitchCase: 1 }],
    
    // Longueur de ligne 100 caractères
    'max-len': ['warn', { 
      code: 100, 
      ignoreUrls: true, 
      ignoreStrings: true, 
      ignoreTemplateLiterals: true,
      ignoreComments: true 
    }],
    
    // Conventions de nommage
    '@typescript-eslint/naming-convention': [
      'error',
      // PascalCase pour les types, interfaces, classes, composants
      {
        selector: ['typeLike', 'class'],
        format: ['PascalCase'],
      },
      // camelCase pour les variables, fonctions, méthodes
      {
        selector: ['variable', 'function', 'method'],
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      // camelCase pour les propriétés
      {
        selector: 'property',
        format: ['camelCase', 'snake_case'], // snake_case pour les propriétés de base de données
        leadingUnderscore: 'allow',
      },
      // PascalCase pour les composants React
      {
        selector: 'function',
        filter: {
          regex: '^[A-Z]',
          match: true,
        },
        format: ['PascalCase'],
      },
    ],
    
    // Préférer interface à type pour les objets
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    
    // Interdire any
    '@typescript-eslint/no-explicit-any': 'warn',
    
    // Égalité stricte
    'eqeqeq': ['error', 'always'],
    
    // Fonctions
    'prefer-arrow-callback': 'error',
    'arrow-spacing': 'error',
    
    // React spécifique
    'react/jsx-uses-react': 'off', // Next.js 13+ n'a pas besoin d'importer React
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // Imports
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'never',
      },
    ],
    
    // Console - Autorisé en développement
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    
    // Unused variables
    '@typescript-eslint/no-unused-vars': [
      'error',
      { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true 
      },
    ],
  },
  overrides: [
    // Configuration spécifique pour le backend NestJS
    {
      files: ['joots-backend/**/*.ts'],
      rules: {
        // Classes autorisées pour NestJS
        '@typescript-eslint/no-extraneous-class': 'off',
        
        // Décorateurs NestJS
        '@typescript-eslint/no-unused-vars': [
          'error',
          { 
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
            // Ignorer les paramètres des décorateurs NestJS
            args: 'after-used',
          },
        ],
      },
    },
    
    // Configuration spécifique pour le frontend
    {
      files: ['joots-frontend/**/*.{ts,tsx}'],
      rules: {
        // Interdire les classes côté frontend (sauf exceptions)
        '@typescript-eslint/no-extraneous-class': 'error',
        
        // Préférer les fonctions aux classes pour les composants
        'react/prefer-stateless-function': 'error',
      },
    },
    
    // Configuration pour les fichiers de test
    {
      files: ['**/*.{test,spec}.{ts,tsx}'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-console': 'off',
      },
    },
  ],
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'dist/',
    'build/',
    'coverage/',
    '*.d.ts',
  ],
} 