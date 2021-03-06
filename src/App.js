import './App.css';
import firebase from './firebase';
import { useEffect, useState } from 'react';
import Header from './Header.js';
import SetReviews from './SetReviews.js'


function App() {
        const [reviews, setReviews] = useState([]);
        useEffect(() => {
        // reference our database and save that reference within a variable
          const dbRef = firebase.database().ref();
        // fire up our firebase event listener (using .on() method)
        // this accepts a first argument of 'value' and a callback function within which we define what we wish to occur as the database updates
          dbRef.on('value', (response) => {
            // Here we use Firebase's .val() method to parse our database info the way we want it
            // log out the information within the database 
            console.log(response.val());
            // Here we're creating a variable to store the new state we want to introduce to our app
            const newState = [];
            // Here we store the response from our query to Firebase inside of a variable
            // .val() is a Firebase method that gets us the information we want
            const data = response.val();

            //reviewLog is an object, so we iterate through it using a for in loop to access each book name 
            for (let key in data) {
              // inside the loop, we push each review to an array we already created inside the .on() function called reviewLog
              newState.push(data[key]);
            }
            // then, we call setBooks in order to update our component's state using the local array newState
            setReviews(newState);
          });
        }, []);
        
        return (
        <div className="App">
          <Header />
          <SetReviews />
          <div>
            <ul>
              {reviews.map((review) => {
                return (
                  <li>
                    <h2>{review}</h2>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        )
      }

export default App;
