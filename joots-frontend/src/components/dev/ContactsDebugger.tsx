'use client'

import React, { useState, useEffect } from 'react'
import { useContactStore } from '@/features/contacts/stores/contact-store'
import { useUserStore } from '@/features/user/stores/user-store'
import { socketManager } from '@/lib/sockets/socket-manager'
import { logger } from '@/utils/logger'

interface ContactsDebuggerProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  enabled?: boolean
}

export function ContactsDebugger({ 
  position = 'top-left', 
  enabled = process.env.NODE_ENV === 'development' 
}: ContactsDebuggerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { contactList, onlineContacts, loadContacts, lastSyncTime } = useContactStore()
  const { user } = useUserStore()
  const [isLoading, setIsLoading] = useState(false)
  const [socketHealth, setSocketHealth] = useState({
    user: socketManager.isUserSocketConnected(),
    chat: socketManager.isChatSocketConnected(),
    healthy: socketManager.isUserSocketConnected()
  })

  // ✅ Nouveau : Mise à jour du statut des sockets en temps réel
  useEffect(() => {
    if (!enabled) return
    
    const interval = setInterval(() => {
      const userConnected = socketManager.isUserSocketConnected()
      const chatConnected = socketManager.isChatSocketConnected()
      setSocketHealth({
        user: userConnected,
        chat: chatConnected,
        healthy: userConnected // Le chat est optionnel, seul le socket utilisateur est critique
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [enabled])

  const handleReloadContacts = async () => {
    setIsLoading(true)
    try {
      await loadContacts()
      logger.info('Contacts rechargés depuis le debugger')
    } catch (error) {
      logger.error('Erreur lors du rechargement des contacts:', error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReconnectSockets = async () => {
    try {
      logger.info('Reconnexion des sockets depuis le debugger...')
      socketManager.disconnectAll()
      
      if (user?.user_id) {
        // En production, obtenir le vrai token depuis la session
        await socketManager.connectUserSocket()
        logger.info('Sockets reconnectés avec succès')
      }
    } catch (error) {
      logger.error('Erreur lors de la reconnexion des sockets:', error as Error)
    }
  }

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
        className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded-md shadow-lg transition-colors"
        title="Contacts & Sockets Debugger"
      >
        👥 Contacts ({onlineContacts.size}/{contactList.size}) | 📡 {socketHealth.healthy ? '✅' : '❌'}
      </button>

      {/* Contacts Panel */}
      {isVisible && (
        <div className="mt-2 bg-gray-900 text-green-400 text-xs p-3 rounded-lg shadow-xl max-w-sm max-h-96 overflow-auto font-mono">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-yellow-400 font-bold">🔧 Debug - Contacts & Sockets</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-red-400 hover:text-red-300"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2">
            {/* Status */}
            <div className="border-b border-gray-700 pb-2">
              <div className="text-yellow-400 text-xs mb-1">📡 Statut Sockets</div>
              <div className="text-xs space-y-1">
                <div>User: <span className={socketHealth.user ? 'text-green-400' : 'text-red-400'}>
                  {socketHealth.user ? '✅ Connecté' : '❌ Déconnecté'}
                </span></div>
                <div>Chat: <span className={socketHealth.chat ? 'text-green-400' : 'text-red-400'}>
                  {socketHealth.chat ? '✅ Connecté' : '❌ Déconnecté'}
                </span></div>
                <div>Global: <span className={socketHealth.healthy ? 'text-green-400' : 'text-yellow-400'}>
                  {socketHealth.healthy ? '✅ Sain' : '⚠️ Partiel'}
                </span></div>
              </div>
            </div>

            {/* User Info */}
            <div className="border-b border-gray-700 pb-2">
              <div className="text-yellow-400 text-xs mb-1">👤 Utilisateur</div>
              <div className="text-xs space-y-1">
                <div><strong>Nom:</strong> {user?.username || 'Non connecté'}</div>
                <div><strong>Contacts:</strong> {contactList.size}</div>
                <div><strong>En ligne:</strong> {onlineContacts.size}</div>
                <div><strong>Dernière sync:</strong> {lastSyncTime ? new Date(lastSyncTime).toLocaleTimeString() : 'Jamais'}</div>
              </div>
            </div>

            {/* Online Contacts List */}
            {onlineContacts.size > 0 && (
              <div className="border-b border-gray-700 pb-2">
                <div className="text-yellow-400 text-xs mb-1">🟢 Contacts en ligne</div>
                <div className="text-xs max-h-20 overflow-y-auto">
                  {Array.from(onlineContacts).slice(0, 5).map((contactId) => (
                    <div key={contactId} className="text-green-300 truncate">
                      🟢 {contactId.substring(0, 8)}...
                    </div>
                  ))}
                  {onlineContacts.size > 5 && (
                    <div className="text-gray-400">... et {onlineContacts.size - 5} autres</div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="border-t border-gray-700 pt-2">
              <div className="text-yellow-400 text-xs mb-1">Actions:</div>
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={handleReloadContacts}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-1 py-0.5 rounded text-xs disabled:bg-gray-600"
                >
                  {isLoading ? 'Chargement...' : '🔄 Recharger Contacts'}
                </button>
                <button
                  onClick={handleReconnectSockets}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-1 py-0.5 rounded text-xs"
                >
                  🔄 Reconnecter Sockets
                </button>
              </div>
            </div>
          </div>

          <div className="mt-2 text-xs text-gray-400">
            <details>
              <summary className="cursor-pointer">🔍 Diagnostic Détaillé</summary>
              <div className="mt-1 p-1 bg-gray-900 rounded text-xs font-mono">
                Socket Diagnostic - User: {socketHealth.user ? '✅' : '❌'}, Chat: {socketHealth.chat ? '✅' : '❌'}, Overall: {socketHealth.healthy ? '✅' : '❌'}
              </div>
            </details>
          </div>
        </div>
      )}
    </div>
  )
} 