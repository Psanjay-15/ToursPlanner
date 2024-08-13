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
  const [searchInput, setSearchInput] = useState<string>("");
  const [filterOption, setFilterOption] = useState<string>("");

  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  const fetchTours = async () => {
    try {
      const response = await axios.get(BASE_URL + "/tours/alltours");
      setTours(response.data.data.tours);
      // console.log(response.data.data.tours);
      
      setLoading(false);
    } catch (err) {
      setError("Failed to load tours.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOption(event.target.value);
  };

  const filteredTours = tours.filter((tour) => {
    const matchesSearch = tour.title
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const matchesFilter =
      filterOption === "India"
        ? tour.title.toLowerCase().includes("india")
        : filterOption === "International"
          ? !tour.title.toLowerCase().includes("india")
          : true;

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-8 mt-[60px]">
      <div className="flex flex-row justify-center border-2 bg-blue-400 p-8 mb-[60px] items-center">
        <div className="flex flex-row border-2 rounded-full items-center justify-between px w-[30%] outline-none">
          <input
            placeholder="Search"
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            className=" py-2 text-xl outline-none w-full rounded-l-full border-transparent focus:border-transparent focus:ring-0"
          />
          <img src="/media/search.png" className=" h-6 pr-2 w-fit" onClick={()=>setSearchInput("")} />
        </div>
        <div className="ml-4 outline-none border-none">
          <select
            value={filterOption}
            onChange={handleFilterChange}
            className=" p-2 text-l border rounded-full"
          >
            <option value="">All</option>
            <option value="India">India</option>
            <option value="International">International</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {filteredTours.map((tour) => (
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
    </div>
  );
};

export default Tours;
