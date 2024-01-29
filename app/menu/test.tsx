import { View, Text, Button, FlatList, StyleSheet, Modal, Alert, Pressable } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import { dummyData } from '../../src/services/TagService';
import { Edit, Pencil, Plus } from 'lucide-react-native';
import { useState } from 'react';

export default function tags() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Text>- Flexoki (Color Theme)</Text>
    </View>
  );
}