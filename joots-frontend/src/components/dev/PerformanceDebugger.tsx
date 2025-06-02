'use client'

import { useState, useEffect } from 'react'
import { performanceMonitor, usePerformanceMonitor } from '@/utils/performance-monitor'

interface PerformanceDebuggerProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  enabled?: boolean
}

export function PerformanceDebugger({ 
  position = 'bottom-right', 
  enabled = process.env.NODE_ENV === 'development' 
}: PerformanceDebuggerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [report, setReport] = useState('')
  const { generateReport, setEnabled } = usePerformanceMonitor()

  useEffect(() => {
    if (!enabled) return

    const interval = setInterval(() => {
      setReport(generateReport())
    }, 2000)

    return () => clearInterval(interval)
  }, [enabled, generateReport])

  if (!enabled) return null

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded-md shadow-lg transition-colors"
        title="Performance Monitor"
      >
        ⚡ Perf
      </button>

      {/* Performance Panel */}
      {isVisible && (
        <div className="mt-2 bg-gray-900 text-green-400 text-xs p-3 rounded-lg shadow-xl max-w-sm max-h-96 overflow-auto font-mono">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-yellow-400 font-bold">Performance Monitor</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-red-400 hover:text-red-300"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2">
            {/* Controls */}
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setEnabled(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs"
              >
                Start
              </button>
              <button
                onClick={() => setEnabled(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
              >
                Stop
              </button>
              <button
                onClick={() => console.log(generateReport())}
                className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs"
              >
                Log
              </button>
            </div>

            {/* Performance Report */}
            <div className="border-t border-gray-700 pt-2">
              <pre className="whitespace-pre-wrap text-xs">
                {report || 'Aucune métrique active'}
              </pre>
            </div>

            {/* Memory Usage */}
            <MemoryUsage />

            {/* Quick Actions */}
            <div className="border-t border-gray-700 pt-2">
              <div className="text-yellow-400 text-xs mb-1">Actions rapides:</div>
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => {
                    performanceMonitor.startTimer('test-operation', 'general', 50)
                    setTimeout(() => performanceMonitor.endTimer('test-operation'), 100)
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-1 py-0.5 rounded text-xs"
                >
                  Test 100ms
                </button>
                <button
                  onClick={() => {
                    // Simuler une opération lente
                    const start = Date.now()
                    while (Date.now() - start < 200) {
                      // Boucle bloquante
                    }
                  }}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-1 py-0.5 rounded text-xs"
                >
                  Slow Op
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MemoryUsage() {
  const [memory, setMemory] = useState<any>(null)

  useEffect(() => {
    const updateMemory = () => {
      if ('memory' in performance) {
        setMemory((performance as any).memory)
      }
    }

    updateMemory()
    const interval = setInterval(updateMemory, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!memory) return null

  const formatBytes = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(1) + ' MB'
  }

  return (
    <div className="border-t border-gray-700 pt-2">
      <div className="text-yellow-400 text-xs mb-1">Mémoire:</div>
      <div className="text-xs space-y-1">
        <div>Utilisée: {formatBytes(memory.usedJSHeapSize)}</div>
        <div>Totale: {formatBytes(memory.totalJSHeapSize)}</div>
        <div>Limite: {formatBytes(memory.jsHeapSizeLimit)}</div>
      </div>
    </div>
  )
} 