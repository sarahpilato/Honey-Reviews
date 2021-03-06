import './App.css';
import firebase from './firebase';
import { useEffect, useState } from 'react';
import Header from './Header.js';
import SetReviews from './SetReviews.js'
import Footer from './Footer.js'


function App() {
        const [reviews, setReviews] = useState([]);
        const [userInput, setUserInput] = useState('');
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

            //use a for in loop to access each review 
            for (let key in data) {
              // inside the loop, we push each review to an array we already created inside the .on() function 
              newState.push(data[key]);
            }
            // then, we call setReviews in order to update our component's state using the local array newState
            setReviews(newState);
          });
        }, []);
        // this event will fire every time there is a change in the input it is attached to
        const handleChange = (event) => {
          // we're telling React to update the state of our `App` component to be 
          // equal to whatever is currently the value of the input field
          setUserInput(event.target.value);
        }
        const handleClick = (event) => {
          //event.preventDefault prevents the default action: form submission
          event.preventDefault();

          // // here, we create a reference to our database
          const dbRef = firebase.database().ref();

          // here we grab whatever value this.state.userInput has and push it to the database
          dbRef.push(userInput);

          // here we reset the state to an empty string
          setUserInput('');
        }
        
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
            <form action="submit">
            <label htmlFor="newReview"></label>
            <input 
              type="text" 
              id="newReview"
              onChange={handleChange}
              value={userInput} 
            />
            <button onClick={handleClick}>Add Review</button>
          </form>
          </div>
          <Footer />
        </div>
        )
      }

export default App;
