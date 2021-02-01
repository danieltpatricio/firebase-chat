import firebase from 'firebase/app';

const userConverter = {
  toFirestore(user: any): firebase.firestore.DocumentData {
    return { ...user };
  },

  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): any {
    const data = snapshot.data(options)!;
    return data as any;
  }
};

export default userConverter;
