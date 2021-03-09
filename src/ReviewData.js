function ReviewData({ productName, reviewDate, userName, userReview }) {
    return (
      <>
        <div className="LoadedReviews">
            <div className="review wrapper">
              <div className="userInfo">
                <p><span>{productName}</span></p>
                <p><span>{reviewDate}</span></p>
                <p><span>{userName}</span></p>
              </div>
              <div class="userReview">
                <p><span>{userReview}</span></p>
              </div>
            </div>
          </div>
        </>
      );
    }

export default ReviewData;