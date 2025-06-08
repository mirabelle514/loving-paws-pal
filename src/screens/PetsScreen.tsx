import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Temporary mock data
const mockPets = [
    { id: '1', name: 'Max', type: 'Dog', breed: 'Golden Retriever', age: 3 },
    { id: '2', name: 'Luna', type: 'Cat', breed: 'Siamese', age: 2 },
];

const PetsScreen = () => {
    const navigation = useNavigation<NavigationProp>();

    const renderPetItem = ({ item }: { item: typeof mockPets[0] }) => (
        <TouchableOpacity
            style={styles.petCard}
            onPress={() => navigation.navigate('PetDetails', { petId: item.id })}
        >
            <View style={styles.petInfo}>
                <Text style={styles.petName}>{item.name}</Text>
                <Text style={styles.petDetails}>{item.breed} • {item.age} years old</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#6B7280" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Pets</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddPet')}
                >
                    <Icon name="plus" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={mockPets}
                renderItem={renderPetItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    addButton: {
        backgroundColor: '#8B5CF6',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        padding: 16,
    },
    petCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        marginBottom: 12,
    },
    petInfo: {
        flex: 1,
    },
    petName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    petDetails: {
        fontSize: 14,
        color: '#6B7280',
    },
});

export default PetsScreen; 