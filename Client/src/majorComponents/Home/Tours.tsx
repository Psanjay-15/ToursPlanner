import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../SharedComponents/Card";
import Loading from "../SharedComponents/Loading";
import SearchBar from "../SharedComponents/SearchBar";
import Brochure from "./Brochure";

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
    // <div className="p-8 mt-[0px]">
    //     <div className="flex w-[50%] flex-row justify-center border  bg-sky-100 py-6 mb-[60px] items-center rounded-xl">
    //       <div className="flex flex-row bordr-2 rounded-xl items-center justify-between w-[30%] outline-none relative">
    //         <input
    //           placeholder="Search"
    //           type="text"
    //           value={searchInput}
    //           onChange={handleSearchChange}
    //           className="py-2 text-xl outline-none w-full rounded-xl border-transparent focus:border-transparent focus:ring-0 pr-10"
    //         />
    //         <img
    //           src="/media/cut.png"
    //           className="absolute right-3 top-1/2 transform -translate-y-1/2 h-10 cursor-pointer w-10"
    //           onClick={() => setSearchInput("")}
    //         />
    //       </div>
    //       <div className="ml-4 outline-none border-none">
    //         <select
    //           value={filterOption}
    //           onChange={handleFilterChange}
    //           className=" py-2 text-xl outline-none w-full rounded-xl border-transparent focus:border-transparent focus:ring-0 pr-10 text-gray-500"
    //         >
    //           <option value="">All</option>
    //           <option value="India">India</option>
    //           <option value="International">International</option>
    //         </select>
    //       </div>
    //     </div>
    //   <div className="grid grid-cols-4 gap-4">
    //     {filteredTours.map((tour) => (
    //       <Card
    //         key={tour._id}
    //         id={tour._id}
    //         coverImage={tour.coverImageUrl}
    //         title={tour.title}
    //         description={tour.description}
    //         duration={tour.duration}
    //         price={tour.price}
    //         ratingsAverage={tour.ratingsAverage}
    //       />
    //     ))}
    //   </div>
    // </div>
    <>
      <div className="p-8 mt-[0px]">
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
      <div>
        <Brochure/>
      </div>
    </>
  );
};

export default Tours;
