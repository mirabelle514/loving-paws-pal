
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Pet, HealthEntry } from '@/types';
import { petStorage, healthStorage } from '@/lib/storage';

const AddEntry = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [formData, setFormData] = useState({
    petId: '',
    type: '',
    value: '',
    unit: '',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    setPets(petStorage.getAll());
  }, []);

  const entryTypes = [
    { value: 'weight', label: 'Weight', unit: 'kg' },
    { value: 'temperature', label: 'Temperature', unit: '°C' },
    { value: 'medication', label: 'Medication', unit: '' },
    { value: 'vet_visit', label: 'Vet Visit', unit: '' },
    { value: 'vaccination', label: 'Vaccination', unit: '' },
    { value: 'exercise', label: 'Exercise', unit: 'minutes' },
    { value: 'food', label: 'Food', unit: 'grams' },
    { value: 'behavior', label: 'Behavior', unit: '' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.petId || !formData.type || !formData.value) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const entry: HealthEntry = {
      id: Date.now().toString(),
      petId: formData.petId,
      type: formData.type as any,
      value: formData.value,
      unit: formData.unit,
      notes: formData.notes,
      date: formData.date,
      createdAt: new Date().toISOString()
    };

    healthStorage.add(entry);
    
    const pet = pets.find(p => p.id === formData.petId);
    toast({
      title: "Health Entry Added! 🎉",
      description: `Successfully logged ${formData.type} for ${pet?.name}`,
    });

    // Reset form
    setFormData({
      petId: '',
      type: '',
      value: '',
      unit: '',
      notes: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const selectedType = entryTypes.find(t => t.value === formData.type);

  if (pets.length === 0) {
    return (
      <div className="p-4">
        <Card className="p-6 text-center bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-gray-800">No Pets Found</h3>
          <p className="text-gray-600 mb-4">
            You need to add a pet before logging health entries
          </p>
          <Button 
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
          >
            Add a Pet First
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <motion.div 
      className="p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <span className="text-white text-lg">📝</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Log Health Entry</h2>
            <p className="text-gray-600 text-sm">Track your pet's health and activities</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pet Selection */}
          <div className="space-y-2">
            <Label htmlFor="pet">Select Pet *</Label>
            <Select value={formData.petId} onValueChange={(value) => setFormData({...formData, petId: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your pet" />
              </SelectTrigger>
              <SelectContent>
                {pets.map((pet) => (
                  <SelectItem key={pet.id} value={pet.id}>
                    <div className="flex items-center gap-2">
                      <span>
                        {pet.species === 'dog' ? '🐕' : pet.species === 'cat' ? '🐱' : '🐾'}
                      </span>
                      {pet.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Entry Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Entry Type *</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value) => {
                const type = entryTypes.find(t => t.value === value);
                setFormData({
                  ...formData, 
                  type: value,
                  unit: type?.unit || ''
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select entry type" />
              </SelectTrigger>
              <SelectContent>
                {entryTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Value */}
          <div className="space-y-2">
            <Label htmlFor="value">
              Value * {selectedType?.unit && `(${selectedType.unit})`}
            </Label>
            <Input
              id="value"
              type={['weight', 'temperature', 'exercise', 'food'].includes(formData.type) ? 'number' : 'text'}
              placeholder={`Enter ${formData.type || 'value'}`}
              value={formData.value}
              onChange={(e) => setFormData({...formData, value: e.target.value})}
              step={formData.type === 'weight' ? '0.1' : '1'}
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes..."
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 h-12"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Health Entry
          </Button>
        </form>
      </Card>
    </motion.div>
  );
};

export default AddEntry;
