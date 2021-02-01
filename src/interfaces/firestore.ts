import firebase from 'firebase/app';

export type Firestore = firebase.firestore.Firestore;
export type DocumentData = firebase.firestore.DocumentData;
export type DocumentSnapshot<T = DocumentData> = firebase.firestore.DocumentSnapshot<T>;
