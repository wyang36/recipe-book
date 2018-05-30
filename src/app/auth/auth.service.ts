import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    //token: string;

    constructor(private router: Router){}

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                (response) => this.signinUser(email, password)
            )
            .catch(
                error => console.log(error)
            )
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => {
                                localStorage.token = token;
                                this.router.navigate(['recipes']);
                            }
                        )
                }
            )
            .catch(
                error => console.log(error)
            )
    }

    getToken() {
        // firebase.auth().currentUser.getIdToken()
        //     .then(
        //         (token: string) => {
        //             localStorage.token = token;
        //         }
        //     )
        return localStorage.token;
    }

    isAuthenticated() {
        return localStorage.token != null;
    }

    logout() {
        firebase.auth().signOut();
        localStorage.removeItem('token');
        this.router.navigate(['/']);
    }
}