import { IChatMessage } from 'models/interfaces/chat-message';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'models/interfaces/firestore';

const chatMessageConverter = {
  toFirestore(chatMessage: IChatMessage): DocumentData {
    const createdAt = Timestamp.fromDate(new Date());
    return { ...chatMessage, createdAt };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): IChatMessage {
    const data = snapshot.data(options)!;
    return ({...data, createdAt: data.createdAt?.toDate(), id: snapshot.id }) as IChatMessage;
  }
};

export default chatMessageConverter;
