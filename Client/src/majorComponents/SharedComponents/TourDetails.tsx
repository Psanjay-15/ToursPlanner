import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import ShinyButton from "../../components/magicui/shiny-button";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetchTourData();
  }, []);

  const fetchTourData = async () => {
    try {
      const res = await axios.get(BASE_URL + `/tours/tour-details/${id}`);
      setTourData(res.data.data.tour);
      console.log(res.data.data.tour);
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

  const handleBook = () => {};

  return (
    <div className="w-[90%] m py-2">
      <div className="flex flex-row gap-8 pt-10">
        <div className="pb-10 px-8 w-[60%]">
          <img
            src={tourData.coverImageUrl}
            alt={tourData.title}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="w-[40%]">
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">{tourData.title}</h1>
              <p className="text-gray-700 mb-4">{tourData.description}</p>
              <p className="text-gray-700 mb-4">{tourData.duration}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-semibold">
                  ₹{tourData.price.toFixed(2)}/person
                </span>
                <span className="text-yellow-500">
                  ⭐ {tourData.ratingsAverage}
                </span>
              </div>
            </div>

            <div className="text-center flex justify-center">
              <ShinyButton
                text="Create an Account"
                className="flex flex-row w-[30%]  text-gray-900  bg-orange-100  Montserrat  border-2 rounded-full py-2 text-l font-semibold hover:bg-orange-200 hover:border-orange-250 max-sm:text-[10px]"
                onClick={handleBook}
              >
                Book
              </ShinyButton>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[50%] pl-8">
        <div className="grid grid-cols-3 gap-2 ">
          {tourData.photos &&
            tourData.photos.length > 0 &&
            tourData.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Gallery ${index + 1}`}
                className="w-full h-[150px] object-cover rounded-lg shadow-sm"
              />
            ))}
        </div>
      </div>
    </div>
  );
    
};

export default TourDetails;
