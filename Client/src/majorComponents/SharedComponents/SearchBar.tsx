import React from "react";

interface SearchBarProps {
  searchInput: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterOption: string;
  handleFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  resetSearchInput: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchInput,
  handleSearchChange,
  filterOption,
  handleFilterChange,
  resetSearchInput,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full mb-8">
      <div className="flex  items-center w-full md:w-[60%] lg:w-[50%] border-2 border-gray-300 rounded-lg bg-white shadow-md p-2 relative">
        <input
          placeholder="Search for Tour..."
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          className="py-2 text-xl outline-none w-full rounded-xl border-transparent focus:border-transparent focus:ring-0 pr-10"
        />
        <img
          src="/media/cut.png"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-10 cursor-pointer w-10"
          onClick={resetSearchInput}
        />
      </div>

      <div className="mt-4 md:mt-0 md:ml-4 w-full md:w-auto">
        <select
          value={filterOption}
          onChange={handleFilterChange}
          className="block appearance-none w-full md:w-auto bg-white bord shadow-md border-gray-300 text-gray-500 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white"
        >
          <option value="">All Locations</option>
          <option value="India">India</option>
          <option value="International">International</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
