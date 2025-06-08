import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainNavigator } from './src/navigation/MainNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient();

const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <QueryClientProvider client={queryClient}>
                <NavigationContainer>
                    <MainNavigator />
                </NavigationContainer>
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
};

export default App; 