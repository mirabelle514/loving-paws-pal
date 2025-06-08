
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Phone, Mail, MapPin, Edit, Trash2, Stethoscope } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Veterinarian } from '@/types';
import { vetStorage } from '@/lib/storage';

const Veterinarians = () => {
  const [vets, setVets] = useState<Veterinarian[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVet, setEditingVet] = useState<Veterinarian | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    clinicName: '',
    phone: '',
    email: '',
    address: '',
    speciality: '',
    notes: '',
    isEmergency: false
  });

  useEffect(() => {
    setVets(vetStorage.getAll());
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      clinicName: '',
      phone: '',
      email: '',
      address: '',
      speciality: '',
      notes: '',
      isEmergency: false
    });
    setEditingVet(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.clinicName || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (editingVet) {
      vetStorage.update(editingVet.id, formData);
      toast({
        title: "Veterinarian Updated! ✨",
        description: `${formData.name}'s information has been updated`,
      });
    } else {
      const newVet: Veterinarian = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      
      vetStorage.add(newVet);
      toast({
        title: "Veterinarian Added! 🎉",
        description: `${formData.name} has been added to your contacts`,
      });
    }

    setVets(vetStorage.getAll());
    setShowAddForm(false);
    resetForm();
  };

  const handleEdit = (vet: Veterinarian) => {
    setFormData({
      name: vet.name,
      clinicName: vet.clinicName,
      phone: vet.phone,
      email: vet.email || '',
      address: vet.address,
      speciality: vet.speciality || '',
      notes: vet.notes || '',
      isEmergency: vet.isEmergency
    });
    setEditingVet(vet);
    setShowAddForm(true);
  };

  const handleDelete = (vet: Veterinarian) => {
    if (window.confirm(`Are you sure you want to remove ${vet.name}?`)) {
      vetStorage.delete(vet.id);
      setVets(vetStorage.getAll());
      toast({
        title: "Veterinarian Removed",
        description: `${vet.name} has been removed from your contacts`,
      });
    }
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}`, '_self');
  };

  const VetForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Veterinarian Name *</Label>
        <Input
          id="name"
          placeholder="Dr. Smith"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="clinicName">Clinic Name *</Label>
        <Input
          id="clinicName"
          placeholder="Happy Pets Veterinary Clinic"
          value={formData.clinicName}
          onChange={(e) => setFormData({...formData, clinicName: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 234 567 8900"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="vet@clinic.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          placeholder="123 Main St, City, State"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="speciality">Speciality</Label>
        <Input
          id="speciality"
          placeholder="e.g., Surgery, Cardiology"
          value={formData.speciality}
          onChange={(e) => setFormData({...formData, speciality: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          placeholder="Additional notes..."
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
          rows={3}
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
        <div>
          <Label htmlFor="emergency" className="text-red-700 font-medium">Emergency Contact</Label>
          <p className="text-xs text-red-600">Mark as 24/7 emergency vet</p>
        </div>
        <Switch
          id="emergency"
          checked={formData.isEmergency}
          onCheckedChange={(checked) => setFormData({...formData, isEmergency: checked})}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
          {editingVet ? 'Update Vet' : 'Add Vet'}
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
          <h2 className="text-xl font-bold text-gray-800">Veterinarians</h2>
          <p className="text-gray-600 text-sm">Manage your pet's healthcare team</p>
        </div>
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogTrigger asChild>
            <Button 
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
              onClick={() => resetForm()}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Vet
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingVet ? 'Edit Veterinarian' : 'Add New Veterinarian'}</DialogTitle>
            </DialogHeader>
            <VetForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Emergency Contacts */}
      {vets.filter(vet => vet.isEmergency).length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center gap-2">
            🚨 Emergency Contacts
          </h3>
          <div className="space-y-3">
            {vets.filter(vet => vet.isEmergency).map((vet) => (
              <Card key={vet.id} className="p-4 border-red-200 bg-red-50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{vet.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{vet.clinicName}</p>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleCall(vet.phone)}
                        className="bg-red-500 hover:bg-red-600 h-8"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                      {vet.email && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEmail(vet.email!)}
                          className="border-red-300 text-red-600 h-8"
                        >
                          <Mail className="w-4 h-4 mr-1" />
                          Email
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(vet)}
                      className="w-8 h-8 p-0"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(vet)}
                      className="w-8 h-8 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Regular Veterinarians */}
      {vets.filter(vet => !vet.isEmergency).length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Regular Care</h3>
          <div className="space-y-4">
            {vets.filter(vet => !vet.isEmergency).map((vet, index) => (
              <motion.div
                key={vet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center">
                      <Stethoscope className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{vet.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{vet.clinicName}</p>
                      
                      {vet.speciality && (
                        <p className="text-sm text-purple-600 font-medium mb-2">
                          Specialty: {vet.speciality}
                        </p>
                      )}
                      
                      <div className="space-y-1 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {vet.phone}
                        </div>
                        {vet.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {vet.email}
                          </div>
                        )}
                        {vet.address && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {vet.address}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          onClick={() => handleCall(vet.phone)}
                          className="bg-blue-500 hover:bg-blue-600 h-8"
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        {vet.email && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEmail(vet.email!)}
                            className="h-8"
                          >
                            <Mail className="w-4 h-4 mr-1" />
                            Email
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(vet)}
                        className="w-8 h-8 p-0"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(vet)}
                        className="w-8 h-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {vets.length === 0 && (
        <Card className="p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <motion.div 
            className="text-6xl mb-4"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🏥
          </motion.div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">No Veterinarians Yet</h3>
          <p className="text-gray-600 mb-4">Add your pet's healthcare team for quick access</p>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Vet
          </Button>
        </Card>
      )}
    </motion.div>
  );
};

export default Veterinarians;
