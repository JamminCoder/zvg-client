import "../../css/Home.css";
import { useEffect, useState } from "react";

import HeaderSection from "./HeaderSection";
import ProductsDisplay from "./ProductDisplay";

import CabinSection from "./CabinSection";
import * as contentEndpoints from "../../endpoints/content";


export default function Home() {
  const [homepageInfo, setHomepageInfo] = useState(null);
  const [attempt, setAttempt] = useState(false);

  useEffect(() => {
    if (!attempt) {
      contentEndpoints.getHomepageInfo()
      .then(res => {
        setHomepageInfo(res.data);
      });

      setAttempt(true);
    }
  });

  return (
    <div>
      <HeaderSection />
      <main>
        {
          homepageInfo
          ? <div className="grid place-content-center text-center py-16 bg-slate-100">
              <h2 className="text-4xl font-medium mb-4">{ homepageInfo.header }</h2>
              <p className="font-light text-xl">
                { homepageInfo.lead }
              </p>
            </div>
          : ""
        }
        
        <ProductsDisplay/>
        
        <CabinSection />
      </main>
    </div>
  );
}

