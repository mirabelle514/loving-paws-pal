import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome to Loving Paws</Text>
                    <Text style={styles.subtitle}>Your pet's health companion</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
                    {/* Appointment list will go here */}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Your Pets</Text>
                    {/* Pet list will go here */}
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
        padding: 20,
        backgroundColor: '#8B5CF6',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.8,
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
        color: '#1F2937',
    },
});

export default HomeScreen; 