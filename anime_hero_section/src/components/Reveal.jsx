import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";
import { imageData } from "../constants/data";
import Navbar from "./Navbar";

const Reveal = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  const timeline = gsap.timeline();

  useGSAP(() => {
    const clouds = gsap.utils.toArray(".clouds");
    // create a paused title tween that we'll play after shuriken completes
    const titleTween = gsap.to("#title", {
      opacity: 1,
      scale: 1,
      ease: "power1.inOut",
      duration: 0.5,
      paused: true,
    });

    const stripeTween = gsap.to("#stripe", {
      opacity: 1,
      ease: "power1.inOut",
      duration: 0.5,
      paused: true,
      delay: 0.5,
    });

    const cloudsTween = gsap.fromTo(
      ".clouds",
      {
        opacity: 0,
        ease: "power1.inOut",
        duration: 0.5,
        paused: true,
        delay: 1,
      },
      {
        opacity: 1,
        ease: "power1.inOut",
        duration: 0.5,
        paused: true,
        delay: 1,
      }
    );

    const imageTween = gsap.from(".img-pop", {
      yPercent: 100,
      opacity: 0,
      stagger: 0.2,
      ease: "elastic.inOut",
      duration: 1,
      paused: true,
      delay: 1,
    });

    const revealTween = gsap.to(".reveal", {
      opacity: 1,
      scale: 1,
      ease: "elastic.inOut",
      duration: 0.75,
      stagger: 0.2,
      paused: true,
    });

    // keep shuriken animation exactly as-is; only add callback to trigger title
    timeline.to(
      ".shuriken-1",
      {
        rotation: 360 * 2,
        scale: 15,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".shuriken-1",
          start: "top 30%",
          end: "top 5%",
          scrub: true,
          onLeave: () => {
            titleTween.play();
            stripeTween.play();
            revealTween.play();
            imageTween.play();
            cloudsTween.play();
            setShowNavbar(true);
          },
          onEnterBack: () => {
            titleTween.reverse();
            stripeTween.reverse();
            revealTween.reverse();
            imageTween.reverse();
            cloudsTween.reverse();
            setShowNavbar(false);
          },
        },
      },
      "<"
    );

    clouds.forEach((cloud) => {
      gsap.to(cloud, {
        yPercent: -10,
        repeat: -1,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        delay: Math.random() * 2, // random delay up to 2s
      });
    });

    gsap.to(".arrow", {
      opacity: 0,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".arrow",
        start: "top 95%",
        end: "top 85%",
        scrub: true,
      },
    });
  }, []);

  const handleClick = () => {
    if (isRevealed) return;
    const imgTimeline = gsap.timeline();

    gsap.to("#stripe", {
      overflow: "visible",
      duration: 0.5,
      ease: "power1.inOut",
      delay: 0.5,
    });

    imgTimeline
      .to("#stripe img", {
        bottom: 10,
        duration: 0.5,
        ease: "power1.inOut",
      })
      .to("#stripe img", {
        scale: 1.5,
        bottom: "-125%",
        duration: 1,
        stagger: 0.1,
        ease: "expo.out",
      });
  };

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="h-screen w-screen bg-[#0e1111] overflow-hidden flex items-center justify-center">
        <div className=" shuriken-1"></div>

        <p
          id="title"
          className="text-white text-8xl fixed font-bold scale-0 opacity-0 uppercase text-center origin-center z-20 tracking-widest"
        >
          Anime Fans <br /> Assemble
        </p>

        <div>
          <img
            src="top3.png"
            alt="top3"
            className="reveal fixed w-48 opacity-0 scale-0 top-[31%] -translate-y-1/2 left-[50%] -translate-x-1/2 origin-center"
          />
          <img
            className="clouds fixed top-10 left-20 w-60"
            src="cloud1.png"
            alt="clouds"
          />
          <img
            className="clouds fixed top-50 left-80 w-48"
            src="cloud2.png"
            alt="clouds"
          />
          <img
            className="clouds fixed top-25 left-[50%] -translate-x-1/2 w-28"
            src="cloud2.png"
            alt="clouds"
          />
          <img
            className="clouds fixed top-30 right-50 w-80 scale-x-[-1]"
            src="cloud1.png"
            alt="clouds"
          />

          <img
            className="clouds fixed top-10 right-30 w-30 scale-x-[-1]"
            src="cloud2.png"
            alt="clouds"
          />
        </div>
        <div
          id="stripe"
          className="w-full h-56 opacity-0 fixed bg-blue-950 overflow-hidden"
        >
          {imageData.map((image) => (
            <img
              key={image.alt}
              src={image.image}
              alt={image.alt}
              className={`absolute img-pop ${image.width} ${image.position}`}
            />
          ))}
        </div>

        <div className="arrow absolute bottom-5 left-1/2 -translate-x-1/2 text-white opacity-70 z-10 text-2xl">
          &#x2193;
        </div>

        <img
          src="kurama.png"
          alt="kurama"
          className="img-pop opacity-100 fixed bottom-50 left-1/2 -translate-x-1/2 w-16"
        />
        <button
          onClick={() => {
            setIsRevealed(true);
            handleClick();
          }}
          className="reveal opacity-0 scale-0 fixed bottom-35 text-white text-4xl bg-blue-950 px-10 py-3 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:bg-white hover:text-blue-950"
        >
          Get Ready
        </button>
      </div>

      <div className="h-[35svh] w-screen bg-[#0e1111]"></div>
    </>
  );
};

export default Reveal;
