import { Component, ViewEncapsulation } from '@angular/core';
import { getStorage, ref, listAll } from "firebase/storage";
import {initializeApp} from 'firebase/app';
import { stringify } from 'crypto-js/enc-base64';
@Component({
    selector     : 'landing-home',
    templateUrl  : './home.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LandingHomeComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
    button_d = {}
    button_f = {}
    gfirebase : any;
    storage : any;
    listRef : any;
    firebaseConfig : any;
    ngOnInit(): void
    {
        console.log("________");
     this.firebaseConfig = {
            projectId: 'fuse-starter',
    appId: '1:560964344009:web:0ab6426ba74b38e1b69518',
    storageBucket: 'fuse-starter.appspot.com',
    apiKey: 'AIzaSyBWu04Lkq8c_ricQ0BoFEczEIUZKtfh6SQ',
    authDomain: 'fuse-starter.firebaseapp.com',
    messagingSenderId: '560964344009',
        }
        
        this.gfirebase = initializeApp(this.firebaseConfig);
        this.storage = getStorage();
        this.listRef = ref(this.storage);
    var i = 0;
        listAll(this.listRef)
    .then((res) => {
        res.prefixes.forEach((folderRef) => {
            console.log(folderRef);

            // fm[folderRef['location']['path_']] = "manu";
            this.button_d[++i] = folderRef['_location']['path_'];
            this.button_f[i] = folderRef['_location']['path_'];
            });
        res.items.forEach((itemRef) => {
            // console.log("itemRef");
            this.button_d[++i] = itemRef['_location']['path_'];
            this.button_f[i] = itemRef['_location']['path_'];
        console.log(itemRef);
        });
    }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
    });
    console.log(this.button_d);
    } 



// button click event
    follow : any;
    button_c(id : any)
    {
        this.follow = this.button_f[id];
        var i = 0;
        this.listRef = ref(this.storage , this.follow);
        this.button_d = {};
        this.button_f = {};
        listAll(this.listRef)
    .then((res) => {
        res.prefixes.forEach((folderRef) => {
            console.log(folderRef);
            var sample = folderRef['_location']['path_'].toString();
            // fm[folderRef['location']['path_']] = "manu";
            // this.button_d[++i] = folderRef['_location']['path_'].toString().trim(follow);
            this.button_d[++i] = sample.substring(this.follow.length+1 , sample.length);
            this.button_f[i] = sample;
            });
        res.items.forEach((itemRef) => {
            // console.log("itemRef");
            var sample = itemRef['_location']['path_'].toString();
            this.button_d[++i] = sample.substring(this.follow.length+1 , sample.length);
            this.button_f[i] = sample;
        console.log(itemRef);
        });
    }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
    });
    console.log(this.button_d);
    console.log(this.button_f);
    }
    
    
}
