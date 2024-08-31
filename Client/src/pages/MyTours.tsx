import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../majorComponents/Home/NavBar";
import { Link } from "react-router-dom";
import ShinyButton from "../components/magicui/shiny-button";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";

interface Tour {
  _id: string;
  coverImageUrl: string;
  description: string;
  duration: string;
  photos: string[];
  price: number;
  ratingsAverage: number;
  title: string;
}

interface Booking {
  bookingDate: string;
  createdAt: string;
  totalAmount: number;
  tour: Tour;
}

const MyTours: React.FC = () => {
  const [tours, setTours] = useState<Booking[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState<string>("");
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  const fetchTours = async () => {
    const user = localStorage.getItem("userName");
    if (!user) {
      window.location.href = "/login";
      return;
    }
    const token = localStorage.getItem("accessToken");
    try {
      const res = await axios.get(BASE_URL + "/tours/mytours", {
        headers: { Authorization: "Bearer " + token },
      });
      setTours(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTours();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = (tour: Tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRating(null);
    setComment("");
  };

  const handleSubmitReview = async () => {
    if (selectedTour && rating !== null && comment.trim() !== "") {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.post(
          `${BASE_URL}/tours/tour-details/${selectedTour._id}`,
          { rating, comment },
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        console.log("Review submitted successfully:", res.data);
        toast.success("Review submitted successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        closeModal();
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    } else {
      alert("Please provide both a rating and a comment.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="p-4 md:p-8">
        <h2 className="text-2xl font-bold mb-6">My Tours</h2>
        {tours.length === 0 ? (
          <p className="text-gray-500">No tours booked yet.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {tours.map((booking, index) => (
              <div
                key={index}
                className="bg-white border-2 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 p-2"
              >
                <img
                  src={booking.tour.coverImageUrl}
                  alt={booking.tour.title}
                  className="w-full h-48 object-cover rounded-sm"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {booking.tour.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    Duration: {booking.tour.duration}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    Booking Date:{" "}
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Total Amount: ₹{booking.totalAmount}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-600">
                      ⭐️ {booking.tour.ratingsAverage.toFixed(1)}
                    </span>
                    <span className="text-xl font-semibold text-gray-900">
                      Price: ₹{booking.tour.price}
                    </span>
                  </div>
                  {/* Buttons for Details and Review */}
                  <div className="text-center flex lg:flex-row flex-row justify-evenly">
                    <Link to={`/tour-details/${booking.tour._id}`}>
                      <ShinyButton
                        text="Details"
                        className="flex justify-center lg:w-[100%] text-gray-900 bg-orange-100 border-2 rounded-xl py-2 lg:px-12 px-8 text-l font-semibold hover:bg-orange-200 hover:border-orange-250 shadow-md"
                      >
                        Details
                      </ShinyButton>
                    </Link>
                    <ShinyButton
                      text="Review"
                      className="flex justify-center lg:w-[42%] text-gray-900 bg-orange-100 border-2 rounded-xl py-2 lg:px-6 px-8 text-l font-semibold hover:bg-orange-200 hover:border-orange-250 shadow-md"
                      onClick={() => openModal(booking.tour)}
                    >
                      Review
                    </ShinyButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && selectedTour && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add Your Review</h2>
            <div className="mb-4">
              <label htmlFor="rating" className="block font-medium mb-1">
                Rating:
              </label>
              <StarRatings
                rating={rating || 0}
                starRatedColor="#FFD700"
                starHoverColor="#FFA500"
                changeRating={setRating}
                numberOfStars={5}
                name="rating"
                starDimension="30px"
                starSpacing="5px"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block font-medium mb-1">
                Comment:
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1"
                rows={4}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="mr-2 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-1 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyTours;
