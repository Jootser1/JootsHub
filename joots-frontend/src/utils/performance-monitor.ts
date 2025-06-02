import { logger } from './logger'

interface PerformanceMetric {
  name: string
  startTime: number
  endTime?: number
  duration?: number
  threshold: number
  category: 'socket' | 'api' | 'render' | 'store' | 'general'
}

class PerformanceMonitor {
  private metrics = new Map<string, PerformanceMetric>()
  private isEnabled: boolean
  private observer: PerformanceObserver | null = null

  constructor() {
    this.isEnabled = process.env.NODE_ENV === 'development' || 
                     (typeof window !== 'undefined' && window.localStorage.getItem('perf-monitor') === 'true')
    
    if (this.isEnabled && typeof window !== 'undefined') {
      this.setupPerformanceObserver()
    }
  }

  /**
   * ✅ Démarrer la mesure d'une opération
   */
  startTimer(name: string, category: PerformanceMetric['category'] = 'general', threshold = 100): void {
    if (!this.isEnabled) return

    const metric: PerformanceMetric = {
      name,
      startTime: performance.now(),
      threshold,
      category
    }

    this.metrics.set(name, metric)
  }

  /**
   * ✅ Terminer la mesure et logger si nécessaire
   */
  endTimer(name: string): number {
    if (!this.isEnabled) return 0

    const metric = this.metrics.get(name)
    if (!metric) {
      logger.warn(`PerformanceMonitor: Métrique '${name}' non trouvée`)
      return 0
    }

    const endTime = performance.now()
    const duration = endTime - metric.startTime

    metric.endTime = endTime
    metric.duration = duration

    // Logger si dépasse le seuil
    if (duration > metric.threshold) {
      logger.warn(`🐌 Performance: ${name} a pris ${duration.toFixed(2)}ms (seuil: ${metric.threshold}ms)`, {
        category: metric.category,
        duration: Math.round(duration),
        threshold: metric.threshold,
        timestamp: new Date().toISOString()
      })
    } else {
      logger.debug(`⚡ Performance: ${name} terminé en ${duration.toFixed(2)}ms`, {
        category: metric.category,
        duration: Math.round(duration)
      })
    }

    this.metrics.delete(name)
    return duration
  }

  /**
   * ✅ Mesurer une fonction asynchrone
   */
  async measureAsync<T>(
    name: string, 
    fn: () => Promise<T>, 
    category: PerformanceMetric['category'] = 'general',
    threshold = 100
  ): Promise<T> {
    this.startTimer(name, category, threshold)
    try {
      const result = await fn()
      this.endTimer(name)
      return result
    } catch (error) {
      this.endTimer(name)
      throw error
    }
  }

  /**
   * ✅ Mesurer une fonction synchrone
   */
  measureSync<T>(
    name: string, 
    fn: () => T, 
    category: PerformanceMetric['category'] = 'general',
    threshold = 16 // 16ms pour maintenir 60 FPS
  ): T {
    this.startTimer(name, category, threshold)
    try {
      const result = fn()
      this.endTimer(name)
      return result
    } catch (error) {
      this.endTimer(name)
      throw error
    }
  }

  /**
   * ✅ Observer les violations de performance du navigateur
   */
  private setupPerformanceObserver(): void {
    if (!window.PerformanceObserver) return

    try {
      // Observer les Long Tasks (> 50ms)
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'longtask') {
            logger.warn(`🚨 Long Task détectée: ${entry.duration.toFixed(2)}ms`, {
              type: 'longtask',
              duration: Math.round(entry.duration),
              startTime: Math.round(entry.startTime),
              name: entry.name
            })
          }

          if (entry.entryType === 'measure') {
            const duration = entry.duration
            if (duration > 50) {
              logger.warn(`🚨 Mesure lente: ${entry.name} - ${duration.toFixed(2)}ms`, {
                type: 'measure',
                duration: Math.round(duration),
                name: entry.name
              })
            }
          }
        }
      })

      // Observer les Long Tasks
      this.observer.observe({ entryTypes: ['longtask'] })
      
      // Observer les mesures personnalisées
      this.observer.observe({ entryTypes: ['measure'] })

    } catch (error) {
      logger.error('Erreur lors de la configuration du PerformanceObserver:', error as Error)
    }
  }

  /**
   * ✅ Mesurer les Core Web Vitals
   */
  measureWebVitals(): void {
    if (!this.isEnabled || typeof window === 'undefined') return

    // Largest Contentful Paint (LCP)
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      const lcp = lastEntry.startTime

      if (lcp > 2500) {
        logger.warn(`🚨 LCP lent: ${lcp.toFixed(2)}ms (seuil: 2500ms)`, {
          metric: 'LCP',
          value: Math.round(lcp),
          threshold: 2500
        })
      } else {
        logger.info(`✅ LCP: ${lcp.toFixed(2)}ms`, {
          metric: 'LCP',
          value: Math.round(lcp)
        })
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] })

    // First Input Delay (FID)
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Cast vers PerformanceEventTiming pour accéder à processingStart
        const eventEntry = entry as PerformanceEventTiming
        if (eventEntry.processingStart) {
          const fid = eventEntry.processingStart - eventEntry.startTime

          if (fid > 100) {
            logger.warn(`🚨 FID lent: ${fid.toFixed(2)}ms (seuil: 100ms)`, {
              metric: 'FID',
              value: Math.round(fid),
              threshold: 100
            })
          } else {
            logger.info(`✅ FID: ${fid.toFixed(2)}ms`, {
              metric: 'FID',
              value: Math.round(fid)
            })
          }
        }
      }
    }).observe({ entryTypes: ['first-input'] })
  }

  /**
   * ✅ Générer un rapport de performance
   */
  generateReport(): string {
    const report = ['=== Rapport de Performance ===']
    
    if (this.metrics.size === 0) {
      report.push('Aucune métrique en cours')
      return report.join('\n')
    }

    report.push(`Métriques actives: ${this.metrics.size}`)
    
    for (const [name, metric] of this.metrics) {
      const elapsed = performance.now() - metric.startTime
      report.push(`- ${name}: ${elapsed.toFixed(2)}ms (en cours)`)
    }

    return report.join('\n')
  }

  /**
   * ✅ Nettoyer les ressources
   */
  cleanup(): void {
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }
    this.metrics.clear()
  }

  /**
   * ✅ Activer/désactiver le monitoring
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled
    if (typeof window !== 'undefined') {
      if (enabled) {
        window.localStorage.setItem('perf-monitor', 'true')
        this.setupPerformanceObserver()
      } else {
        window.localStorage.removeItem('perf-monitor')
        this.cleanup()
      }
    }
  }
}

// ✅ Instance singleton
export const performanceMonitor = new PerformanceMonitor()

// ✅ Hook React pour utiliser le monitoring
export function usePerformanceMonitor() {
  return {
    startTimer: performanceMonitor.startTimer.bind(performanceMonitor),
    endTimer: performanceMonitor.endTimer.bind(performanceMonitor),
    measureAsync: performanceMonitor.measureAsync.bind(performanceMonitor),
    measureSync: performanceMonitor.measureSync.bind(performanceMonitor),
    generateReport: performanceMonitor.generateReport.bind(performanceMonitor),
    setEnabled: performanceMonitor.setEnabled.bind(performanceMonitor)
  }
}

// ✅ Décorateur pour mesurer automatiquement les méthodes
export function measurePerformance(
  threshold = 100, 
  category: PerformanceMetric['category'] = 'general'
) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value

    descriptor.value = function (...args: any[]) {
      const methodName = `${target.constructor.name}.${propertyName}`
      
      if (method.constructor.name === 'AsyncFunction') {
        return performanceMonitor.measureAsync(
          methodName,
          () => method.apply(this, args),
          category,
          threshold
        )
      } else {
        return performanceMonitor.measureSync(
          methodName,
          () => method.apply(this, args),
          category,
          threshold
        )
      }
    }
  }
}

// ✅ Initialiser les Web Vitals au chargement
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    performanceMonitor.measureWebVitals()
  })
} 