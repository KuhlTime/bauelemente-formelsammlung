// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDJ9Wgz1voL0sr5wOYqlnig9ncxcKqcNk4',
  authDomain: 'formel-glossar-naco.firebaseapp.com',
  projectId: 'formel-glossar-naco',
  storageBucket: 'formel-glossar-naco.appspot.com',
  messagingSenderId: '198830357038',
  appId: '1:198830357038:web:260147055987393b9e3dbf',
  measurementId: 'G-DEX0GZGJMK'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Initialize Analytics
firebase.analytics()

const db = firebase.firestore()

export default db
