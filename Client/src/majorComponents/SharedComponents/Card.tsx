import React from "react";
import { Link } from "react-router-dom";
import ShineBorder from "../../components/magicui/shine-border";
import ShinyButton from "../../components/magicui/shiny-button";

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
    <ShineBorder
      className="relative flex h-[450px] w-full flex-col items-center border justify-center overflow-hidden bg-background md:shadow-xl  p-4 
      py-8 rounded-xl shadow-2xl max-w-xs transition-transform transform hover:scale-105 duration-300"
      color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
    >
      <div className=" ">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-48 object-cover rounded-lg "
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
          <div className="text-center flex justify pt-4">
            <ShinyButton
              text="Create an Account"
              className="flex flex-row w-[40%]  text-gray-900  bg-orange-100  Montserrat  border-2 rounded-xl py-2 px- text-l font-semibold hover:bg-orange-200 hover:border-orange-250 max-sm:text-[10px]"
            >
              Details
            </ShinyButton>
          </div>
        </Link>
      </div>
    </ShineBorder>
  );
};

export default Card;
