import React, { useCallback, useState, useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import MapView, { Marker } from 'react-native-maps';
import { Location, parseLocationFromAppleMapsUrl } from '../utilities';
import { locations, getLocations } from '../services/localLocations';
import * as SQLite from 'expo-sqlite';

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
              longitude float
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
        tx.executeSql("insert into locations (title, latitude, longitude) values (?, ?, ?)", [location.title, location.latitude, location.longitude]);
      },
      () => {console.log('Error')},
      getLocations,
    );
  };

  const [savedLocations, setSavedLocations] = useState<Location[]>([
    {
      id: 1,
      latitude: 41.44935872697216,
      longitude: -71.39942479096507,
      title: 'Beavertail',
    },
    {
      id: 2,
      latitude: 41.430472940397664,
      longitude: -71.45571682409623,
      title: 'The Towers',
    },
    {
      id: 3,
      latitude: 41.57115960160157,
      longitude: -71.18787139773296,
      title: 'Groundswell'
    }
  ]);

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
    // console.log('position', object.position);
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

  // renders
  return (
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        // region={mapRegion}
        onMarkerPress={handlePoiClick}
        showsPointsOfInterest={true}
        onPoiClick={(event) => { console.log('POI', event) }}
      // mapType='hybridFlyover'
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
          <Text style={{ fontSize: 24 }}>Saved Locations:</Text>
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
                <Text>lsp: {item.lsp}</Text>
                <Text>t: {item.t}</Text>
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
});

export default Home;