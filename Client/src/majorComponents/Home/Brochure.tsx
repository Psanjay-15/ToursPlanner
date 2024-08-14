import { Link } from "react-router-dom";
import ShinyButton from "../../components/magicui/shiny-button";

const Brochure = () => {
  return (
    <>
      <div className="flex flex-row mt-8 m-8 px-[1px] py-[2px] border-2 rounded-xl shadow-md">
        <div className=" w-[50%] h-[380px] p-2  bg-[url('/media/bro.png')]  bg-cover"></div>
        <div className="w-[50%] flex flex-col justify-center items-center p-6">
          <p className="text-center font-extrabold text-4xl ">
            To get more information about the tour please click on the below
            button and download the brochure
          </p>
          <Link to="https://drive.google.com/file/d/1CxJafG6HF8D8AP--0yJrnLmuZKHojzCn/view" target="_blank">
            <ShinyButton
              text="Create an Account"
              className="flex flex-row my-8 px-8 py-2 w-[100%] text-gray-900 bg-orange-100 border-2 rounded-xl text-l font-semibold hover:bg-orange-200 hover:border-orange-250 max-sm:text-[10px] shadow-md"
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
