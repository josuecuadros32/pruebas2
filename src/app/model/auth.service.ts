import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Registro } from './registro';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registroForm: Registro;
  constructor(
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.registrosCollection = firestore.collection<Registro>('empleados');
    this.registros = this.registrosCollection.valueChanges();
  }
  private registrosCollection: AngularFirestoreCollection<Registro>;
  private registros: Observable<Registro[]>;
  private registrosdoc: AngularFirestoreDocument<Registro>;
  private registro: Observable<Registro>;
  public selectedRegistro: Registro = {
    id: null
  };


  loginEmail(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }



  registerUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err));
    });
  }

  loginFacebook() {
    return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  loginGoogle() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  getRegistros() {
    return this.firestore.collection('registro').snapshotChanges();
  }

  isUser() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  getEmpleados() {
    return this.registros = this.registrosCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Registro;
          data.id = action.payload.doc.id;
          return data;
        });

      }));
  }
  getOneEmpleado(id: string) {
    this.registrosdoc = this.firestore.doc<Registro>(`empleados/${id}`);
    return this.registro = this.registrosdoc.snapshotChanges().pipe(map(action => {

      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Registro;
        data.id = action.payload.id;
        return data;
      }
    }));
  }
}



