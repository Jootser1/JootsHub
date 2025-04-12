// Script pour exécuter le test de déconnexion du socket
import { testSocketDisconnection } from './socketDisconnectTest';
import { useEffect } from 'react';

// Import dynamique pour Next.js
import dynamic from 'next/dynamic';

// Composant qui exécute le test
const TestSocketDisconnection = () => {
  // Utiliser les infos de session pour récupérer userId et token
  const userId = 'USER_ID'; // À remplacer avec les infos réelles
  const token = 'USER_TOKEN'; // À remplacer avec les infos réelles
  
  // Exécuter le test au chargement
  useEffect(() => {
    const runTest = async () => {
      console.log('Démarrage du test de déconnexion socket...');
      const result = await testSocketDisconnection(userId, token);
      console.log('Résultat du test:', result);
    };
    
    runTest();
  }, []);
  
  return (
    <div>
      <h1>Test de déconnexion socket</h1>
      <p>Vérifiez la console pour les résultats.</p>
    </div>
  );
};

// Exporter avec dynamic pour éviter les erreurs SSR
export default dynamic(() => Promise.resolve(TestSocketDisconnection), {
  ssr: false
}); 