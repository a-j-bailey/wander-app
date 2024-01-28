import { View, Text, Button, FlatList, StyleSheet, Modal, Alert, Pressable } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import { dummyData } from '../../src/services/TagService';
import { Edit, Pencil, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { useData } from '../../src/hooks/useData';

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

const EditModal = ({
  visible
}: {
  visible: boolean
}) => {

  const {theme} = useData();

  console.log(theme);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      // onRequestClose={() => {}}
    >
      <View style={styles2.centeredView}>
        <View style={styles2.modalView}>
          <Text style={styles2.modalText}>Hello World!</Text>
          <Pressable
            style={[styles2.button, styles2.buttonClose]}
            // onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles2.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
};

export default function tags() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles2.centeredView}>
      <Stack.Screen 
        options={{
          title: 'Settings',
          headerRight: () => <Plus onPress={() => {}} />,
        }}
      />
      <FlatList
        style={{width: '100%'}}
        data={dummyData}
        renderItem={({item}) => <Item {...item} />}
      />
      <EditModal visible={modalVisible} />
      <Pressable
        style={[styles2.button, styles2.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles2.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
}

const styles2 = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    // alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    // Border
    borderRadius: 20,
    borderColor: '#2646531A',
    borderWidth: 4,

    margin: 20,
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'center',

    // Shadow
    shadowColor: '#0000001A',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

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