import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const HeroSlider = () => {
  return (
    <section>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay, Navigation]}
        autoplay={{ delay: 10000 }}
      >
        <SwiperSlide>
          <div
            className="hero h-[75vh]"
            style={{
              backgroundImage:
                "url(https://images.businessnewsdaily.com/app/uploads/2022/04/04073226/Survey_Getty_AndreyPopv.jpg)",
            }}
          >
            <div className="hero-overlay bg-black bg-opacity-70"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md space-y-3">
                <h2 className="text-4xl md:text-5xl">
                  Unleash the power of your voice!
                </h2>
                <p>
                  Engage in surveys, express your thoughts, and make an impact
                  from above. Join the conversation, share your opinions, and
                  shape the narrative. Your voice matters, and together, we can
                  influence change. Participate, be heard, and let your
                  perspective shape the future.
                </p>
                <button className="primary-button">Explore Now</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="hero h-[75vh]"
            style={{
              backgroundImage:
                "url(https://assets-global.website-files.com/64022de562115a8189fe542a/642da315621cd3ff8894f9d6_Rating-Scales-For-Surveys-1024x577.jpeg)",
            }}
          >
            <div className="hero-overlay bg-black bg-opacity-70"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md space-y-3">
                <h2 className="text-4xl md:text-5xl">
                  Unleash the power of your voice!
                </h2>
                <p>
                  Engage in surveys, express your thoughts, and make an impact
                  from above. Join the conversation, share your opinions, and
                  shape the narrative. Your voice matters, and together, we can
                  influence change. Participate, be heard, and let your
                  perspective shape the future.
                </p>
                <button className="primary-button">Explore Now</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default HeroSlider;
