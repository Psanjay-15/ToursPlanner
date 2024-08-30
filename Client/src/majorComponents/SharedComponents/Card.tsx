import React from "react";
import { Link } from "react-router-dom";
import ShinyButton from "../../components/magicui/shiny-button";

interface CardProps {
  id: string;
  coverImage: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  ratingsAverage: number;
}

const Card: React.FC<CardProps> = ({
  id,
  coverImage,
  title,
  description,
  duration,
  price,
  ratingsAverage,
}) => {
  return (
    <div className="border-2 rounded-xl p-4 transform transition-transform duration-300 hover:scale-105 shadow-md">
      <img
        src={coverImage}
        alt={title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3 className="text-xl font-bold mt-4">{title}</h3>
      <p className="text-gray-600 mt-2 line-clamp-3">{description}</p>
      <p className="text-gray-600 mt-2 font-semibold">{duration}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-semibold">₹{price.toFixed(2)}/person</span>
        <span className="text-gray-700">⭐ {ratingsAverage.toFixed(1)}</span>
      </div>

      <Link to={`/tour-details/${id}`}>
        <div className="text-center flex justify pt-4">
          <ShinyButton
            text="Details"
            className="flex flex-row w-[40%] text-gray-900 bg-orange-100 border-2 rounded-xl py-2 px- text-l font-semibold hover:bg-orange-200 hover:border-orange-250 max-sm:text-[10px] shadow-md"
          >
            Details
          </ShinyButton>
        </div>
      </Link>
    </div>
  );
};

export default Card;
