import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { initializeApp } from 'firebase/app';
// import {AngularFireModule} from 'angularfire2';
// import { AngularFireAuthModule } from '@angular/fire/auth';
// import {AngularFireAuth} from '@angular/fire/compat/auth';
import {FirebaseService} from './services/firebase.service';
// import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};
export const firebaseConfig = {
    projectId: 'fuse-starter',
    appId: '1:560964344009:web:0ab6426ba74b38e1b69518',
    storageBucket: 'fuse-starter.appspot.com',
    apiKey: 'AIzaSyBWu04Lkq8c_ricQ0BoFEczEIUZKtfh6SQ',
    authDomain: 'fuse-starter.firebaseapp.com',
    messagingSenderId: '560964344009',
};
initializeApp(firebaseConfig);
@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),
         
        
    ],
    providers : [FirebaseService],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
