/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Désactiver le StrictMode
  // ... autres configurations existantes

  // Supprimer les avertissements d'hydratation pour les attributs des extensions
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Suppression des avertissements d'hydratation en production
      config.optimization.minimizer.forEach(plugin => {
        if (plugin.constructor.name === 'TerserPlugin') {
          plugin.options.terserOptions.compress.drop_console = true
        }
      })
    }
    return config
  },
}

module.exports = nextConfig
