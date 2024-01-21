import { useState } from 'react';
import { Location } from '../utilities';
import * as SQLite from 'expo-sqlite';


export default class Locations {
    // constructor() {

    // }

    // useEffect(() => {
    //     db.transaction((tx) => {
    //       tx.executeSql(
    //         `create table if not exists locations (
    //               id integer primary key not null,
    //               title text,
    //               latitude float,
    //               longitude float,
    //               auid integer,
    //               address text
    //           );`
    //       );
    //     });
    
    //     getLocations();
    //   }, []);
    
    //   const getLocations = () => {
    //     db.transaction((tx) => {
    //       tx.executeSql(
    //         `select * from locations;`,
    //         [],
    //         (_, { rows: { _array } }) => setSavedLocations(_array)
    //       );
    //     });
    //   }
    
    //   const add = (location) => {
    //     db.transaction(
    //       (tx) => {
    //         tx.executeSql("insert into locations (title, latitude, longitude, auid, address) values (?, ?, ?, ?, ?)",
    //           [
    //             location.title,
    //             location.latitude,
    //             location.longitude,
    //             location.auid,
    //             location.address
    //           ]);
    //       },
    //       () => {console.log('Error')},
    //       getLocations,
    //     );
    //   };
}