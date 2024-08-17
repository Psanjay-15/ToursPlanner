import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";

interface SavedTourData {
  id: string;
  title: string;
  coverImageUrl: string;
  price: number;
}

const SavedTours: React.FC = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const [savedTours, setSavedTours] = useState<SavedTourData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchSavedTours();
  }, []);

  const fetchSavedTours = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/tours/saved-tours`);
      setSavedTours(res.data.data.savedTours);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch saved tours:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Saved Tours</h1>
      {savedTours.length === 0 ? (
        <p>No saved tours available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedTours.map((tour) => (
            <div
              key={tour.id}
              className="border p-4 rounded-lg shadow-lg flex flex-col"
            >
              <img
                src={tour.coverImageUrl}
                alt={tour.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{tour.title}</h2>
              <p className="text-lg font-semibold text-gray-800">
                ₹{tour.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedTours;
