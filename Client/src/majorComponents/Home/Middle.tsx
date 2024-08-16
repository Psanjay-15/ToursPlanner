import Brochure from "./Brochure";
import Tours from "./Tours";

const Middle = () => {
  return (
    <>
      <div className="h-fit">
        <div className="h-[92vh] flex flex-col md:flex-row max-md:h-[80vh]">
          <div className="w-full md:w-[60%] pt-[60px] pl-5 md:pl-10 bg-[url('/media/collage1.png')] bg-cover md:pt-[40px]">
            <div className="flex justify-center items-center text-center w-full">
              <p className="font-extrabold bg-gradient-to-tr from-gray-900 to-gray-400 bg-clip-text text-transparent text-4xl md:text-[75px] leading-[50px] md:leading-[100px]">
                Travel with Purpose, Plan with Ease{" "}
                <p className="font-extrabold text-4xl md:text-[70px]">
                  with{" "}
                  <span className="font-extrabold text-5xl md:text-[80px] bg-gradient-to-tr from-red-700 to-orange-200 bg-clip-text text-transparent">
                    TripEzz.
                  </span>
                </p>
              </p>
            </div>
          </div>
          <div className="w-full md:w-2/4 h-[40vh] md:h-full bg-[url('/media/collage.png')] bg-cover"></div>
        </div>
      </div>
      <Tours />
      <div>
        <Brochure />
      </div>
    </>
  );
};

export default Middle;
