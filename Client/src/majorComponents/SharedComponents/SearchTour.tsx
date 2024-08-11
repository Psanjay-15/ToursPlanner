import React from "react";

const SearchTour = () => {
  return (
    <div className="relative">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] bg-white border-gray-950 rounded-3xl border-2">
        <div className="flex justify-end py-8 bg-back w-[40%] m-auto rounded-3xl gap-4">
          <div className="flex items-center justify-between w-full  border-2 border-gray-950  rounded-full px-4">
            <input
              placeholder="Search"
              className="bg-blk py-2 text-xl outline-none w-full"
            />
            <img src="/media/search.png" className="w-6 h-6" alt="Search Icon" />
          </div>
          {/* <div className="flex items-center justify-between w-full  border-2 border-gray-950 rounded-full px-4">
            <input
              placeholder="Search"
              className="bg-blk py-2 text-xl outline-none w-full"
            />
            <img src="/media/search.png" className="w-6 h-6" alt="Search Icon" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SearchTour;
