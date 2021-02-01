import firebase from 'firebase/app';

export type Firestore = firebase.firestore.Firestore;
export type DocumentData = firebase.firestore.DocumentData;
export type DocumentSnapshot<T = DocumentData> = firebase.firestore.DocumentSnapshot<T>;
export type QuerySnapshot<T = DocumentData> = firebase.firestore.QuerySnapshot<T>;
export type QueryDocumentSnapshot<T = DocumentData> = firebase.firestore.QueryDocumentSnapshot<T>;
export type SnapshotOptions = firebase.firestore.SnapshotOptions;
export const Timestamp = firebase.firestore.Timestamp;
