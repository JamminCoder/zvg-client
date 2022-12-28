import "../css/Home.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { getAllProducts, getSlides } from "../api";
import ButtonMap from "../components/ButtonMap";
import { serverURL } from "../lib/utils";
import CategoryDisplay from "../components/CategoryDisplay"

function Slide({ parent, img, header, lead, buttons, sliderNum, max }) {
  let scrollWidth = document.body.clientWidth;
  const indicators = [];

  for (let i = 1; i <= max; i++) {
    let style = { backgroundColor: "rgba(0, 0, 0, 0.6)" }

    if (i === sliderNum) style = { backgroundColor: "white" };


    let indicator = <span key={i} className="w-3 aspect-square bg-white inline-block mx-2 rounded-full" style={style}></span>
    indicators.push(indicator);
  }

  function slideRight() {
    parent.scrollBy(scrollWidth, 0);
  }

  function slideLeft() {
    parent.scrollBy(-scrollWidth, 0);
  }


  const visibilityHidden = { visibility: "hidden" };

  const leftButton = <Button onClick={slideLeft} className="bg-white text-xl bg-opacity-80 aspect-square w-10 font-medium p-0" style={sliderNum === 1 ? visibilityHidden : {}}>&lt;</Button>;
  const rightButton = <Button onClick={slideRight} className="bg-white text-xl bg-opacity-80 aspect-square w-10 font-medium p-0" style={sliderNum === max ? visibilityHidden : {}}>&gt;</Button>;

  return (
    <section className="slide flex-grow w-[100vw] relative grid place-items-center" id={"slide-" + sliderNum}>

      <div className="w-[100vw]">
        {/* Image */}
        <img src={ serverURL(img) } alt="description here" className="h-[50vh] lg:h-[65vh] w-[100%] object-cover" />
      </div>

      <div className="welcome-header-section w-[100%] h-[100%] absolute grid place-items-center">
        <div className="flex flex-col items-center gap-2 max-w-[80%]">

          {/* Header and lead */}
          <h1 className="text-white text-center font-bold" style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}>{header}</h1>
          <p className="text-center text-white text-2xl font-light">{lead}</p>

          <div className="flex justify-center gap-4 mt-2">

            {/* Buttons */}
           <ButtonMap buttonsArray={ buttons }/>

          </div>

          <div className="flex gap-4 items-center mt-6">
            {leftButton}

            {/* Slider indicators */}
            <div>
              {indicators}
            </div>

            {rightButton}
          </div>


        </div>
      </div>
    </section>
  );
}


function HeaderSection(props) {
  const [slider, setSlider] = useState(document.querySelector(".welcome-slider"));
  const [slides, setSlides] = useState(null);

  useEffect(() => {
    if (!slider) setSlider(document.querySelector(".welcome-slider"));
    if (!slides && slider) {
      getSlides()
      .then(slidesData => {
        const slidesArray = [];

        let i = 1;
        slidesData.forEach(slideData => {
          slidesArray.push(
          <Slide
            parent={slider}
            img={ slideData.image_path }
            header={ slideData.header }
            lead={ slideData.lead }
            buttons={ slideData.buttons }
      
            sliderNum={i}
            key={i}
            max={slidesData.length}
          />);
          
          i++;
        })

        setSlides(slidesArray);
      })
    }
  });

  return (
    <div className="welcome-slider relative">
      { slides }
    </div>
  );
}


function CabinSection() {
  return (
    <div>
      <section className="relative h-[70vh] overflow-hidden">
        <img src={`${process.env.PUBLIC_URL}/img/cabin.png`} alt="description here" className="h-[70vh] w-[100%] object-cover absolute top-0" />

        <div className="absolute top-0 grid place-items-center w-[100%] h-[100%] text-white">
          <div className="text-center flex flex-col items-center gap-5">
            <h1 className="text-6xl">Reserve a Cabin</h1>
            <p className="text-lg max-w-[60ch]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>
            <Link to="/campground" className="px-7 py-3 rounded bg-blue-700 text-2xl">Create a Reservation</Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-900 text-white px-10">
        <section className="gap-10 flex flex-col-reverse md:grid place-items-center grid-cols-2">
          <div>
            <img src={`${process.env.PUBLIC_URL}/img/cabin.png`} alt="cabin" />
          </div>

          <div>
            <h1 className="text-3xl sm:text-5xl mb-5">Lorum ipsum dolar sit amit</h1>
            <p className="mb-5">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>

            <Link to="/campground" className="px-7 py-3 rounded bg-blue-700 text-xl sm:text-2xl">Create a Reservation</Link>

          </div>
        </section>
      </section>

    </div>


  );
}


function ProductsDisplay(props) {
  const categoryLimit = 3;
  const [categories, setCategories] = useState(null);
  const [attempt, setAttempt] = useState(false);

  useEffect(() => {
    if (!attempt) {
      getAllProducts(categoryLimit).then(cats => {
        setCategories(cats)
      });
      setAttempt(true);
    }
  }); 

  return (
    <div>
      {
        categories
        ? categories.map(cat => <CategoryDisplay category={cat} className="p-8"/>)
        : "No products in store"
      }
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <HeaderSection />
      <main>
        <ProductsDisplay/>
        <CabinSection />
      </main>
    </div>
  );
}

