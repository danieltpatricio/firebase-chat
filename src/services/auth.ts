import firebase from 'firebase/app';
import 'firebase/auth';

export class FirebaseAuthService {
  constructor() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  }

  public async loginWithEmail(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => firebase.auth().signInWithEmailAndPassword(email, password));
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

  public onAuthChange(): any {
    return firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        return user.toJSON();
      } else {
        return undefined;
      }
    });
  }
}

const firebaseAuthService = new FirebaseAuthService();
export default firebaseAuthService;
