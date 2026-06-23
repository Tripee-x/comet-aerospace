import { Hero } from "../sections/Hero";
import { InteriorBay } from "../sections/InteriorBay";
import { Purpose } from "../sections/Purpose";
import { Mission } from "../sections/Mission";
import { Capabilities } from "../sections/Capabilities";
import { ProductPreview } from "../sections/ProductPreview";
import { ServicesPreview } from "../sections/ServicesPreview";
import { FounderNote } from "../sections/FounderNote";
import { FinalCTA } from "../sections/FinalCTA";

export function Home() {
  return (
    <>
      <Hero />
      <InteriorBay />
      <Purpose />
      <Mission />
      <Capabilities />
      <ProductPreview />
      <ServicesPreview />
      <FounderNote />
      <FinalCTA />
    </>
  );
}
