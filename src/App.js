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
                    <p>{review}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        )
      }

export default App;
