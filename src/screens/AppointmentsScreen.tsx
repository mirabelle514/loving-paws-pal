import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Temporary mock data
const mockAppointments = [
    {
        id: '1',
        petName: 'Max',
        type: 'Vaccination',
        date: '2024-03-20',
        time: '10:00 AM',
        vetName: 'Dr. Smith',
    },
    {
        id: '2',
        petName: 'Luna',
        type: 'Check-up',
        date: '2024-03-22',
        time: '2:30 PM',
        vetName: 'Dr. Johnson',
    },
];

const AppointmentsScreen = () => {
    const renderAppointmentItem = ({ item }: { item: typeof mockAppointments[0] }) => (
        <View style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
                <Text style={styles.appointmentType}>{item.type}</Text>
                <Text style={styles.appointmentDate}>{item.date} at {item.time}</Text>
            </View>

            <View style={styles.appointmentDetails}>
                <View style={styles.detailRow}>
                    <Icon name="paw" size={20} color="#6B7280" />
                    <Text style={styles.detailText}>{item.petName}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Icon name="doctor" size={20} color="#6B7280" />
                    <Text style={styles.detailText}>{item.vetName}</Text>
                </View>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton}>
                    <Icon name="calendar-check" size={20} color="#8B5CF6" />
                    <Text style={styles.actionButtonText}>Reschedule</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
                    <Icon name="calendar-remove" size={20} color="#EF4444" />
                    <Text style={[styles.actionButtonText, styles.cancelButtonText]}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Appointments</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Icon name="plus" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={mockAppointments}
                renderItem={renderAppointmentItem}
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
    appointmentCard: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    appointmentHeader: {
        marginBottom: 12,
    },
    appointmentType: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    appointmentDate: {
        fontSize: 14,
        color: '#6B7280',
    },
    appointmentDetails: {
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    detailText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#4B5563',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingTop: 12,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    actionButtonText: {
        marginLeft: 4,
        color: '#8B5CF6',
        fontWeight: '500',
    },
    cancelButton: {
        marginLeft: 16,
    },
    cancelButtonText: {
        color: '#EF4444',
    },
});

export default AppointmentsScreen; 