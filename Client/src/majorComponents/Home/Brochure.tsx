import { Link } from "react-router-dom";
import ShinyButton from "../../components/magicui/shiny-button";

const Brochure = () => {
  return (
    <>
      <div className="flex flex-row max-sm:flex-col-reverse  mx-8 max-sm:mx-8 lg:py-0  max-sm:py-1 border-2 rounded-xl shadow-md">
        <div className="w-full md:w-[50%] h-[150px] lg:h-[380px] p-2 bg-[url('/media/bro.png')] bg-cover rounded-xl md:rounded-none "></div>
        <div className="w-full md:w-[50%] flex flex-col justify-center items-center p-4 md:p-6 mt-4 md:mt-0">
          <p className="text-center font-extrabold text-xl md:text-4xl mb-4">
            To get more information about the tour, please click the button
            below and download the brochure.
          </p>
          <Link
            to="https://drive.google.com/file/d/1CxJafG6HF8D8AP--0yJrnLmuZKHojzCn/view"
            target="_blank"
            className="w-full flex justify-center"
          >
            <ShinyButton
              text="Download"
              className="w-[50%] max-sm:w-[50%] flex justify-center my-4 px-6 py-2 text-gray-900 bg-orange-100 border-2 rounded-xl text-sm md:text-lg font-semibold hover:bg-orange-200 hover:border-orange-250 shadow-md"
            >
              Download
            </ShinyButton>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Brochure;
