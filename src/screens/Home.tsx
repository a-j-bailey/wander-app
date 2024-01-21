import React, { useCallback, useState, useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import MapView, { Marker } from 'react-native-maps';
import { Location, parseLocationFromAppleMapsUrl } from '../utilities';
// import { locations, getLocations } from '../services/localLocations';
import * as SQLite from 'expo-sqlite';
import { Tag, ProfileButton} from '../components';
import { dummyData } from '../services/TagService';

const Home = () => {
  // datavase
  const db = SQLite.openDatabase("database.db");

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `create table if not exists locations (
              id integer primary key not null,
              title text,
              latitude float,
              longitude float,
              auid integer,
              address text
          );`
      );
    });

    getLocations();
  }, []);

  const getLocations = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from locations;`,
        [],
        (_, { rows: { _array } }) => setSavedLocations(_array)
      );
    });
  }

  const add = (location) => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into locations (title, latitude, longitude, auid, address) values (?, ?, ?, ?, ?)",
          [
            location.title,
            location.latitude,
            location.longitude,
            location.auid,
            location.address
          ]);
      },
      () => {console.log('Error')},
      getLocations,
    );
  };

  const [savedLocations, setSavedLocations] = useState<Location[]>([]);

  const [mapRegion, setmapRegion] = useState({
    latitude: 41.44935872697216,
    longitude: -71.39942479096507,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [link, setLink] = useState('placeholder');

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '90%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handlePoiClick = useCallback((event) => {
    console.log('coordinate', event.nativeEvent);
  }, []);

  const parseLink = () => {
    var location = parseLocationFromAppleMapsUrl(link);

    add(location);
    // setSavedLocations([
    //   ...savedLocations,
    //   location
    // ]
    // );
  }

  const [tags, setTags] = useState(dummyData)

  // renders
  return (
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        // region={mapRegion}
        onMarkerPress={handlePoiClick}
        showsPointsOfInterest={true}
        mapType='standard'
      >
        {
          savedLocations.map((location) => {
            return (<Marker coordinate={location} title={location.title} key={location.id} />);
          })
        }
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          {/* SHEET HEADER */}
          <View style={styles.sheetHeader}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Let's go on a trip</Text>
            <ProfileButton />
          </View>
          {/* TAG SECTION */}
          <View style={styles.tags}>
            { tags.map((tag) => (
                <Tag key={tag.id} {...tag}/>
              )) }
          </View>
          <TextInput
            style={{ height: 40 }}
            placeholder="Paste link here..."
            onChangeText={text => setLink(text)}
          />
          <Button title='Parse Link' onPress={parseLink} />
          <FlatList
            style={{ width: '100%' }}
            data={savedLocations}
            renderItem={({ item }) =>
              <View style={{ padding: 10 }} key={item.id}>
                <Text>ID: {item.id}</Text>
                <Text>Title: {item.title}</Text>
                <Text>Address:  {item.address}</Text>
                <Text>Coordinates:</Text>
                <Text>  Lat:  {item.latitude}</Text>
                <Text>  Lng:  {item.longitude}</Text>
                <Text>Apple ID: {item.auid}</Text>
              </View>
            }
          />
          <Text style={{
            fontSize: 8,
            color: 'grey'
          }}>Not all those who wander are lost.</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 0,
    padding: 20,
    paddingBottom: 30,
  },
  sheetHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',
  },
  tags: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 12,
  }
});

export default Home;