import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Home = () => {
  const [mapRegion, setmapRegion] = useState({
    latitude: 41.44935872697216,
    longitude: -71.39942479096507,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={mapRegion}
        // mapType='hybridFlyover'
      >
        <Marker coordinate={mapRegion} title='Marker' />
      </MapView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});