import { View, Text, Button, FlatList, StyleSheet, Modal, Alert, Pressable } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import { dummyData } from '../../src/services/TagService';
import { Edit, Pencil, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { useData } from '../../src/hooks/useData';

export default function acknowledgements() {
  const { theme } = useData();

  return (
    <View style={{padding: 16}}>
      <Stack.Screen 
        options={{
          title: 'Acknowledgements'
        }}
      />
      <Text style={{color: theme.tx}}>
        Flexoki (Color Theme)
        https://stephango.com/flexoki
      </Text>
      <Text style={{color: theme.tx}}>
        Lucide Icon
        https://lucide.dev/
      </Text>
      <Text style={{color: theme.tx}}>
        Mo Gorhom (Bottom Sheet)
        https://gorhom.dev
      </Text>
    </View>
  );
}