import firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyD7eLv1tlPBAfxX3dCTgwAXwbD2uGvpr-E',
  authDomain: 'amazing-kanban-4a08a.firebaseapp.com',
  databaseURL: 'https://amazing-kanban-4a08a.firebaseio.com'
}

firebase.initializeApp(config)
var db = firebase.database()
export default db
