import { useState } from 'react';
import { Location } from '../utilities';
import * as SQLite from 'expo-sqlite';

export const dummyData = [
    {
        id: 1,
        title: 'Coffee',
        emoji: `☕️`,
        highlightColor: '264653'
    },
    {
        id: 2,
        title: 'Tacos',
        emoji: `🌮`,
        highlightColor: '2a9d8f'
    },
    {
        id: 3,
        title: 'Adventure',
        emoji: `🏔️`,
        highlightColor: 'e9c46a'
    },
    {
        id: 4,
        title: 'Shopping',
        emoji: `🛍️`,
        highlightColor: 'f4a261'
    },
    {
        id: 5,
        title: 'Burgers',
        emoji: `🍔`,
        highlightColor: 'e76f51'
    },
    {
        id: 6,
        title: 'Cool Boats',
        emoji: `🛥️`,
        highlightColor: '264653'
    },
    {
        id: 7,
        title: 'Lighthouses',
        emoji: `🌊`,
        highlightColor: '2a9d8f'
    },
    {
        id: 8,
        title: 'Castles',
        emoji: `🏰`,
        highlightColor: 'e9c46a'
    },
];


export class TagService {
    constructor() {}
}