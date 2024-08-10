import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../SharedComponents/Card";
import Loading from "../SharedComponents/Loading";

interface Tour {
  _id: string;
  coverImageUrl: string;
  photos: string[];
  title: string;
  description: string;
  duration: string;
  price: number;
  ratingsAverage: number;
  reviews: string[];
}

const Tours: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  const fetchTours = async () => {
    try {
      const response = await axios.get(BASE_URL + "/tours/alltours");
      setTours(response.data.data.tours);
      console.log(response.data.data.tours);
      // console.log(response.data.data.tours[0]._id);
      setLoading(false);
    } catch (err) {
      setError("Failed to load tours.");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <div className="p-8 grid grid-cols-4 gap-4">
      {tours.map((tour) => (
        <Card
          key={tour._id}
          id={tour._id}
          coverImage={tour.coverImageUrl}
          title={tour.title}
          description={tour.description}
          duration={tour.duration}
          price={tour.price}
          ratingsAverage={tour.ratingsAverage}
        />
      ))}
    </div>
  );
};

export default Tours;
