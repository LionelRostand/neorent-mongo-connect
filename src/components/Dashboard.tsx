import { useState, useEffect } from 'react';
import { Database, Activity, Users, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ConnectionStat {
  timestamp: string;
  connections: number;
  queries: number;
}

interface DatabaseInfo {
  connected: boolean;
  collections: string[];
  totalDocuments: number;
  lastActivity: string;
}

export function Dashboard() {
  const [connectionStats, setConnectionStats] = useState<ConnectionStat[]>([]);
  const [databaseInfo, setDatabaseInfo] = useState<DatabaseInfo>({
    connected: false,
    collections: [],
    totalDocuments: 0,
    lastActivity: 'N/A'
  });

  // Simuler des données en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      const newStat: ConnectionStat = {
        timestamp: now,
        connections: Math.floor(Math.random() * 10) + 1,
        queries: Math.floor(Math.random() * 50) + 10
      };

      setConnectionStats(prev => [...prev.slice(-9), newStat]);
      
      // Simuler l'état de la base de données
      setDatabaseInfo({
        connected: Math.random() > 0.1, // 90% chance d'être connecté
        collections: ['properties', 'users', 'bookings', 'payments'],
        totalDocuments: Math.floor(Math.random() * 1000) + 500,
        lastActivity: now
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Database className="w-8 h-8 text-primary" />
            NeoRent MongoDB Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitoring des connexions entre MongoDB et l'application NeoRent
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">État de la DB</p>
                <div className="flex items-center gap-2 mt-2">
                  {databaseInfo.connected ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className={`font-semibold ${databaseInfo.connected ? 'text-green-500' : 'text-red-500'}`}>
                    {databaseInfo.connected ? 'Connecté' : 'Déconnecté'}
                  </span>
                </div>
              </div>
              <Database className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Connexions Actives</p>
                <p className="text-2xl font-bold text-foreground">
                  {connectionStats[connectionStats.length - 1]?.connections || 0}
                </p>
              </div>
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Collections</p>
                <p className="text-2xl font-bold text-foreground">{databaseInfo.collections.length}</p>
              </div>
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Documents Total</p>
                <p className="text-2xl font-bold text-foreground">{databaseInfo.totalDocuments}</p>
              </div>
              <Activity className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Collections List */}
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Collections MongoDB</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {databaseInfo.collections.map((collection) => (
              <div key={collection} className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">{collection}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {Math.floor(Math.random() * 200) + 50} documents
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Dernière activité: {databaseInfo.lastActivity}</p>
        </div>
      </div>
    </div>
  );
}