import { Stack } from 'expo-router';
// import { Home } from '..';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
      }}
    >
    </Stack>
  );
}