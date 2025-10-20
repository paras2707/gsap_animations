import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useEffect, useState } from "react";
import Lenis from "lenis";

const Gallery = () => {
  const containerRef = useRef();
  const lenisRef = useRef();
  const [imagePositions, setImagePositions] = useState([]);

  // Function to generate structured positions with proper spacing
  const generateImagePositions = () => {
    const positions = [];

    // Image data with their sections and predefined positions
    const imageData = [
      // Section 0 - 3 images evenly distributed across width
      {
        src: "project1.webp",
        alt: "project1",
        section: 0,
        maxWidth: 300,
        left: 5,
        top: 10,
      },
      {
        src: "project2.webp",
        alt: "project2",
        section: 0,
        maxWidth: 300,
        left: 40,
        top: 50,
      },
      {
        src: "project3.webp",
        alt: "project3",
        section: 0,
        maxWidth: 300,
        left: 70,
        top: 15,
      },

      // Section 1 - 3 images evenly distributed across width
      {
        src: "project4.webp",
        alt: "project4",
        section: 1,
        maxWidth: 300,
        left: 8,
        top: 50,
      },
      {
        src: "project5.webp",
        alt: "project5",
        section: 1,
        maxWidth: 300,
        left: 50,
        top: 100,
      },
      {
        src: "project6.webp",
        alt: "project6",
        section: 1,
        maxWidth: 300,
        left: 75,
        top: 5,
      },

      // Section 2 - 3 images evenly distributed across width
      {
        src: "project7.webp",
        alt: "project7",
        section: 2,
        maxWidth: 320,
        left: 5,
        top: 25,
      },
      {
        src: "project8.webp",
        alt: "project8",
        section: 2,
        maxWidth: 300,
        left: 35,
        top: 40,
      },
      {
        src: "project9.webp",
        alt: "project9",
        section: 2,
        maxWidth: 300,
        left: 70,
        top: 0,
      },

      // Section 3 - 3 images evenly distributed across width
      {
        src: "project10.webp",
        alt: "project10",
        section: 3,
        maxWidth: 300,
        left: 10,
        top: 0,
      },
      {
        src: "project11.webp",
        alt: "project11",
        section: 3,
        maxWidth: 300,
        left: 38,
        top: 100,
      },
      {
        src: "project12.webp",
        alt: "project12",
        section: 3,
        maxWidth: 300,
        left: 40,
        top: 0,
      },

      // Section 4 - 3 images evenly distributed across width
      {
        src: "project13.webp",
        alt: "project13",
        section: 4,
        maxWidth: 300,
        left: 5,
        top: 0,
      },
      {
        src: "project14.webp",
        alt: "project14",
        section: 4,
        maxWidth: 300,
        left: 55,
        top: 50,
      },
      {
        src: "project15.webp",
        alt: "project15",
        section: 4,
        maxWidth: 300,
        left: 78,
        top: 5,
      },
    ];

    imageData.forEach((img, index) => {
      positions.push({
        ...img,
        id: `img-${index}`,
      });
    });

    return positions;
  };

  // Generate positions on component mount
  useEffect(() => {
    setImagePositions(generateImagePositions());
  }, []);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    // Create a new Lenis instance with faster settings
    lenisRef.current = new Lenis({
      duration: 0.6, // Reduced animation duration for faster response
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Ease out expo
      direction: "vertical", // Vertical scroll
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.5, // Increased multiplier for faster scrolling
      smoothTouch: false, // Smooth scrolling for touch devices
      touchMultiplier: 2.5, // Increased for faster touch response
    });

    // Create a RAF loop for Lenis
    function raf(time) {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    }

    // Start the animation loop
    requestAnimationFrame(raf);

    // Connect GSAP's ticker to Lenis for synchronization
    gsap.ticker.add((time) => {
      lenisRef.current.raf(time * 1000);
    });

    // Cleanup on component unmount
    return () => {
      gsap.ticker.remove((time) => {
        lenisRef.current.raf(time * 1000);
      });
      lenisRef.current.destroy();
    };
  }, []);

  useGSAP(() => {
    // Select all images in the gallery
    const images = gsap.utils.toArray(".parallax-section img");

    // Apply different speeds to each image
    images.forEach((img, i) => {
      // Calculate a unique speed for each image with more variations
      // Using a rich array of speeds for a more immersive parallax effect
      const baseSpeed = 0.3; // Increased base speed for faster movement
      // Extended array with higher speed values for more dynamic movement
      const speedVariation = [
        0.3,
        0.5,
        0.7,
        0.9,
        1.1, // Faster base speeds
        1.2,
        1.4,
        1.6, // Higher medium speeds
        0.6,
        1.3,
        1.3, // Mixed speeds
        0.7,
        1.0,
        1.0,
        1.2,
        1.5, // Additional variations with higher values
      ];

      // Get a speed from the variation array, cycling through the options
      const speedIndex = i % speedVariation.length;
      // Add a tiny random factor for even more natural movement
      const randomFactor = Math.random() * 0.05;
      const speed = baseSpeed + speedVariation[speedIndex] + randomFactor;

      // Adjust speed based on image position in the document
      // Images further down need more movement
      const imageIndex = i;
      const totalImages = images.length;
      const positionFactor = 1 + (imageIndex / totalImages) * 0.5; // Increase speed for later images

      gsap.to(img, {
        y: `-${speed * positionFactor * 1000}%`, // Apply translation with position factor
        ease: "power1.out", // Faster easing for quicker response
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // Earlier start point for faster initial movement
          end: "bottom top", // Extended end point to ensure bottom images complete their movement
          scrub: 0.3, // Even faster scrub for more responsive movement
          invalidateOnRefresh: true,
        },
      });
    });
  }, [imagePositions]);

  // Group images by section
  const sections = imagePositions.reduce((acc, img) => {
    if (!acc[img.section]) {
      acc[img.section] = [];
    }
    acc[img.section].push(img);
    return acc;
  }, {});

  return (
    <div ref={containerRef} className="mt-16">
      {Object.keys(sections).map((sectionIndex) => (
        <div
          key={sectionIndex}
          className="relative min-h-[700px] parallax-section"
        >
          {sections[sectionIndex].map((img) => (
            <img
              key={img.id}
              src={img.src}
              alt={img.alt}
              className="absolute"
              style={{
                left: `${img.left}%`,
                top: `${img.top}%`,
                maxWidth: `${img.maxWidth}px`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Gallery;
