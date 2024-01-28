import React, { useCallback, useState, useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput, Pressable } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import { Location, parseLocationFromAppleMapsUrl } from '../src/utilities';
import { Tag, ProfileButton, LocationCard} from '../src/components';
import { dummyData } from '../src/services/TagService';
import { Link, useNavigation } from 'expo-router';
import { Plus, Search } from 'lucide-react-native';
import LocalDatabase from '../src/services/Database';
import MapSearch from '../src/components/MapSearch';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useData } from '../src/hooks/useData';

const Home = () => {
  const { isDark, handleIsDark, theme } = useData();

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '60%'], []);

  // data
  const [savedLocations, setSavedLocations] = useState<Location[]>([]);
  
  // Init Database
  const database = new LocalDatabase();
  database.init();

  useEffect(() => {
    database.getLocations().then((locations: Location[]) => {
      setSavedLocations(locations);
    });
  }, []);

  const add = (location) => {
    database.db.transaction(
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
    );
  };

  const [mapRegion, setmapRegion] = useState({
    latitude: 41.44935872697216,
    longitude: -71.39942479096507,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [link, setLink] = useState('placeholder');

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
        mapType='hybridFlyover'
        showsBuildings={true}
      >
        {
          savedLocations.map((location) => {
            return (<Marker coordinate={location} title={location.title} key={location.id} />);
          })
        }
      </MapView>
      {/* MAP OVERLAY BUTTONS */}
      <MapSearch />
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{backgroundColor: theme.bg}}
        handleIndicatorStyle={{backgroundColor: theme.ui}}
      >
        <View style={styles.contentContainer}>
          {/* SHEET HEADER */}
          <View style={styles.sheetHeader}>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: theme.tx
            }}>Let's go on a trip</Text>
            <Link href={{ pathname: 'menu'}} asChild>
                <Pressable>
                  <ProfileButton />
                </Pressable>
            </Link>
          </View>
          {/* TAG SECTION */}
          <View style={styles.tags}>
            { tags.map((tag) => (
                <Tag key={tag.id} {...tag}/>
              )) }
          </View>
          {/* FORM INPUT */}
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: 8,
            borderRadius: 10,
            backgroundColor: theme.ui
          }}>
            <TextInput
              placeholder="Paste link here..."
              placeholderTextColor={theme.tx_2}
              onChangeText={text => setLink(text)}
            />
            <Plus onPress={parseLink} style={{backgroundColor: 'blue' }} color={'white'}/>
          </View>
          {/* END FORM INPUT */}
          <FlatList
            style={{ width: '100%' }}
            data={savedLocations}
            renderItem={({ item }) =>
              <LocationCard key={item.id} {...item} />
            }
          />
          <Text style={{
            fontSize: 10,
            fontWeight: '300',
            color: theme.tx_3,
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