import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AddPetScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        breed: '',
        age: '',
        weight: '',
    });

    const handleSubmit = () => {
        // TODO: Implement form submission
        console.log('Form submitted:', formData);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoid}
            >
                <ScrollView>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Icon name="arrow-left" size={24} color="#1F2937" />
                        </TouchableOpacity>
                        <Text style={styles.title}>Add New Pet</Text>
                        <View style={styles.placeholder} />
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Pet Name</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.name}
                                onChangeText={(text) => setFormData({ ...formData, name: text })}
                                placeholder="Enter pet's name"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Type</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.type}
                                onChangeText={(text) => setFormData({ ...formData, type: text })}
                                placeholder="Dog, Cat, etc."
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Breed</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.breed}
                                onChangeText={(text) => setFormData({ ...formData, breed: text })}
                                placeholder="Enter breed"
                            />
                        </View>

                        <View style={styles.row}>
                            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                                <Text style={styles.label}>Age</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.age}
                                    onChangeText={(text) => setFormData({ ...formData, age: text })}
                                    placeholder="Age"
                                    keyboardType="numeric"
                                />
                            </View>

                            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                                <Text style={styles.label}>Weight</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.weight}
                                    onChangeText={(text) => setFormData({ ...formData, weight: text })}
                                    placeholder="Weight"
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Add Pet</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    keyboardAvoid: {
        flex: 1,
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
    placeholder: {
        width: 40,
    },
    form: {
        padding: 16,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#4B5563',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#1F2937',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    submitButton: {
        backgroundColor: '#8B5CF6',
        margin: 16,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default AddPetScreen; 