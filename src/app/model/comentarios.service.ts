import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import {Comentario} from './comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  cometarioForm: Comentario;
  constructor(private firestore: AngularFirestore,
    private afAuth: AngularFireAuth) {}

  getCometarios() {
    return this.firestore.collection('comentarios').snapshotChanges();
  }
  isUser() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }
}
