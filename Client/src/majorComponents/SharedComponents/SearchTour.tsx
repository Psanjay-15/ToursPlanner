import React from "react";
const SearchTour = () => {
  return (
    <>
      <div>
        <div className="flex flex-row justify-center bo]rder-2 p-8">
          <div className="flex flex-row border-2 rounded-full items-center justify-between px-4 w-[30%]">
            <input placeholder="Search" className="g-black py-2 text-xl placeholder-accent-foreground" />
            <img src="/media/search.png" className="w-6 h-6" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchTour;