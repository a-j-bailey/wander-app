import { useState } from 'react';
import { Location } from '../utilities';
import * as SQLite from 'expo-sqlite';

export const dummyData = [
    {
        id: 1,
        title: 'Coffee',
        emoji: `☕️`,
        highlightColor: 'red'
    },
    {
        id: 2,
        title: 'Tacos',
        emoji: `🌮`,
        highlightColor: 'orange'
    },
    {
        id: 3,
        title: 'Adventure',
        emoji: `🏔️`,
        highlightColor: 'yellow'
    },
    {
        id: 4,
        title: 'Shopping',
        emoji: `🛍️`,
        highlightColor: 'green'
    },
    {
        id: 5,
        title: 'Burgers',
        emoji: `🍔`,
        highlightColor: 'cyan'
    },
    {
        id: 6,
        title: 'Cool Boats',
        emoji: `🛥️`,
        highlightColor: 'blue'
    },
    {
        id: 7,
        title: 'Lighthouses',
        emoji: `🌊`,
        highlightColor: 'purple'
    },
    {
        id: 8,
        title: 'Castles',
        emoji: `🏰`,
        highlightColor: 'magenta'
    },
];


export class TagService {
    constructor() {}
}