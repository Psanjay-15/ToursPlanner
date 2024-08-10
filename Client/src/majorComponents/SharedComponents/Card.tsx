import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  id: string;
  coverImage: string;
  //photos: string[];
  title: string;
  description: string;
  duration: string;
  price: number;
  ratingsAverage: number;
}

const Card: React.FC<CardProps> = ({
  id,
  coverImage,
  //photos,
  title,
  description,
  duration,
  price,
  ratingsAverage,
}) => {
  return (
    <div className="border p-4 rounded shadow-lg max-w-xs">
      <img
        src={coverImage}
        alt={title}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="text-xl font-bold mt-4">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      <p className="text-gray-600 mt-2">{duration} </p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-semibold">
          ₹{price.toFixed(2)}/person
        </span>
        <span className="text-gray-700">⭐ {ratingsAverage}</span>
      </div>
      <Link to={`/tour-details/${id}`}>
        <button className="text-gray-900 w-[50%] bg-orange-100 py-2 px-8 rounded mt-4  hover:bg-orange-200 hover:border-orange-250 ">
          Details
        </button>
      </Link>
    </div>
  );
};

export default Card;
