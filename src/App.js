import './App.css';
import React from 'react'
import firebase from './firebase';
import { useEffect, useState } from 'react';
import Header from './Header.js';
import ReviewData from './ReviewData.js'
import Footer from './Footer.js'


function App() {
  const [reviews, setReviews] = React.useState([]);
  const [productName, setProductName] = React.useState("");
  const [reviewDate, setReviewDate] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userReview, setUserReview] = React.useState("");

  // reference our database and save that reference within a variable
  const dbRef = firebase.database().ref();

  useEffect(() => {
  // fire up our firebase event listener (using .on() method)
  // this accepts a first argument of ‘value’ and a callback function within which we define what we wish to occur as the database updates
    dbRef.on('value', (response) => {
      // here we’re creating a variable to store the new state we want to introduce to our app
      const reviewList = []
      // use Firebase’s .val() method to parse our database info the way we want it
      //use a for in loop to access each review
      for (let key in response.val()) {
        // inside the loop, we push each review to an array we already created inside the .on() function
        reviewList.push(response.val()[key])
      }
      // then, we call setReviews in order to update our component’s state using the local array reviewList
      setReviews(reviewList)
    })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = { productName, reviewDate, userName, userReview }
    dbRef.push(newReview)
    // set to empty string after form is submitted
    setProductName('')
    setReviewDate('')
    setUserName('')
    setUserReview('')
  };

    return (
    <div className="App">
      <Header />
      <form onSubmit={handleSubmit} className="wrapper">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          name="name"
          placeholder="Date (month/date/year)"
          value={reviewDate}
          onChange={(e) => setReviewDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <textarea
          value={userReview}
          name="description"
          placeholder="Let us know your thoughts!"
          maxLength="1000"
          onChange={(e) => setUserReview(e.target.value)}
        ></textarea>
        <button type="submit">Submit form</button>
      </form>
        {reviews.map((review) => {
          return (
            <>
              <ReviewData
                productName={review.productName}
                reviewDate={review.reviewDate}
                userName={review.userName}
                userReview={review.userReview}
              />
              </>
          );
        })}
      <Footer />
    </div>
  );
}

export default App;