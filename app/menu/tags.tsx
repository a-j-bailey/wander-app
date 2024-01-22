import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import { dummyData } from '../../src/services/TagService';
import { Edit, Pencil, Plus } from 'lucide-react-native';

const Item = ({
  title,
  emoji,
  highlightColor
}: {
  title: string
  emoji: string
  highlightColor: string
}) => (
  <View style={styles(highlightColor).item}>
    <View style={styles(highlightColor).iconContainer}>
      <Text >{emoji}</Text>
    </View>
    <Text style={styles(highlightColor).title}>{title}</Text>
    <Pencil size={16}/>
  </View>
);

export default function tags() {
  return (
    <View>
      <Stack.Screen 
        options={{
          title: 'Settings',
          headerRight: () => <Plus onPress={() => {}} />,
        }}
      />
      <FlatList
        data={dummyData}
        renderItem={({item}) => <Item {...item} />}
      />
    </View>
  );
}

const styles = (highlightColor) => StyleSheet.create({
  item: {
    borderBottomColor: '#e1e1e1',
    borderBottomWidth: 0.2,
    paddingHorizontal: 16,
    paddingVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    padding: 4,
    backgroundColor: `#${highlightColor}`,
    width: 40,
    height: 40,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginHorizontal: 12,
    fontSize: 16,
  }
});