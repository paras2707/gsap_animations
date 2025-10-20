import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <main className="bg-[#FFF4EA] min-h-screen">
      <Navbar />
      <Hero />
      <Gallery />
    </main>
  );
};

export default App;
