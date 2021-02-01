import 'firebase/firestore';

import firebase from 'firebase/app';
import { Firestore } from 'models/interfaces/firestore';

export class CloudFirestoreService {
  private db: Firestore;

  constructor() {
    this.db = firebase.firestore();
  }

/*   public async getUser(doc: string): Promise<DocumentSnapshot<IUser>> {
    return this.db.collection('users').doc(doc).withConverter(userConverter).get();
  } */
}

const cloudFirestoreService = new CloudFirestoreService();
export default cloudFirestoreService;
