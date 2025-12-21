import { ArrowRightIcon } from "@phosphor-icons/react";

const About: React.FC = () => {
  return (
    <section className="py-48 px-16">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {/* Text Content */}
        <div className="space-y-8">
          <h3 className="text-3xl font-medium text-gray-900 text-left leading-12">
            Beyond tech & design, you'll find me at the gym, with a book or
            beside a good old cup of coffee.
          </h3>
          <a
            href="/about"
            className="flex gap-2 w-fit items-center font-medium text-xl bg-[#40764c] hover:text-[#ffbdbd] text-white px-4 py-2 rounded-full transition-colors"
          >
            <span>There's more</span> <ArrowRightIcon size={24} />
          </a>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="aspect-auto rounded-3xl overflow-hidden">
            <img
              src="https://framerusercontent.com/images/vOYJy1laClCRHotnHnpRC94.webp?width=408&height=728"
              alt="Personal photo 1"
              className="w-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden">
              <img
                src="https://framerusercontent.com/images/3n3oct1xL22Gun1EFABtVS0kvJc.jpg"
                alt="Personal photo 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] rounded-3xl overflow-hidden">
              <img
                src="https://framerusercontent.com/images/G2AiN7k9rTqJNzgtoX61WF3Y.jpg"
                alt="Personal photo 3"
                className="w-full object-cover"
                style={{ height: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
