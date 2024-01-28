import { Stack } from 'expo-router';
import { useData } from '../../src/hooks/useData';

export default function Layout() {
  const { theme } = useData();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.bg,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: theme.tx
        },
        contentStyle: {
          backgroundColor: theme.bg,
        }
      }}
    >
    </Stack>
  );
}