// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyC5WtOaKfXGZajvQ6hopnLzOG6S3vHrijI',
  authDomain: 'formel-glossar.firebaseapp.com',
  projectId: 'formel-glossar',
  storageBucket: 'formel-glossar.appspot.com',
  messagingSenderId: '808294339954',
  appId: '1:808294339954:web:0225bda4d939771d7739eb',
  measurementId: 'G-8GFCWJ1CRZ'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Initialize Analytics
firebase.analytics()

const db = firebase.firestore()

export default db
