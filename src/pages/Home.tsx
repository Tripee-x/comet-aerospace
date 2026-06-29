import { MissileHero } from "../sections/MissileHero";
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
      <MissileHero />
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
