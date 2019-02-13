import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
// notificacion y animaciones
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// componentes
import { AppComponent } from './app.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { ContactoComponent } from './contacto/contacto.component';
import { FooterComponent } from './footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { RegistroComponent } from './registro/registro.component';
import { ProfileComponent } from './profile/profile.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { DetallesComponent } from './detalles/detalles.component';
import { NewempleadoComponent } from './newempleado/newempleado.component';
// servicios
import {EquipoService} from './equipo/equipo.service';
import { ComentariosService } from './model/comentarios.service';
import { AuthService } from './model/auth.service';

// Base de datos
import {AngularFireModule} from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken  } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import {AngularFireDatabaseModule} from '@angular/fire/database';

// Logins
import { AngularFireAuth } from '@angular/fire/auth';
import { GuardGuard} from './guard/guard.guard';

const routes: Routes = [
{ path: 'administrator', component: AdministratorComponent, canActivate: [GuardGuard] },
{path: '', component: InicioComponent},
{path: 'profile', component: ProfileComponent, canActivate: [GuardGuard] },
{path: 'inicio', component: InicioComponent},
{path: 'nosotros', component: NosotrosComponent, canActivate: [GuardGuard]},
{path: 'contacto', component: ContactoComponent, canActivate: [GuardGuard]},
{ path: 'login', component: LoginComponent },
 {path: 'registro', component: RegistroComponent},
{path: 'detalles/:id', component: DetallesComponent, canActivate: [GuardGuard]},
{path: 'newempleado', component: NewempleadoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    ContactoComponent,
    FooterComponent,
    InicioComponent,
    NosotrosComponent,
    RegistroComponent,
    LoginComponent,
    AdministratorComponent,
    ProfileComponent,
    DetallesComponent,
    NewempleadoComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireDatabaseModule
  ],
  providers: [
    EquipoService,
    { provide: FirestoreSettingsToken, useValue: {} },
    AuthService,
    AngularFireAuth,
   ComentariosService,
   AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
