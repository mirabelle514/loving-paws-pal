
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Pet } from '@/types';
import { petStorage } from '@/lib/storage';

const PetProfile = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    species: 'dog' as const,
    breed: '',
    age: '',
    weight: '',
    gender: 'male' as const,
    microchipId: '',
    dateOfBirth: ''
  });

  useEffect(() => {
    setPets(petStorage.getAll());
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      species: 'dog',
      breed: '',
      age: '',
      weight: '',
      gender: 'male',
      microchipId: '',
      dateOfBirth: ''
    });
    setEditingPet(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age || !formData.weight) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (editingPet) {
      // Update existing pet
      petStorage.update(editingPet.id, {
        ...formData,
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight)
      });
      toast({
        title: "Pet Updated! ✨",
        description: `${formData.name}'s information has been updated`,
      });
    } else {
      // Add new pet
      const newPet: Pet = {
        id: Date.now().toString(),
        name: formData.name,
        species: formData.species,
        breed: formData.breed,
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
        gender: formData.gender,
        microchipId: formData.microchipId,
        dateOfBirth: formData.dateOfBirth,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      petStorage.add(newPet);
      toast({
        title: "Pet Added! 🎉",
        description: `Welcome ${formData.name} to the family!`,
      });
    }

    setPets(petStorage.getAll());
    setShowAddForm(false);
    resetForm();
  };

  const handleEdit = (pet: Pet) => {
    setFormData({
      name: pet.name,
      species: pet.species,
      breed: pet.breed || '',
      age: pet.age.toString(),
      weight: pet.weight.toString(),
      gender: pet.gender,
      microchipId: pet.microchipId || '',
      dateOfBirth: pet.dateOfBirth
    });
    setEditingPet(pet);
    setShowAddForm(true);
  };

  const handleDelete = (pet: Pet) => {
    if (window.confirm(`Are you sure you want to remove ${pet.name}?`)) {
      petStorage.delete(pet.id);
      setPets(petStorage.getAll());
      toast({
        title: "Pet Removed",
        description: `${pet.name} has been removed from your pets`,
      });
    }
  };

  const PetForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            placeholder="Pet's name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="species">Species *</Label>
          <Select value={formData.species} onValueChange={(value: any) => setFormData({...formData, species: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dog">🐕 Dog</SelectItem>
              <SelectItem value="cat">🐱 Cat</SelectItem>
              <SelectItem value="bird">🐦 Bird</SelectItem>
              <SelectItem value="other">🐾 Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="breed">Breed</Label>
        <Input
          id="breed"
          placeholder="e.g., Golden Retriever"
          value={formData.breed}
          onChange={(e) => setFormData({...formData, breed: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">Age (years) *</Label>
          <Input
            id="age"
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg) *</Label>
          <Input
            id="weight"
            type="number"
            step="0.1"
            placeholder="Weight"
            value={formData.weight}
            onChange={(e) => setFormData({...formData, weight: e.target.value})}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Select value={formData.gender} onValueChange={(value: any) => setFormData({...formData, gender: value})}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input
          id="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="microchipId">Microchip ID</Label>
        <Input
          id="microchipId"
          placeholder="e.g., 123456789012345"
          value={formData.microchipId}
          onChange={(e) => setFormData({...formData, microchipId: e.target.value})}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
          {editingPet ? 'Update Pet' : 'Add Pet'}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => {
            setShowAddForm(false);
            resetForm();
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );

  return (
    <motion.div 
      className="p-4 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Your Pets</h2>
          <p className="text-gray-600 text-sm">Manage your furry family members</p>
        </div>
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogTrigger asChild>
            <Button 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              onClick={() => resetForm()}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Pet
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingPet ? 'Edit Pet' : 'Add New Pet'}</DialogTitle>
            </DialogHeader>
            <PetForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Pets List */}
      {pets.length === 0 ? (
        <Card className="p-8 text-center bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <motion.div 
            className="text-6xl mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🏠
          </motion.div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">No Pets Yet</h3>
          <p className="text-gray-600 mb-4">Add your first pet to start their health journey</p>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Pet
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {pets.map((pet, index) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-2xl">
                    {pet.species === 'dog' ? '🐕' : pet.species === 'cat' ? '🐱' : pet.species === 'bird' ? '🐦' : '🐾'}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{pet.name}</h3>
                      <Heart className="w-4 h-4 text-red-500 fill-current" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Species:</span> {pet.species}</p>
                      <p><span className="font-medium">Age:</span> {pet.age} years</p>
                      <p><span className="font-medium">Weight:</span> {pet.weight}kg</p>
                      <p><span className="font-medium">Gender:</span> {pet.gender}</p>
                      {pet.breed && <p><span className="font-medium">Breed:</span> {pet.breed}</p>}
                      {pet.microchipId && <p><span className="font-medium">Chip ID:</span> {pet.microchipId}</p>}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(pet)}
                      className="w-8 h-8 p-0"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(pet)}
                      className="w-8 h-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default PetProfile;
