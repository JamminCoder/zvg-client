import "../css/Home.css";
import { useEffect, useState } from "react";


function Slide({ img, header, lead, buttons, sliderNum, max }) {

  const indicators = [];
  for (let i = 1; i <= max; i++) {
    let style = {backgroundColor: "rgba(0, 0, 0, 0.5)"}
    
    if (i === sliderNum) style = {backgroundColor: "white"};


    let indicator = <span key={i} class="w-2 aspect-square bg-white inline-block mx-2 rounded-full" style={style}></span>
    indicators.push(indicator);
  }

  return (
    <section className="slide flex-grow w-[100vw] relative grid place-items-center" id={"slide-" + sliderNum}>

      <div class="w-[100vw]">
        {/* Image */}
        <img src={ img } class="h-[70vh] w-[100%] object-cover" />
      </div>

      <div class="welcome-header-section w-[100%] h-[100%] absolute grid place-items-center">
        <div class="flex flex-col items-center gap-2 max-w-[80%]">

          {/* Header and lead */}
          <h1 class="text-white text-center text-3xl md:text-7xl font-bold">{ header }</h1>
          <p class="text-center text-white text-2xl font-light max-w-[30rem]">{ lead }</p>
          
          <div class="flex justify-center gap-2 mt-2">

            {/* Buttons */}
            { buttons }
          
          </div>

          {/* Slider indicators */}
          <div class="mt-5">
           { indicators }
          </div>

        </div>
      </div>
    </section>
  );
}


function HeaderSection(props) {
  const sliderCount = 5;
  let currentSlider = 1;

  function handleSlides() {
    let touchStartX = 0;
    let touchEndX = 0;
    let scrollWidth = document.body.clientWidth;
    let slider = document.querySelector(".welcome-slider");
    const animationDelay = 4500;

    let scrollInterval = setInterval(() => {
      slider.scrollBy(scrollWidth, 0);
      
      if (currentSlider === sliderCount) {
        slider.scrollBy(-scrollWidth * sliderCount, 0);
        currentSlider = 0;
      }

      currentSlider++;

    }, animationDelay);


    function swipeScroll() {
      // Touch scroll code inspired from https://stackoverflow.com/users/3576214/damjan-pavlica
      
      if (touchStartX > touchEndX) {
        // Swiped from right to left
        slider.scrollBy(scrollWidth, 0);
        clearInterval(scrollInterval);
      }

      if (touchStartX < touchEndX) {
        // Swiped from left to right
        slider.scrollBy(-scrollWidth, 0);
        clearInterval(scrollInterval);
      }
    }

    slider.addEventListener("touchstart", e => {
      touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX
      swipeScroll();
    });

    slider.addEventListener("mousedown", e => {
      touchStartX = e.screenX;
    });

    slider.addEventListener("mouseup", e => {
      touchEndX = e.screenX;
      swipeScroll();
    });

  }

  useEffect(handleSlides);

  return (
    <div className="welcome-slider">
        <Slide 
          img={`${process.env.PUBLIC_URL}/img/zoar_valley.jpg`}
          header="Zoar Valley Gifts & More"
          lead="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi"
          buttons={[
            <a class="px-2 py-1 bg-white bg-opacity-75 rounded text-xl">Shop</a>,
            <a class="px-2 py-1 bg-white bg-opacity-75 rounded text-xl">Campgrounds</a>
          ]}

          sliderNum={1}
          max={sliderCount}
        />

        <Slide 
          img={`${process.env.PUBLIC_URL}/img/zoar_valley.jpg`}
          header="The Second Slide"
          lead="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi"
          buttons={[
            <a class="px-2 py-1 bg-white bg-opacity-75 rounded text-xl">Shop</a>,
            <a class="px-2 py-1 bg-white bg-opacity-75 rounded text-xl">Campgrounds</a>
          ]}

          sliderNum={2}
          max={sliderCount}
        />

        <Slide 
          img={`${process.env.PUBLIC_URL}/img/zoar_valley.jpg`}
          header="The Third Slide"
          lead="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi"
          buttons={[
            <a class="px-2 py-1 bg-white bg-opacity-75 rounded text-xl">Shop</a>,
            <a class="px-2 py-1 bg-white bg-opacity-75 rounded text-xl">Campgrounds</a>
          ]}

          sliderNum={3}
          max={sliderCount}
        />

        <Slide 
          img={`${process.env.PUBLIC_URL}/img/zoar_valley.jpg`}
          header="The Fourth Slide"
          lead="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi"
          buttons={[
            <a class="px-2 py-1 bg-white bg-opacity-75 rounded text-xl">Shop</a>,
            <a class="px-2 py-1 bg-white bg-opacity-75 rounded text-xl">Campgrounds</a>
          ]}

          sliderNum={4}
          max={sliderCount}
        />

        <Slide 
          img={`${process.env.PUBLIC_URL}/img/zoar_valley.jpg`}
          header="The Fifth Slide"
          lead="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi"
          buttons={[
            <a class="px-2 py-1 bg-white bg-opacity-75 rounded text-xl">Shop</a>,
            <a class="px-2 py-1 bg-white bg-opacity-75 rounded text-xl">Campgrounds</a>
          ]}

          sliderNum={5}
          max={sliderCount}
        />
    </div>
  );
}

function SectionTab(props) {
  return (
    <div 
      style={ props.style }
      className="flex flex-col items-center gap-4 p-10 bg-red-300">
      { props.children }
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <HeaderSection/>
      <main className="flex justify-center text-center">
        <SectionTab style={{ backgroundColor: "rgb(252 165 165)" }}>
          <h1 className="text-3xl">Featured Products</h1>
          <p className="text-lg">From candles and ornaments, to clothing items including T-shirts, hats, scarves, and coats, you will find wondeful gifts for you and your family!</p>
        </SectionTab>
      </main>
    </div>
  );
}

