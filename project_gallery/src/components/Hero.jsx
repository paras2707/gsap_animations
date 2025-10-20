import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Hero = () => {
  useGSAP(() => {
    gsap.to("#hero-text", {
      opacity: 0,
      scrollTrigger: {
        trigger: "#hero-text",
        start: "top 20%",
        end: "bottom 20%",
        scrub: true,
      },
    });

    gsap.to("#more-coming-soon", {
      opacity: 1,
      scrollTrigger: {
        start: "45% bottom",
        end: "60% bottom",
        scrub: true,
      },
    });
  }, []);
  return (
    <>
      <div className="w-full h-[90svh] flex justify-center items-center">
        <svg
          className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          width="750"
          height="750"
          viewBox="0 0 1220 1220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_101_11)">
            <circle
              cx="610"
              cy="500"
              r="450"
              fill="url(#paint0_linear_101_11)"
            />
          </g>
          <g filter="url(#filter1_f_101_11)">
            <path
              d="M388 352L833 462.736V868L388 757.264V352Z"
              fill="url(#paint1_linear_101_11)"
              fill-opacity="0.4"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_101_11"
              x="0"
              y="0"
              width="1220"
              height="1220"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="100"
                result="effect1_foregroundBlur_101_11"
              />
            </filter>
            <filter
              id="filter1_f_101_11"
              x="238"
              y="202"
              width="745"
              height="816"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="75"
                result="effect1_foregroundBlur_101_11"
              />
            </filter>
            <linearGradient
              id="paint0_linear_101_11"
              x1="610"
              y1="200"
              x2="610"
              y2="1020"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FF7A00" stop-opacity="0" />
              <stop offset="1" stop-color="#FF5858" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_101_11"
              x1="610.5"
              y1="352"
              x2="610.5"
              y2="868"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#F9FFCB" />
              <stop offset="1" stop-color="#FFF200" />
            </linearGradient>
          </defs>
        </svg>
        <h3
          id="hero-text"
          className="text-[#FF5858] text-9xl tracking-wide leading-40 text-center uppercase z-10"
        >
          Where Ideas <br /> Turn Visual
        </h3>
        <h3
          id="more-coming-soon"
          className="text-center text-6xl font-bold fixed opacity-0"
        >
          More Coming Soon...
        </h3>
      </div>
    </>
  );
};

export default Hero;
