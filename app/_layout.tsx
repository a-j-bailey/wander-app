import { Stack } from 'expo-router';
import { DataProvider } from '../src/hooks/useData';

export default function Layout() {
  return (
    <DataProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          presentation: 'modal',
        }}
      >
      </Stack>
    </DataProvider>
  );
}