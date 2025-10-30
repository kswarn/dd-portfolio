import { StudentIcon, MapPinIcon } from "@phosphor-icons/react";

const Hero: React.FC = () => {
  return (
    <section className="pt-60 pb-20 px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center sm:mb-8 md:mb-16 lg:mb-16">
          <p className="text-[42px] md:text-[42px] sm:text-left md:text-center lg:text-center sm:text-[24px] lg:text-[42px] font-medium text-gray-900 mb-8">
            I'm a design engineer determined to build products that <br></br>{" "}
            understand human behaviour.
          </p>
        </div>

        <div className="flex flex-col md:flex-row sm:gap-4 md:gap-24 lg:gap-24 sm:items-start justify-center items-center">
          <div className="flex items-center gap-4">
            <div className="bg-[#ffbdbd] rounded-full p-2 w-10 h-10 flex items-center justify-center">
              <StudentIcon size={30} weight="bold" />
            </div>
            <h6 className="text-xl font-medium text-gray-900">
              MS in Human-Computer Interaction
            </h6>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-[#ffbdbd] rounded-full p-2 w-10 h-10 flex items-center justify-center">
              <MapPinIcon size={30} weight="bold" />
            </div>
            <h6 className="text-xl font-medium text-gray-900">UT Austin</h6>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
