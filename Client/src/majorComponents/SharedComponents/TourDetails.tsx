import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ShinyButton from "../../components/magicui/shiny-button";
import Loading from "./Loading";
import NavBar from "../Home/NavBar";
import Reviews from "./Reviews";

const TourDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const [tourData, setTourData] = React.useState<TourData | null>(null);
  const [currentCoverImage, setCurrentCoverImage] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<boolean>(false);
  const [numPeople, setNumPeople] = React.useState<number>(1);

  React.useEffect(() => {
    fetchTourData();
  }, []);

  const fetchTourData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/tours/tour-details/${id}`);
      setTourData(res.data.data.tour);
      setCurrentCoverImage(res.data.data.tour.coverImageUrl);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const saveTour = async () => {
    try {
      const res = await axios.post(
        BASE_URL + `/tours/tour-details/${id}`,
        {},
        {
          headers:{Authorization:"Bearer " + localStorage.getItem("accessToken")}
        }
      );

      if (res.status === 200) {
        alert("Tour saved successfully!");
      }
    } catch (error) {
      console.error("Failed to save tour:", error);
      alert("Failed to save tour.");
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
      <div className="w-[100%]">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 py-6 md:py-10 px-4 md:px-[80px]">
          <div className="w-full md:w-2/3 h-[850px] max-sm:h-[300px] flex items-center justify-center rounded-xl shadow-2xl">
            <img
              src={currentCoverImage}
              alt={tourData.title}
              className="w-full h-[100%] object-cover rounded-lg shadow-2xl"
            />
          </div>

          <div className="w-full md:w-1/3 border-2 p-4 md:p-8 rounded-lg shadow-2xl">
            <h1 className="text-xl md:text-3xl font-bold mb-2 md:mb-4">
              {tourData.title}
            </h1>
            <p className="text-gray-700 text-sm md:text-base mb-2 md:mb-4">
              {tourData.description}
            </p>
            <div className="flex items-center mb-2 md:mb-3">
              <img
                src="/media/calendar.png"
                className="w-6 md:w-8 h-6 md:h-8"
              />
              <p className="text-gray-700 text-sm md:text-lg pl-2 font-semibold">
                {Number(tourData.duration[0]) - 1} Nights, {tourData.duration}
              </p>
            </div>
            <div className="mb-4 md:mb-8 ">
              <ul className="flex flex-row flex-wrap gap-4 md:gap-8 mt-8">
                <li className="text-sm md:text-base">
                  <img
                    src="/media/hotel.png"
                    className="w-6 md:w-8 h-6 md:h-8"
                  />
                  Stay
                </li>
                <li className="text-sm md:text-base">
                  <img
                    src="/media/flight.png"
                    className="w-6 md:w-8 h-6 md:h-8"
                  />
                  Flight
                </li>
                <li className="text-sm md:text-base">
                  <img src="/media/bus.png" className="w-6 md:w-8 h-6 md:h-8" />
                  Travel
                </li>
                <li className="text-sm md:text-base">
                  <img
                    src="/media/meal.png"
                    className="w-6 md:w-8 h-6 md:h-8"
                  />
                  Meals
                </li>
                <li className="text-sm md:text-base">
                  <img
                    src="/media/forex.png"
                    className="w-6 md:w-8 h-6 md:h-8"
                  />
                  Forex
                </li>
              </ul>
            </div>
            <div className="flex flex-row md:flex-row items-start md:items-center justify-between mb-4 md:mb-8">
              <span className="text-xl md:text-2xl font-semibold">
                ₹{tourData.price.toFixed(2)}/person
              </span>
              <span className="text-gray-900 text-lg md:text-xl">
                ⭐ {tourData.ratingsAverage}
              </span>
            </div>

            <div className="flex flex-row md:flex-row items-start md:items-center mb-4">
              <label
                htmlFor="numPeople"
                className="pr-2 max-sm:pt-2 text-sm md:text-lg mb-2 md:mb-0"
              >
                Number of People:
              </label>
              <input
                type="number"
                id="numPeople"
                value={numPeople}
                onChange={handlePeopleChange}
                className="border border-gray-300 rounded-md  w-[40%] max-sm:w-[50%]"
                min={1}
              />
            </div>
            <p className="text-lg md:text-xl pb-4 mt-8">
              Total Amount:{" "}
              <span className="font-semibold">
                ₹{numPeople === 0 ? "" : totalAmount}
              </span>
            </p>
            <div className="text-center">
              <Link to="/payment">
                <ShinyButton
                  text="Book Now"
                  className="w-full text-gray-900 px-4 bg-orange-100 border-2 rounded-xl p2 mt-[60px] max-sm:mt-[20px] mb-2 text-sm md:text-lg font-semibold hover:bg-orange-200 hover:border-orange-250 shadow-md"
                >
                  Book Now
                </ShinyButton>
              </Link>
              <Link to="/saved">
                <ShinyButton
                  text="Save Tour"
                  onClick={saveTour}
                  className="w-full text-gray-900 px-4 bg-orange-100 border-2 rounded-xl p2 mt-4 mb-2 text-sm md:text-lg font-semibold hover:bg-orange-200 hover:border-orange-250 shadow-md"
                >
                  Save Tour
                </ShinyButton>
              </Link>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-[80px] pb-6 md:pb-10">
          <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-3">
              {tourData.photos &&
                tourData.photos.length > 0 &&
                tourData.photos.map((photo: string, index: number) => (
                  <img
                    key={index}
                    src={photo}
                    alt="Gallery"
                    className="w-full h-[100px] md:h-[150px] object-cover rounded-lg shadow-sm cursor-pointer"
                    onClick={() => handleChangeCoverImage(photo)}
                  />
                ))}
            </div>
          </div>
        </div>

        <Reviews reviews={tourData.reviews} />
      </div>
    </>
  );
};

export default TourDetails;
