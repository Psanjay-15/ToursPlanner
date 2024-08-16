import React from "react";

interface Review {
  user: string;
  name: string;
  rating: number;
  comment: string;
  _id: string;
}

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <>
      <div className="px-[80px]  py-10">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <div className="grid grid-cols-3 gap-8 outline-none ">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className="mb-4 p-4 bg-white shadow-xl rounded-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold">{review.name}</h3>
                  <span className="text-yellow-500">⭐ {review.rating}</span>
                </div>
                <p className="text-gray-700 mb-2">{review.comment}</p>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center col-span-2">
              <p className="text-gray-500 font-semibold text-4xl text-center">
                No reviews available.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Reviews;
