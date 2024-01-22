import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from './Home';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Home />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});