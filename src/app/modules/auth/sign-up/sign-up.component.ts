import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import {initializeApp} from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword , sendEmailVerification} from "firebase/auth";
import { catchError } from 'rxjs';
@Component({
    selector     : 'auth-sign-up',
    templateUrl  : './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignUpComponent implements OnInit
{
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;
    gfirebase : any;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
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
        this.signUpForm = this._formBuilder.group({
                name      : ['', Validators.required],
                email     : ['', [Validators.required, Validators.email]],
                password  : ['', Validators.required],
                password2   : ['' , Validators.required],
                agreements: ['', Validators.requiredTrue]
            }
        );
        const firebaseConfig = {
            projectId: 'fuse-starter',
    appId: '1:560964344009:web:0ab6426ba74b38e1b69518',
    storageBucket: 'fuse-starter.appspot.com',
    apiKey: 'AIzaSyBWu04Lkq8c_ricQ0BoFEczEIUZKtfh6SQ',
    authDomain: 'fuse-starter.firebaseapp.com',
    messagingSenderId: '560964344009',
        }
        this.gfirebase = initializeApp(firebaseConfig);
        console.log(this.gfirebase);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void
    {
        // Do nothing if the form is invalid
        // if ( this.signUpForm.invalid )
        // {
        //     console.log("invalid");
        //     return;
        // }
        

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;
        console.log(this.signUpForm.value.email);
        console.log("hi")
        if(this.signUpForm.value.password !== this.signUpForm.value.password2)
        {
            console.log("hi");
            // this.showAlert = false;
            console.log(this.signUpForm.value.password,this.signUpForm.value.password2);
            alert("Password didn't match");
            this.signUpForm.enable();
            // this.signUpNgForm.resetForm();
            // throw "password didn't match";
            
            return;
        }

        // Sign up
        const auth = getAuth(this.gfirebase);
        createUserWithEmailAndPassword(auth, this.signUpForm.value.email, this.signUpForm.value.password)
        .then((userCredential) => {
    // Signed in 
    const auth = getAuth();
    sendEmailVerification(auth.currentUser)
    .then(() => {
        console.log("Email verification sent!");
        console.log(auth.currentUser);
        // ...
    });
        const user = userCredential.user;
            console.log(userCredential);
            this._router.navigateByUrl('/confirmation-required');

        })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // Re-enable the form
    this.signUpForm.enable();

    // Reset the form
    this.signUpNgForm.resetForm();

    // Set the alert
    this.alert = {
        type   : 'error',
        message: 'Something went wrong, please try again.'
    };

    // Show the alert
    this.showAlert = true;
    // ..
  });

        // this._authService.signUp(this.signUpForm.value)
        //     .subscribe(
        //         (response) => {

        //             // Navigate to the confirmation required page
        //             this._router.navigateByUrl('/confirmation-required');
        //         },
        //         (response) => {

        //             // Re-enable the form
        //             this.signUpForm.enable();

        //             // Reset the form
        //             this.signUpNgForm.resetForm();

        //             // Set the alert
        //             this.alert = {
        //                 type   : 'error',
        //                 message: 'Something went wrong, please try again.'
        //             };

        //             // Show the alert
        //             this.showAlert = true;
        //         }
        //     );
    }
}
