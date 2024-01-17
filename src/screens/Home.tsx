import React, { useCallback, useState, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import MapView, { Marker } from 'react-native-maps';

const Home = () => {
  const [savedLocations, setSavedLocations] = useState([
    {
      id: 1,
      latitude: 41.44935872697216,
      longitude: -71.39942479096507,
      title: 'Beavertail'
    },
    {
      id: 2,
      latitude: 41.430472940397664,
      longitude: -71.45571682409623,
      title: 'The Towers'
    },
    {
      id: 3,
      latitude: 41.57115960160157,
      longitude: -71.18787139773296,
      title: 'Groundswell'
    }
  ])

  const [mapRegion, setmapRegion] = useState({
    latitude: 41.44935872697216,
    longitude: -71.39942479096507,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

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

  // renders
  return (
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={mapRegion}
        onMarkerPress={handlePoiClick}
        showsPointsOfInterest={true}
        
        onPoiClick={(event) => {console.log('POI', event)}}
        // mapType='hybridFlyover'
      >
        {
          savedLocations.map((location) => {
            return (<Marker coordinate={location} title={location.title} key={location.id}/>);
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
          <View>
            <Text>Not all those who wander are lost.</Text>
          </View>
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
  },
});

export default Home;