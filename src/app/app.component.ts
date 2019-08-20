import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blog';

  constructor() {
    const config = {
      apiKey: "AIzaSyADVFmWsrWzHW2X2F47tlZSbofNt-Kf-cE",
      authDomain: "blog-625fb.firebaseapp.com",
      databaseURL: "https://blog-625fb.firebaseio.com",
      projectId: "blog-625fb",
      storageBucket: "blog-625fb.appspot.com",
      messagingSenderId: "906767571335",
      appId: "1:906767571335:web:e367b178463fb55a"
    };
    firebase.initializeApp(config);
  }
}
