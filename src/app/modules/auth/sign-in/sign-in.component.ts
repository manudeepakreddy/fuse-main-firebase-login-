import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { getAuth, signInWithEmailAndPassword , sendEmailVerification } from "firebase/auth";
// import 'firebase/storage';
import { getStorage, ref, listAll } from "firebase/storage";
import {initializeApp} from 'firebase/app';
// https://firebase.google.com/docs/auth/web/manage-users
@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signInForm: FormGroup;
    showAlert: boolean = false;
    // gfirebase : any;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        // private afAuth : AngularFireAuth,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signInForm = this._formBuilder.group({
            email     : ["",Validators.required],
            password  : ["",Validators.required],
            rememberMe: ['']
        });
    
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    // button_d = []
    signIn(): void
    {
    //     console.log("________");
    //     const firebaseConfig = {
    //         projectId: 'fuse-starter',
    // appId: '1:560964344009:web:0ab6426ba74b38e1b69518',
    // storageBucket: 'fuse-starter.appspot.com',
    // apiKey: 'AIzaSyBWu04Lkq8c_ricQ0BoFEczEIUZKtfh6SQ',
    // authDomain: 'fuse-starter.firebaseapp.com',
    // messagingSenderId: '560964344009',
    //     }
        
    //     const gfirebase = initializeApp(firebaseConfig);
    //     const storage = getStorage();
    //     const listRef = ref(storage);
    
    //     listAll(listRef)
    // .then((res) => {
    //     res.prefixes.forEach((folderRef) => {
    //         console.log(folderRef);

    //         // fm[folderRef['location']['path_']] = "manu";
    //         this.button_d.push(folderRef['_location']['path_']);
    //         });
    //     res.items.forEach((itemRef) => {
    //         // console.log("itemRef");
    //         this.button_d.push(itemRef['_location']['path_']);
    //     console.log(itemRef);
    //     });
    // }).catch((error) => {
    //     // Uh-oh, an error occurred!
    //     console.log(error);
    // });
    // console.log(this.button_d);
    // for (var i = 0; i < this.button_d.length; i++) {
    //     console.log(this.button_d[i]);
    //   }
        // Return if the form is invalid
        if ( this.signInForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        const auth = getAuth();
        var users : any;
    signInWithEmailAndPassword(auth, this.signInForm.value.email, this.signInForm.value.password)
    .then((userCredential) => {
        // Signed in 

        users = userCredential.user;
        const token_u = users.accessToken;
        console.log(token_u);
        // users.emailVerified = false;
        // localStorage.setItem('accessToken' , token_u);
        console.log(users);
        console.log(userCredential,"cred");
       
        // console.log("hiii")

        // console.log("------");
        this._authService.signIn(users.accessToken);
        // const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
        const redirectURL = "/home";
        console.log(redirectURL);
                    // Navigate to the redirect url
        if(userCredential.user.emailVerified)
        {
            alert("You are Sucessfully loggin in")
            this._router.navigateByUrl(redirectURL);
        }
        else
        {
            alert("Please verify your email");
            this.signInForm.enable();
        }
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Re-enable the form
                    this.signInForm.enable();

                    // Reset the form
                    this.signInNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: 'Wrong email or password'
                    };

                    // Show the alert
                    this.showAlert = true;
    });
    
        // this._authService.signIn(this.signInForm.value)
        //     .subscribe(
        //         () => {

        //             // Set the redirect url.
        //             // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
        //             // to the correct page after a successful sign in. This way, that url can be set via
        //             // routing file and we don't have to touch here.
        //             const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

        //             // Navigate to the redirect url
        //             this._router.navigateByUrl(redirectURL);

        //         },
        //         (response) => {

        //             // Re-enable the form
        //             this.signInForm.enable();

        //             // Reset the form
        //             this.signInNgForm.resetForm();

        //             // Set the alert
        //             this.alert = {
        //                 type   : 'error',
        //                 message: 'Wrong email or password'
        //             };

        //             // Show the alert
        //             this.showAlert = true;
        //         }
        //     );
    }
}
