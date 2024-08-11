import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import ShinyButton from "../../components/magicui/shiny-button";
import NavBar from "../Home/NavBar";

interface TourData {
  id: string;
  coverImageUrl: string;
  photos: string[];
  title: string;
  description: string;
  duration: string;
  price: number;
  ratingsAverage: number;
  reviews: string[];
}

const TourDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const [tourData, setTourData] = useState<TourData | null>(null);
  const [currentCoverImage, setCurrentCoverImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [numPeople, setNumPeople] = useState<number>(1);

  useEffect(() => {
    fetchTourData();
  }, []);

  const fetchTourData = async () => {
    try {
      const res = await axios.get(BASE_URL + `/tours/tour-details/${id}`);
      setTourData(res.data.data.tour);
      setCurrentCoverImage(res.data.data.tour.coverImageUrl);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!tourData) {
    return (
      <div className="flex justify-center text-6xl ">
        No tour data available.
      </div>
    );
  }

  const totalAmount = numPeople * tourData.price;

  const handlePeopleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumPeople(parseInt(event.target.value) || 0);
  };

  const handleImageClick = (photo: string) => {
    if (tourData) {
      const updatedPhotos = [...tourData.photos];
      const currentIndex = updatedPhotos.indexOf(photo);
      if (currentIndex !== -1) {
        updatedPhotos[currentIndex] = currentCoverImage;
        setCurrentCoverImage(photo);
        setTourData({ ...tourData, photos: updatedPhotos });
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="w-[100%] h-[750px]">
        <div className="flex flex-row gap-8 h] py-10 px-[80px] justify-end">
          <div className="rounded-xl w-[80%] flex items-center justify-center">
            <img
              src={currentCoverImage}
              alt={tourData.title}
              className="w-full object-cover h-[100%] rounded-lg shadow-lg"
            />
          </div>

          <div className="w-[40%] border-2 p-8 rounded-lg">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">{tourData.title}</h1>
              <p className="text-gray-700 mb-4">{tourData.description}</p>
              <span>Duration</span>
              <p className="text-gray-700 mb-4">
                {Number(tourData.duration[0]) - 1} <span>Nights</span>{" "}
                {tourData.duration}s
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-semibold">
                  ₹{tourData.price.toFixed(2)}/person
                </span>
                <span className="text-gray-900 text-xl">
                  ⭐ {tourData.ratingsAverage}
                </span>
              </div>
            </div>

            <div className="my-8">
              <ul className="flex flex-row gap-4">
                <li>Hotels</li>
                <li>Travel</li>
                <li>Meals</li>
                <li>Proper Management</li>
              </ul>
            </div>

            <div className="flex flex-row justify-evly">
              <label htmlFor="numPeople" className="block text-lg pt-2 pr-4">
                Number of People:
              </label>
              <input
                type="number"
                id="numPeople"
                value={numPeople}
                onChange={handlePeopleChange}
                className="border border-gray-300  rounded-md mb-4 p-2 w-[30%]"
                min={1}
              />
            </div>
            <div></div>
            <p className="text-xl pb-8 pr-4">
              Total Amount:{" "}
              <span className="font-semibold pl-4">
                ₹{numPeople === 0 ? "" : totalAmount}
              </span>
            </p>
            <div>
              <Link to="/payment">
                <div className="text-center flex justify-center">
                  <ShinyButton
                    text="Create an Account"
                    className="flex flex-row w-[30%]  text-gray-900  bg-orange-100  Montserrat  border-2 rounded-full py-2 text-l font-semibold hover:bg-orange-200 hover:border-orange-250 max-sm:text-[10px]"
                    // onClick={handleBook}
                  >
                    Book
                  </ShinyButton>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="pl-[80px] pb-10">
          <div className="w-[90%]">
            <div className="grid grid-cols-6 gap-3 w-[105%]">
              {tourData.photos &&
                tourData.photos.length > 0 &&
                tourData.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-[150px] object-cover rounded-lg shadow-sm cursor-pointer"
                    onClick={() => handleImageClick(photo)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourDetails;
