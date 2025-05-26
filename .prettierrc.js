module.exports = {
  // ✅ Règles Cursor JootsHub

  // Pas de semicolons (sauf si requis)
  semi: false,

  // Guillemets simples
  singleQuote: true,

  // Indentation 2 espaces
  tabWidth: 2,
  useTabs: false,

  // Longueur de ligne 100 caractères
  printWidth: 100,

  // Virgule finale (ES5 compatible)
  trailingComma: 'es5',

  // Espaces dans les objets
  bracketSpacing: true,

  // Parenthèses pour les arrow functions
  arrowParens: 'avoid',

  // Fin de ligne LF (Unix)
  endOfLine: 'lf',

  // JSX
  jsxSingleQuote: true,
  jsxBracketSameLine: false,

  // Markdown
  proseWrap: 'preserve',

  // HTML
  htmlWhitespaceSensitivity: 'css',

  // Overrides pour des types de fichiers spécifiques
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 80,
        tabWidth: 2,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 80,
        proseWrap: 'always',
      },
    },
    {
      files: '*.yml',
      options: {
        tabWidth: 2,
        singleQuote: false,
      },
    },
  ],
}
