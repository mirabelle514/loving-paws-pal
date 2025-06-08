
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Pet, HealthEntry } from '@/types';
import { petStorage, healthStorage } from '@/lib/storage';

const Analytics = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [healthEntries, setHealthEntries] = useState<HealthEntry[]>([]);

  useEffect(() => {
    setPets(petStorage.getAll());
    setHealthEntries(healthStorage.getAll());
  }, []);

  const getStats = () => {
    const totalEntries = healthEntries.length;
    const entriesThisMonth = healthEntries.filter(entry => {
      const entryDate = new Date(entry.date);
      const now = new Date();
      return entryDate.getMonth() === now.getMonth() && entryDate.getFullYear() === now.getFullYear();
    }).length;

    const entryTypes = healthEntries.reduce((acc, entry) => {
      acc[entry.type] = (acc[entry.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { totalEntries, entriesThisMonth, entryTypes };
  };

  const stats = getStats();

  return (
    <motion.div 
      className="p-4 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Health Analytics</h2>
        <p className="text-gray-600 text-sm">Track your pets' health trends</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Entries</p>
              <p className="text-2xl font-bold text-blue-700">{stats.totalEntries}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-green-600 font-medium">This Month</p>
              <p className="text-2xl font-bold text-green-700">{stats.entriesThisMonth}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Entry Types */}
      {Object.keys(stats.entryTypes).length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Entry Types
          </h3>
          <div className="space-y-3">
            {Object.entries(stats.entryTypes).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-gray-700 capitalize">{type.replace('_', ' ')}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      style={{ width: `${(count / stats.totalEntries) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-600">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Pet Health Summary */}
      {pets.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Pet Health Summary</h3>
          <div className="space-y-4">
            {pets.map((pet) => {
              const petEntries = healthEntries.filter(entry => entry.petId === pet.id);
              const recentWeight = petEntries
                .filter(entry => entry.type === 'weight')
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
              
              return (
                <div key={pet.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      {pet.species === 'dog' ? '🐕' : pet.species === 'cat' ? '🐱' : '🐾'}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{pet.name}</h4>
                      <p className="text-sm text-gray-500">{petEntries.length} health entries</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {recentWeight && (
                      <>
                        <p className="text-sm font-medium text-gray-700">{recentWeight.value}kg</p>
                        <p className="text-xs text-gray-400">Latest weight</p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {healthEntries.length === 0 && (
        <Card className="p-8 text-center bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
          <motion.div 
            className="text-4xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📊
          </motion.div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">No Data Yet</h3>
          <p className="text-gray-600">Start logging health entries to see analytics here</p>
        </Card>
      )}
    </motion.div>
  );
};

export default Analytics;
