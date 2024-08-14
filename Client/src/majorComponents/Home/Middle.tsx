import Tours from "./Tours";

const Middle = () => {
  return (
    <>
      <div className="h-fit">
        <div className=" h-[92vh] flex flex-row ">
          <div className=" w-[60%] pt-[60px] pl-10  bg-[url('/media/collage1.png')] bg-cover ">
            <div className="flex justif items-center text-center w-[95%] boder-2">
              <p className="w-auto h-fit font-[820] bg-gradient-to-tr from-gray-900  to-gray-400 bg-clip-text text-transparent text-[70px] leading-[90px]">
                Travel with Purpose, Plan with Ease{" "}
                <p className=" font-[850] text-[70px]">
                  with{"  "}
                  <span className="font-[850] text-[80px] bg-gradient-to-tr from-red-700  to-orange-200 bg-clip-text text-transparent">
                    TripEzz.
                  </span>
                </p>
              </p>
            </div>
          </div>
          <div className=" w-2/4 bg-[url('/media/collage.png')] bg-cover"></div>
        </div>
      </div>
      <Tours />
    </>
  );
};

export default Middle;
