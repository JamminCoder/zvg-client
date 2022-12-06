import "../css/Home.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { getSlides } from "../api";
import ButtonMap from "../components/ButtonMap";
import { serverURL } from "../lib/utils";

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

function ProductShowcaseSection() {
  function ProductImage({ src, alt }) {
    return (
      <div className="relative w-[100%] max-w-[30rem]">
        <img src={src} alt={alt} className="w-[100%] rounded-md bg-[rgba(0,0,0,0.1)]" />
        <div className="absolute text-white bottom-0 left-0  w-[100%] h-[100%]" style={{
          background: "linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1))"
        }}>
          <div className="absolute bottom-0 p-10">
            <h3><Link className="text-xl underline" to="shop/jewelry"> &gt; Explore these items</Link></h3>
            <p className="font-light">
              Lorum ipsum dolar sit amit sit dolar ipsum...
            </p>
          </div>


        </div>
      </div>
    );
  }

  function ShowcaseColumn({ header, paragraph, imgSrc, reverse = false }) {
    const reverseCol = reverse ? " lg:flex-col-reverse" : "";

    return (
      <div className="w-[100%] max-w-[30rem]">
        <article className={"flex gap-16 flex-col items-center" + reverseCol}>
          <div>
            <h1 className="text-4xl mb-4">{header}</h1>
            <p>{paragraph}</p>
          </div>
          <ProductImage src={imgSrc} />
        </article>
      </div>
    );
  }

  return (
    <div className="flex items-center flex-col">
      <section className="grid gap-14 place-items-center grid-cols-1 lg:grid-cols-2 py-24 mx-10 lg:w-[80%] max-w-[80rem]">
        <ShowcaseColumn
          header="Candles, ornaments, jewelry, and more."
          paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, aspernatur saepe deleniti quidem est ipsum cupiditate accusamus corporis ipsa amet quas quaerat non nihil dolore voluptatum, dolor sed facere qui."
          imgSrc={`${process.env.PUBLIC_URL}/img/placeholder-square-1024.png`}
        />

        <ShowcaseColumn
          header="Epic Awesome Stuff"
          paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, aspernatur saepe deleniti quidem est ipsum cupiditate accusamus corporis ipsa amet quas quaerat non nihil dolore voluptatum, dolor sed facere qui."
          imgSrc={`${process.env.PUBLIC_URL}/img/placeholder-square-1024.png`}
          reverse={true}
        />
      </section>


      <section className="grid gap-14 place-items-center grid-cols-1 lg:grid-cols-2 py-24 mx-10 lg:w-[80%] max-w-[80rem]">
        <ShowcaseColumn
          header="Lorem ipsum dolar sit amet."
          paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, aspernatur saepe deleniti quidem est ipsum cupiditate accusamus corporis ipsa amet quas quaerat non nihil dolore voluptatum, dolor sed facere qui."
          imgSrc={`${process.env.PUBLIC_URL}/img/placeholder-square-1024.png`}
        />

        <ShowcaseColumn
          header="Lorem ipsum dolor sit amet"
          paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, aspernatur saepe deleniti quidem est ipsum cupiditate accusamus corporis ipsa amet quas quaerat non nihil dolore voluptatum, dolor sed facere qui."
          imgSrc={`${process.env.PUBLIC_URL}/img/placeholder-square-1024.png`}
          reverse={true}
        />
      </section>
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

export default function Home() {
  return (
    <div>
      <HeaderSection />
      <main>
        <ProductShowcaseSection />
        <CabinSection />
      </main>
    </div>
  );
}

