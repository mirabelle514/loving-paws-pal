import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type PetDetailsRouteProp = RouteProp<RootStackParamList, 'PetDetails'>;

// Temporary mock data
const mockPetDetails = {
    id: '1',
    name: 'Max',
    type: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
    weight: '30 kg',
    lastCheckup: '2024-02-15',
    nextVaccination: '2024-04-20',
    medicalHistory: [
        {
            date: '2024-02-15',
            type: 'Annual Checkup',
            notes: 'Healthy, all vitals normal',
        },
        {
            date: '2023-11-10',
            type: 'Vaccination',
            notes: 'Annual vaccination completed',
        },
    ],
};

const PetDetailsScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<PetDetailsRouteProp>();
    const { petId } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="arrow-left" size={24} color="#1F2937" />
                    </TouchableOpacity>
                    <Text style={styles.title}>{mockPetDetails.name}</Text>
                    <TouchableOpacity style={styles.editButton}>
                        <Icon name="pencil" size={24} color="#8B5CF6" />
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Basic Information</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.infoItem}>
                            <Icon name="paw" size={24} color="#8B5CF6" />
                            <Text style={styles.infoLabel}>Type</Text>
                            <Text style={styles.infoValue}>{mockPetDetails.type}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Icon name="dna" size={24} color="#8B5CF6" />
                            <Text style={styles.infoLabel}>Breed</Text>
                            <Text style={styles.infoValue}>{mockPetDetails.breed}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Icon name="calendar" size={24} color="#8B5CF6" />
                            <Text style={styles.infoLabel}>Age</Text>
                            <Text style={styles.infoValue}>{mockPetDetails.age} years</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Icon name="weight" size={24} color="#8B5CF6" />
                            <Text style={styles.infoLabel}>Weight</Text>
                            <Text style={styles.infoValue}>{mockPetDetails.weight}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Medical History</Text>
                    {mockPetDetails.medicalHistory.map((record, index) => (
                        <View key={index} style={styles.medicalRecord}>
                            <View style={styles.recordHeader}>
                                <Text style={styles.recordType}>{record.type}</Text>
                                <Text style={styles.recordDate}>{record.date}</Text>
                            </View>
                            <Text style={styles.recordNotes}>{record.notes}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Upcoming</Text>
                    <View style={styles.upcomingItem}>
                        <Icon name="calendar-check" size={24} color="#8B5CF6" />
                        <View style={styles.upcomingInfo}>
                            <Text style={styles.upcomingTitle}>Next Vaccination</Text>
                            <Text style={styles.upcomingDate}>{mockPetDetails.nextVaccination}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    backButton: {
        padding: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    editButton: {
        padding: 8,
    },
    section: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 16,
    },
    infoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -8,
    },
    infoItem: {
        width: '50%',
        padding: 8,
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    infoValue: {
        fontSize: 16,
        color: '#1F2937',
        fontWeight: '500',
    },
    medicalRecord: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    recordHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    recordType: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    recordDate: {
        fontSize: 14,
        color: '#6B7280',
    },
    recordNotes: {
        fontSize: 14,
        color: '#4B5563',
    },
    upcomingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 16,
    },
    upcomingInfo: {
        marginLeft: 12,
    },
    upcomingTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    upcomingDate: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 2,
    },
});

export default PetDetailsScreen; 