import { useCallback, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ScrollTrigger } from "./lib/gsap";
import { SmoothScroll } from "./lib/SmoothScroll";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Grain } from "./components/Grain";
import { ScrollProgress } from "./components/ScrollProgress";
import { Preloader } from "./components/Preloader";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { Services } from "./pages/Services";
import { Contact } from "./pages/Contact";

export default function App() {
  const [booted, setBooted] = useState(false);

  const onBoot = useCallback(() => {
    setBooted(true);
    // Hero pin + all triggers measured against final layout.
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  return (
    <SmoothScroll>
      {!booted && <Preloader onDone={onBoot} />}
      <Grain />
      <ScrollProgress />
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </SmoothScroll>
  );
}
