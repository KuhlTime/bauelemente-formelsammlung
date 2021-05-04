// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyC5WtOaKfXGZajvQ6hopnLzOG6S3vHrijI',
  authDomain: 'formel-glossar.firebaseapp.com',
  projectId: 'formel-glossar',
  storageBucket: 'formel-glossar.appspot.com',
  messagingSenderId: '808294339954',
  appId: '1:808294339954:web:0225bda4d939771d7739eb'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase.firestore()
