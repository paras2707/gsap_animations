import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Reveal from "./components/Reveal";
import Navbar from "./components/Navbar";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <>
      <Reveal />
      {/* <div className="h-screen w-screen z-50 relative"></div> */}
    </>
  );
};

export default App;
