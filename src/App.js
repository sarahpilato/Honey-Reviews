import './App.css';
import React from 'react'
import firebase from './firebase';
import { useEffect, useState } from 'react';
import Header from './Header.js';
import SetReviews from './SetReviews.js'
import ReviewData from './ReviewData.js'
import Footer from './Footer.js'


function App() {
  const [reviews, setReviews] = React.useState([]);
  const [productName, setProductName] = React.useState("");
  const [reviewDate, setReviewDate] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userReview, setUserReview] = React.useState("");
  const dbRef = firebase.database().ref();

  useEffect(() => {
  // reference our database and save that reference within a variable

    dbRef.on('value', (response) => {
      // setReviews(response.val())
      // setReviews((prevReviews) => [...prevReviews, newReview]);
      const reviewList = []
      for (let key in response.val()) {
        reviewList.push(response.val()[key])
      }
      setReviews(reviewList)
    })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = { productName, reviewDate, userName, userReview }
    dbRef.push(newReview)
    setProductName('')
    setReviewDate('')
    setUserName('')
    setUserReview('')
  };

    return (
    <div className="App">
      <Header />
      <form onSubmit={handleSubmit}>
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