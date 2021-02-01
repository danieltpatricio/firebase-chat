import 'firebase/firestore';

import firebase from 'firebase/app';
import { DocumentSnapshot, Firestore, QuerySnapshot } from 'models/interfaces/firestore';
import { IChatMessage } from 'models/interfaces/chat-message';
import chatMessageConverter from './coverter/chatMessage';

export class CloudFirestoreService {
  private db: Firestore;

  constructor() {
    this.db = firebase.firestore();
  }

  public async sendChatMessage(message: IChatMessage): Promise<void> {
    return this.db.collection('chat-messages').doc().withConverter(chatMessageConverter).set(message);
  }

  public async findChatMessageByDoc(doc: string): Promise<DocumentSnapshot<IChatMessage>> {
    return this.db.collection('chat-messages').doc(doc).withConverter(chatMessageConverter).get();
  }

  public listenChatMessage(cb: (data: QuerySnapshot<IChatMessage>) => void): void{
    this.db.collection('chat-messages').withConverter<IChatMessage>(chatMessageConverter).orderBy("createdAt", "asc").onSnapshot((doc) => {
      cb(doc)
    });
  }
}

const cloudFirestoreService = new CloudFirestoreService();
export default cloudFirestoreService;
