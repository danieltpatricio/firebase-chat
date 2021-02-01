import firebase from 'firebase/app';
import 'firebase/auth';
import { IUser } from 'models/interfaces/user';
import { appFirebase } from 'settings';

export class FirebaseAuthService {
  constructor() {
    firebase.auth(appFirebase).setPersistence(firebase.auth.Auth.Persistence.SESSION);
  }

  public async loginWithEmail(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(async () => (await firebase.auth().signInWithEmailAndPassword(email, password))?.user?.toJSON() );
  }

  public async logout(): Promise<void> {
    return firebase.auth().signOut();
  }

  public async getCurrentToken(): Promise<string | undefined> {
    return firebase.auth().currentUser?.getIdToken();
  }

  public decode<T>(token: string): T | null {
    try {
      const data = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;

      return currentTime > data.exp ? null : data;
    } catch (err) {
      return null;
    }
  }

  public onAuthChange(cb: (user: IUser)=> void): firebase.Unsubscribe {
    return firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        return cb(user.toJSON() as IUser);
      } else {
        return undefined;
      }
    });
  }
}

const firebaseAuthService = new FirebaseAuthService();
export default firebaseAuthService;
