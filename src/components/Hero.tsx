import { StudentIcon, MapPinIcon } from "@phosphor-icons/react";

const Hero: React.FC = () => {
  return (
    <section className="pt-60 pb-20 px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center sm:mb-8 md:mb-16 lg:mb-16">
          <p className="text-[36px] md:text-[42px] text-left md:text-center lg:text-center lg:text-[42px] font-medium text-gray-900 mb-8">
            I'm a{" "}
            <span className="decorative-hero-text rotating">
              design engineer{" "}
            </span>{" "}
            determined to build products that <br></br> understand{" "}
            <span className="decorative-subtext">human behaviour</span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-24 lg:gap-24 items-start justify-center md:items-center lg:items-center">
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
