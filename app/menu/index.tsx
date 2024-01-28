import { Button } from 'react-native';
import { Link, Stack, usePathname, useRouter } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  StatusBar,
} from 'react-native';
import { ListItem } from '../../src/components';
import { Tags, User, User2 } from 'lucide-react-native';

const DATA = [
  {
    title: 'Profile',
    data: [
      {
        title: 'Tags Test',
        icon: <User />,
        link: 'menu/tags'
      },
      {
        title: 'Test2',
        icon: <User2 />,
        link: 'menu/test'
      }
    ],
  },
  {
    title: '',
    data: [
      {
        title: 'Tags',
        icon: <Tags />,
        link: 'menu/tags'
      }
    ],
  },
];

export default function index() {
  const router = useRouter();
  const path = usePathname();

  console.log(path);

  return (             
    <View>
      <Stack.Screen 
        options={{
          title: 'Settings',
          headerRight: () => <Button onPress={() => {router.back()}} title="Done" />,
        }}
      />
      <SectionList
        style={{padding: 24}}
        sections={DATA}
        keyExtractor={(item, index) => item.title + index}
        renderItem={({item}) => (
          <ListItem {...item}/>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 16
  },
  header: {
    fontSize: 16,
    paddingTop: 8,
  },
  title: {
    fontSize: 24,
  },
});