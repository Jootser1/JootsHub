'use client'

import { useState, useEffect } from 'react'
import { useContactStore } from '@/features/contacts/stores/contact-store'
import { useSocketManager } from '@/hooks/useSocketManager'

interface ContactsDebuggerProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  enabled?: boolean
}

export function ContactsDebugger({ 
  position = 'top-left', 
  enabled = process.env.NODE_ENV === 'development' 
}: ContactsDebuggerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [contactsData, setContactsData] = useState<{
    totalContacts: number
    onlineContacts: number
    contactList: string[]
    onlineContactsList: string[]
  }>({
    totalContacts: 0,
    onlineContacts: 0,
    contactList: [],
    onlineContactsList: []
  })

  const { isUserConnected, isConversationActive } = useSocketManager()

  useEffect(() => {
    if (!enabled) return

    const updateContactsData = () => {
      const contactStore = useContactStore.getState()
      const contactList = Array.from(contactStore.contactList)
      const onlineContactsList = Array.from(contactStore.onlineContacts)

      setContactsData({
        totalContacts: contactList.length,
        onlineContacts: onlineContactsList.length,
        contactList,
        onlineContactsList
      })
    }

    // Mise à jour initiale
    updateContactsData()

    // Mise à jour périodique
    const interval = setInterval(updateContactsData, 2000)

    return () => clearInterval(interval)
  }, [enabled])

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
        title="Contacts Debugger"
      >
        👥 Contacts ({contactsData.onlineContacts}/{contactsData.totalContacts})
      </button>

      {/* Contacts Panel */}
      {isVisible && (
        <div className="mt-2 bg-gray-900 text-green-400 text-xs p-3 rounded-lg shadow-xl max-w-sm max-h-96 overflow-auto font-mono">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-yellow-400 font-bold">Contacts Debug</h3>
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
              <div className="text-yellow-400 text-xs mb-1">Statut:</div>
              <div className="text-xs space-y-1">
                <div>Socket User: {isUserConnected ? '🟢 Connecté' : '🔴 Déconnecté'}</div>
                <div>Total Contacts: {contactsData.totalContacts}</div>
                <div>Contacts En Ligne: {contactsData.onlineContacts}</div>
              </div>
            </div>

            {/* Contacts List */}
            <div className="border-b border-gray-700 pb-2">
              <div className="text-yellow-400 text-xs mb-1">Tous les contacts:</div>
              <div className="text-xs max-h-20 overflow-y-auto">
                {contactsData.contactList.length > 0 ? (
                  contactsData.contactList.map(contactId => (
                    <div key={contactId} className="truncate">
                      {contactId.substring(0, 8)}...
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">Aucun contact</div>
                )}
              </div>
            </div>

            {/* Online Contacts */}
            <div className="border-b border-gray-700 pb-2">
              <div className="text-yellow-400 text-xs mb-1">Contacts en ligne:</div>
              <div className="text-xs max-h-20 overflow-y-auto">
                {contactsData.onlineContactsList.length > 0 ? (
                  contactsData.onlineContactsList.map(contactId => (
                    <div key={contactId} className="text-green-300 truncate">
                      🟢 {contactId.substring(0, 8)}...
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">Aucun contact en ligne</div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-gray-700 pt-2">
              <div className="text-yellow-400 text-xs mb-1">Actions:</div>
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => {
                    const contactStore = useContactStore.getState()
                    contactStore.loadContacts()
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-1 py-0.5 rounded text-xs"
                >
                  Recharger
                </button>
                <button
                  onClick={() => {
                    console.log('Contacts Store State:', useContactStore.getState())
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-1 py-0.5 rounded text-xs"
                >
                  Log Store
                </button>
                <button
                  onClick={() => {
                    // Simuler la réception d'un événement userStatusChange
                    const contactStore = useContactStore.getState()
                    const firstContact = Array.from(contactStore.contactList)[0]
                    if (firstContact) {
                      const isCurrentlyOnline = contactStore.isUserOnline(firstContact)
                      contactStore.setUserOnlineStatus(firstContact, !isCurrentlyOnline)
                      console.log(`Test: Basculé le statut de ${firstContact.substring(0, 8)}... vers ${!isCurrentlyOnline}`)
                    }
                  }}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-1 py-0.5 rounded text-xs"
                >
                  Test Status
                </button>
              </div>
              
              {/* Deuxième ligne de boutons */}
              <div className="flex flex-wrap gap-1 mt-1">
                <button
                  onClick={() => {
                    // Vider les contacts en ligne pour tester
                    const contactStore = useContactStore.getState()
                    Array.from(contactStore.onlineContacts).forEach(contactId => {
                      contactStore.setUserOnlineStatus(contactId, false)
                    })
                    console.log('Test: Tous les contacts mis hors ligne')
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-1 py-0.5 rounded text-xs"
                >
                  Clear Online
                </button>
                <button
                  onClick={() => {
                    // Mettre tous les contacts en ligne pour tester
                    const contactStore = useContactStore.getState()
                    Array.from(contactStore.contactList).forEach(contactId => {
                      contactStore.setUserOnlineStatus(contactId, true)
                    })
                    console.log('Test: Tous les contacts mis en ligne')
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-1 py-0.5 rounded text-xs"
                >
                  All Online
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 