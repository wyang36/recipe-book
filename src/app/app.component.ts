import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyD2jTMxX3TEjds3tdHwpXqWCz9MFAzGIsE",
      authDomain: "recipe-book-cccae.firebaseapp.com"
    })
  }
}
