import { useEffect, useState } from "react";
import * as SQLite from 'expo-sqlite';

export default class LocalDatabase {
    db: SQLite.SQLiteDatabase

    constructor() {}

    init() {
        // Connect to database
        this.db = SQLite.openDatabase("database.db");

        // Create LOCATIONS table
        this.db.transaction((tx) => {
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
    }

    async getLocations() {
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(
                    `select * from locations;`,
                    [],
                    (_, { rows: _array }) => {
                        const locations = Array<Location>();

                        for (let i = 0; i < _array.length; i++) {
                            locations.push({
                                ..._array.item(i),
                            })
                        }

                        resolve(locations);
                    }
                );
            });
        });
    }

}