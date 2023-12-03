import Container from "../../components/Container/Container";
import SectionBanner from "../../components/SectionBanner/SectionBanner";
import HeroSlider from "./HeroSlider/HeroSlider";
import SurveyCard from "../../components/Cards/SurveyCard";
import useSurveysData from "../../hooks/useSurveysData";
import FaqForHome from "./FaqForHome";
import { useEffect } from "react";
import Aos from "aos";

const Home = () => {
  const [surveyData] = useSurveysData();

  const featuredData = surveyData?.filter((item) => item?.featured === "true");

  const latestData = surveyData?.filter(
    (item) => item?.create_date !== undefined
  );
  const sortedData = latestData?.sort(
    (a, b) => new Date(b.create_date) - new Date(a.create_date)
  );
  const latestSixSurveys = sortedData?.slice(0, 6);

  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-sine",
    });
  }, []);

  return (
    <>
      <HeroSlider />
      <section data-aos="fade-up">
        <Container>
          <div className="py-16">
            <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 capitalize dark:text-white">
              explore our awesome <strong>Application</strong>
            </h2>

            <iframe
              className="min-w-full mt-12 h-64 md:h-[450px] rounded-xl overflow-hidden"
              src="https://vimeo.com/showcase/7060635/video/525707984/embed"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowfullscreen=""
            ></iframe>

            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2">
              <div
                className="hover:shadow-xl transition-all p-6 border rounded-xl border-r-gray-200 dark:border-gray-700"
                data-aos="fade-right"
              >
                <div className="md:flex md:items-start md:-mx-4">
                  <span className="inline-block p-2 text-blue-500 bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </span>

                  <div className="mt-4 md:mx-4 md:mt-0">
                    <h4 className="text-xl font-medium text-gray-700 capitalize dark:text-white">
                      Elevate Your Engagement with Pro Membership
                    </h4>

                    <p className="mt-3 text-gray-500 dark:text-gray-300">
                      Enhance your surveying journey by accessing exclusive
                      features with our Pro Membership. Enjoy advanced
                      analytics, priority support, and the ability to provide
                      insightful comments on surveys.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="hover:shadow-xl transition-all p-6 border rounded-xl border-r-gray-200 dark:border-gray-700"
                data-aos="fade-left"
              >
                <div className="md:flex md:items-start md:-mx-4">
                  <span className="inline-block p-2 text-blue-500 bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                  </span>

                  <div className="mt-4 md:mx-4 md:mt-0">
                    <h4 className="text-xl font-medium text-gray-700 capitalize dark:text-white">
                      Streamlined Survey Management with an Intuitive Dashboard
                    </h4>

                    <p className="mt-3 text-gray-500 dark:text-gray-300">
                      Seize control with our intuitive dashboard. Administrators
                      can effortlessly oversee users, manage survey visibility,
                      and analyze responses through interactive charts. Survey
                      creators benefit from a simplified survey creation process
                      and efficient feedback management.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="hover:shadow-xl transition-all p-6 border rounded-xl border-r-gray-200 dark:border-gray-700"
                data-aos="fade-right"
              >
                <div className="md:flex md:items-start md:-mx-4">
                  <span className="inline-block p-2 text-blue-500 bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                      />
                    </svg>
                  </span>

                  <div className="mt-4 md:mx-4 md:mt-0">
                    <h4 className="text-xl font-medium text-gray-700 capitalize dark:text-white">
                      Customized Permissions with Robust Access Control
                    </h4>

                    <p className="mt-3 text-gray-500 dark:text-gray-300">
                      Align user roles with your team's responsibilities.
                      Administrators have comprehensive control, surveyors
                      manage survey creation and feedback, regular users
                      participate, and Pro members enjoy additional commenting
                      privileges. Foster effective collaboration with tailored
                      permissions.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="hover:shadow-xl transition-all p-6 border rounded-xl border-r-gray-200 dark:border-gray-700"
                data-aos="fade-left"
              >
                <div className="md:flex md:items-start md:-mx-4">
                  <span className="inline-block p-2 text-blue-500 bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </span>

                  <div className="mt-4 md:mx-4 md:mt-0">
                    <h4 className="text-xl font-medium text-gray-700 capitalize dark:text-white">
                      Seamless Experience on Any Device with Responsive Design
                    </h4>

                    <p className="mt-3 text-gray-500 dark:text-gray-300">
                      Access surveys anytime, anywhere! Our application is
                      crafted to seamlessly adapt to various devices, ensuring a
                      consistent and enjoyable experience on desktops, tablets,
                      and mobiles. Engage with surveys on the go without
                      compromising functionality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section data-aos="fade-up">
        <SectionBanner heading="Featured Surveys" />
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-5">
            {featuredData?.map((data) => {
              const surveyTotalVote = data.options.reduce(
                (acc, option) => acc + parseInt(option.vote_count),
                0
              );
              return (
                <SurveyCard
                  key={data._id}
                  surveyTotalVote={surveyTotalVote}
                  card={data}
                  badge={"Featured"}
                />
              );
            })}
          </div>
        </Container>
      </section>
      <section className="bg-base-200" data-aos="fade-up">
        <Container>
          <FaqForHome />
        </Container>
      </section>
      <section data-aos="fade-up">
        <SectionBanner heading="Latest Surveys" />
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-5">
            {latestSixSurveys?.map((data) => {
              const surveyTotalVote = data.options.reduce(
                (acc, option) => acc + parseInt(option.vote_count),
                0
              );
              return (
                <SurveyCard
                  key={data._id}
                  surveyTotalVote={surveyTotalVote}
                  card={data}
                />
              );
            })}
          </div>
        </Container>
      </section>
      <section data-aos="fade-up" className="bg-base-300">
        <Container>
          <div className="max-w-6xl px-6 py-10 mx-auto">
            <p className="text-xl font-medium text-blue-500 ">Testimonials</p>

            <h1 className="mt-2 text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
              What clients saying
            </h1>

            <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
              <div className="absolute w-full bg-blue-600 -z-10 md:h-96 rounded-2xl"></div>

              <div className="w-full p-6 bg-blue-600 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
                <img
                  className="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl"
                  src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                  alt="client photo"
                />

                <div className="mt-2 md:mx-6">
                  <div>
                    <p className="text-xl font-medium tracking-tight text-white">
                      Ema Watson
                    </p>
                    <p className="text-blue-200 ">Marketing Manager at Stech</p>
                  </div>

                  <p className="mt-4 text-lg leading-relaxed text-white md:text-xl">
                    {" "}
                    “Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Tempore quibusdam ducimus libero ad tempora doloribus
                    expedita laborum saepe voluptas perferendis delectus
                    assumenda”.
                  </p>

                  <div className="flex items-center justify-between mt-6 md:justify-start">
                    <button
                      title="left arrow"
                      className="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 hover:bg-blue-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>

                    <button
                      title="right arrow"
                      className="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 md:mx-6 hover:bg-blue-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Home;
