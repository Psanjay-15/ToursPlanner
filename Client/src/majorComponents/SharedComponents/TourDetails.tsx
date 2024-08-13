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
      console.log(res.data.data.tour);
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

  const handleChangeCoverImage = (photo: string) => {
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
      <div className="w-[100%] ">
        <div className="flex flex-row gap-8 h- py-10 px-[80px] justify-end h-[850px] ">
          <div className="rounded-xl w-[80%] flex items-center justify-center shadow-2xl">
            <img
              src={currentCoverImage}
              alt={tourData.title}
              className="w-full object-cover h-[100%] rounded-lg shadow-2xl"
            />
          </div>

          <div className="w-[40%] border-2 p-8 rounded-lg shadow-2xl">
            <div className="">
              <h1 className="text-3xl font-bold mb-4">{tourData.title}</h1>
              <p className="text-gray-700 mb-4">{tourData.description}</p>
              <span className="flex items-center mb-3 space-x-2">
                <img src="/media/calendar.png" className="w-[28px] h-[28px]" />
                <p className="text-gray-700 mb-4 text-lg pt-4">
                  {Number(tourData.duration[0]) - 1} Nights, {tourData.duration}
                </p>
              </span>
            </div>

            <div className="mb-8">
              <ul className="flex flex-row gap-9">
                <li>
                  <img src="/media/hotel.png" className="w-8 h-8" />
                  Stay
                </li>
                <li>
                  <img src="/media/flight.png" className="w-8 h-8" />
                  Flight
                </li>
                <li>
                  <img src="/media/bus.png" className="w-8 h-8" />
                  Travel
                </li>
                <li>
                  <img src="/media/meal.png" className="w-8 h-8" />
                  Meals
                </li>
                <li>
                  <img src="/media/forex.png" className="w-8 h-8" />
                  Forex
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-between mb-8">
              <span className="text-2xl font-semibold">
                ₹{tourData.price.toFixed(2)}/person
              </span>
              <span className="text-gray-900 text-xl">
                ⭐ {tourData.ratingsAverage}
              </span>
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
            <p className="text-xl pb-8 pr-4 ">
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
                    className="flex flex-row w-[40%]  text-gray-900  px-4 bg-orange-100  Montserrat  border-2 rounded-xl py-2 text-l font-semibold hover:bg-orange-200 hover:border-orange-250 max-sm:text-[10px]"
                    // onClick={handleBook}
                  >
                    Book Now
                  </ShinyButton>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="pl-[80px] pb-10 ">
          <div className="w-[90%]">
            <div className="grid grid-cols-6 gap-3 w-[105%] h-auto">
              {tourData.photos &&
                tourData.photos.length > 0 &&
                tourData.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-[150px] object-cover rounded-lg shadow-sm cursor-pointer"
                    onClick={() => handleChangeCoverImage(photo)}
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
