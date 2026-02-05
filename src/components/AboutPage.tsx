import { useState, useEffect } from "react";
import { ArrowUpRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import Contact from "./Contact";
import Header from "./Header";

const LG_BREAKPOINT = 1024;

const AboutPage: React.FC = () => {
  const [writingIndex, setWritingIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${LG_BREAKPOINT}px)`);
    const update = () => setCardsPerView(mq.matches ? 3 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // const experience = [
  //   {
  //     duration: "2024-2025",
  //     title: "UI Engineer at Lloyd's Register",
  //   },
  //   {
  //     duration: "2023-2024",
  //     title: "Co-Founder, Design and Engineering at RevOwl",
  //   },
  //   {
  //     duration: "2022-2023",
  //     title: "Founding Engineer at SaaSPay Pvt Ltd",
  //   },
  //   {
  //     duration: "2020-2022",
  //     title: "Software Development Engineer at SawoLabs Pvt Ltd",
  //   },
  // ];
  const writings = [
    {
      yearOfPublication: 2025,
      medium: "Substack",
      url: "https://swarnakadagadkai.substack.com/p/designing-an-ios-app-for-mito-health",
      title: "Designing an iOS app for Mito Health",
      blurb:
        "A walkthrough of the design process for Mito Health's iOS app—research, flows, and UI decisions.",
    },
    {
      yearOfPublication: 2024,
      medium: "Medium",
      url: "https://medium.com/design-bootcamp/landing-page-design-for-huli-jaggery-rum-1fd34593e18f",
      title: "Designing a landing page for Huli – India's First Jaggery Rum",
      blurb:
        "How we designed a landing page that captures the story and craft of India's first jaggery rum.",
    },
    {
      yearOfPublication: 2024,
      medium: "Medium",
      url: "https://medium.com/@swarnak/authentication-using-auth0-with-nextjs-and-django-eb9a20ecf050",
      title: "Authentication with Auth0 using NextJS and Django",
      blurb:
        "Integrating Auth0 across a Next.js frontend and Django backend for secure, scalable auth.",
    },
    {
      yearOfPublication: 2022,
      medium: "Medium",
      url: "https://medium.com/@swarnak/host-your-flask-app-on-amazon-ecs-part-1-ci-cd-pipeline-36d795ea9dac",
      title: "Hosting a Flask app on Amazon ECS",
      blurb:
        "Part 1 of a guide to deploying a Flask app on Amazon ECS with a CI/CD pipeline.",
    },
  ];

  useEffect(() => {
    const max = Math.max(0, writings.length - cardsPerView);
    setWritingIndex((i) => Math.min(i, max));
  }, [cardsPerView, writings.length]);

  const maxIndex = Math.max(0, writings.length - cardsPerView);
  const canGoPrev = writingIndex > 0;
  const canGoNext = writingIndex < maxIndex;

  const goToPrev = () => {
    if (canGoPrev) setWritingIndex((i) => i - 1);
  };
  const goToNext = () => {
    if (canGoNext) setWritingIndex((i) => i + 1);
  };
  return (
    <div className="flex flex-col gap-28">
      <Header />
      <section className="pt-60 px-16 flex flex-col gap-32">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          {/* Text Content */}
          <div className="space-y-8">
            <h3 className="text-4xl font-medium text-gray-900 text-left md:text-center leading-14">
              Austin-based <span>Design Engineer</span> building experiences{" "}
              <br></br> that transform people & business
            </h3>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
            <div className="aspect-auto overflow-hidden">
              <img
                src="https://framerusercontent.com/images/NhyMYcYfjdNttDxOGVTOzwmnu0.jpg"
                alt="Personal photo 1"
                className="rounded-3xl md:mt-4 lg:mt-4 sm:mt-0"
                style={{ height: "95%" }}
              />
            </div>
            <div className="space-y-4">
              <div className="aspect-auto rounded-3xl overflow-hidden">
                <img
                  src="https://framerusercontent.com/images/tG5tZUNXk5OPC69bu6XxxzEvWk.jpg"
                  alt="Personal photo 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-auto rounded-3xl overflow-hidden">
                <img
                  src="https://framerusercontent.com/images/flyMXP1mtn8gvZ48rU0nwMlR34.jpg"
                  alt="Personal photo 3"
                  className="w-full h-full object-cover object-bottom"
                />
              </div>
            </div>
            <div className="aspect-auto  overflow-hidden">
              <img
                src="https://framerusercontent.com/images/jje8WKtpA5gW66mJNK1zbclDtSY.jpg"
                alt="Personal photo 3"
                className="w-full object-cover rounded-3xl sm:mt-0 md:mt-8 lg:mt-8"
                style={{ height: "90%" }}
              />
            </div>
            <div className="aspect-auto  overflow-hidden">
              <img
                src="https://framerusercontent.com/images/ZTqJu5x1avzZZrxUMP27lXXeaW4.jpeg?scale-down-to=2048&width=2098&height=3676"
                alt="Personal photo 3"
                className="w-full h-full object-cover rounded-3xl"
                style={{ height: "95%" }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full items-center md:items-start">
          <div className="w-full md:w-1/2 flex flex-col gap-8">
            <p className="text-3xl font-medium leading-12">
              I’m currently a graduate student majoring in <br></br>{" "}
              {/* <span className="decorative-subtext"> */}
              Human Computer Interaction and UX {/* </span>{" "} */}
              at UT Austin
            </p>
            <div className="flex flex-col gap-4 font-medium text-lg">
              {" "}
              <p>
                I started off as a full stack developer at a 0-1 startup in
                Bangalore, where I developed a fascination to combine
                technology, human psychology and business. Since then I've been
                carving my own space in the tech industry as a design engineer.
                I have immense appreciation for software and how it's built to
                accomodate the needs of the society.{" "}
              </p>
              <p>
                To fulfill my burning desire to build products, I co-founded
                RevOwl, an interactive product demo builder for sales and
                marketing teams. The experience of creating and leading a
                solution was transformative to say the least. It led me to
                explore the depths of design like never before. Now, I'm on a
                mission to not just build products as a software engineer but to
                build experiences that allow users to engage in a resourceful
                and trustworthy relationship with software.{" "}
              </p>
              <p>
                Technology is evolving at a much faster rate than we are and I'm
                determined to bridge the gap by leading with empathy and
                sincerity. At UT Austin, I'm refining and recaliberating my
                approach to software engineering and product design and I'm
                excited to graduate with a more nuanced and well-rounded
                approach to building software.{" "}
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex-shrink-0 flex justify-center md:justify-start overflow-visible">
            <img
              src="/images/experience illustration.svg"
              alt="Experience illustration"
              className="max-w-full h-auto object-contain rounded-2xl scale-[1.1]"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          {/* <div>
            <p className="text-3xl font-semibold">Experience</p>
            <ul>
              {experience.map((item) => (
                <li key={item.title} className="flex flex-col gap-2 my-8">
                  <p className="text-gray-700 text-md">{item.duration}</p>
                  <p className="text-xl font-medium">{item.title}</p>
                </li>
              ))}
            </ul>
          </div> */}
          <div className="md:col-span-2">
            <p className="text-3xl font-semibold mb-12">Writing</p>
            <div className="overflow-hidden w-full">
              <div
                className="flex items-stretch transition-transform duration-300 ease-out pb-4"
                style={{
                  width: `${writings.length * (100 / cardsPerView)}%`,
                  transform: `translateX(-${writingIndex * (100 / writings.length)}%)`,
                }}
              >
                {writings.map((item) => (
                  <a
                    key={item.url}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0  group block text-left pr-8 h-full"
                    style={{ width: `${100 / writings.length}%` }}
                  >
                    <div className="border border-[#40764c] rounded-2xl p-6 md:p-8 hover:translate-y-0.5 transition-transform duration-300 h-full flex flex-col min-h-[300px]">
                      <h4 className="text-xl font-semibold text-[#40764c] mb-3">
                        {item.title}
                      </h4>

                      <p className="text-gray-500 text-md mb-4 flex-1 min-h-0">
                        {item.blurb}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col justify-between gap-x-4 gap-y-1 text-sm text-gray-500">
                          <span className="text-xs">
                            {item.yearOfPublication}
                          </span>
                          <span className="text-gray-700">{item.medium}</span>
                        </div>
                        <span className="hover:translate-x-1 border border-[#40764c] transition-transform duration-300 rounded-lg p-2 text-gray-700 group-hover:text-gray-900">
                          <ArrowUpRight
                            size={14}
                            weight="bold"
                            color="#40764c"
                            className="flex-shrink-0"
                          />
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-12 flex justify-center gap-2">
              <button
                type="button"
                onClick={goToPrev}
                disabled={!canGoPrev}
                className="p-2 rounded-full border cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                aria-label="Previous"
              >
                <CaretLeft size={16} weight="bold" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                disabled={!canGoNext}
                className="p-2 rounded-full border cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                aria-label="Next"
              >
                <CaretRight size={16} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <Contact />
    </div>
  );
};

export default AboutPage;
