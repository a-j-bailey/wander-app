import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from './Home';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { DataProvider } from '../src/hooks/useData';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <DataProvider>
        <Home />
      </DataProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});