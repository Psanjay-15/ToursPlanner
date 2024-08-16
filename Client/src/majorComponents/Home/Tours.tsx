import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../SharedComponents/Card";
import Loading from "../SharedComponents/Loading";
import SearchBar from "../SharedComponents/SearchBar";

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
  const [error, setError] = useState<string>("");
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
 
    <>
      <div className="p-8 mt-[0px] md:pt-2">
        <SearchBar
          searchInput={searchInput}
          handleSearchChange={handleSearchChange}
          filterOption={filterOption}
          handleFilterChange={handleFilterChange}
          resetSearchInput={() => setSearchInput("")}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
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
    </>
  );
};

export default Tours;
