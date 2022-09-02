import "../css/Home.css";
import { useEffect } from "react";


function Slide({ img, header, lead, buttons, sliderNum, max }) {

  const indicators = [];
  for (let i = 1; i <= max; i++) {
    let style = {backgroundColor: "rgba(0, 0, 0, 0.6)"}
    
    if (i === sliderNum) style = {backgroundColor: "white"};


    let indicator = <span key={i} class="w-2 aspect-square bg-white inline-block mx-2 rounded-full" style={style}></span>
    indicators.push(indicator);
  }

  return (
    <section className="slide flex-grow w-[100vw] relative grid place-items-center" id={"slide-" + sliderNum}>

      <div class="w-[100vw]">
        {/* Image */}
        <img src={ img } alt="description here" class="h-[50vh] lg:h-[65vh] w-[100%] object-cover" />
      </div>

      <div class="welcome-header-section w-[100%] h-[100%] absolute grid place-items-center">
        <div class="flex flex-col items-center gap-2 max-w-[80%]">

          {/* Header and lead */}
          <h1 class="text-white text-center text-3xl md:text-7xl font-bold">{ header }</h1>
          <p class="text-center text-white text-2xl font-light">{ lead }</p>
          
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
    const animationDelay = 5000;

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
  const testSlides = [];
  for (let i = 1; i <= sliderCount; i++) {
    const testSlide = <Slide 
      img={`${process.env.PUBLIC_URL}/img/zoar_valley.jpg`}
      header="Zoar Valley Gifts & More"
      lead="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
      buttons={[
        <a href="/" class="px-2 py-1 bg-white bg-opacity-75 rounded text-xl">Shop</a>,
        <a href="/" class="px-2 py-1 bg-white bg-opacity-75 rounded text-xl">Campgrounds</a>
      ]}

      sliderNum={ i }
      key={ i }
      max={sliderCount}
    />

    testSlides.push(testSlide)
  }

  return (
    <div className="welcome-slider">
      { testSlides }
    </div>
  );
}

function ProductShowcaseSection() {
  function ProductImage({ src, alt }) {
    return (
      <div className="relative w-[100%] max-w-[30rem]">
        <img src={ src } alt={ alt } className="w-[100%] rounded-md bg-[rgba(0,0,0,0.1)]"/>
        <div className="absolute text-white bottom-0 left-0  w-[100%] h-[100%]" style={{
          background: "linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1))"
        }}>
          <div className="absolute bottom-0 p-10">
            <h3><a className="text-xl underline" href="/products"> &gt; Explore these items</a></h3>
            <p className="font-light">
              Lorum ipsum dolar sit amit sit dolar ipsum...
            </p>
          </div>
          

        </div>
      </div>
    );
  }

  function ShowcaseColumn({ header, paragraph, imgSrc, reverse=false }) {
    const reverseCol = reverse ? " lg:flex-col-reverse": "";

    return (
      <div className="w-[100%] max-w-[30rem]">
        <div className="lg:flex-col-reverse"></div>
        <article className={ "flex gap-16 flex-col items-center" + reverseCol }>
          <div>
            <h1 className="text-4xl mb-4">{ header }</h1>
            <p>{ paragraph }</p>
          </div>
          <ProductImage src={ imgSrc }/>
        </article>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <section className="grid gap-20 place-items-center grid-cols-1 lg:grid-cols-2 py-24 mx-10 lg:w-[80%] max-w-[80rem]">
        <ShowcaseColumn
          header="Candles, ornaments, jewelry, and more."
          paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, aspernatur saepe deleniti quidem est ipsum cupiditate accusamus corporis ipsa amet quas quaerat non nihil dolore voluptatum, dolor sed facere qui."
          imgSrc={ `${process.env.PUBLIC_URL}/img/placeholder-square-1024.png` }
        />

        <ShowcaseColumn
          header="Epic Awesome Stuff"
          paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, aspernatur saepe deleniti quidem est ipsum cupiditate accusamus corporis ipsa amet quas quaerat non nihil dolore voluptatum, dolor sed facere qui."
          imgSrc={ `${process.env.PUBLIC_URL}/img/placeholder-square-1024.png` }
          reverse={ true }
        />
      </section>
    </div>
  );
}

function CabinSection() {
  return (
    <div>
      <section className="relative h-[70vh] overflow-hidden">
        <img src={ `${ process.env.PUBLIC_URL }/img/cabin.png` } alt="description here" class="h-[70vh] w-[100%] object-cover absolute top-0" />
        
        <div className="absolute top-0 grid place-items-center w-[100%] h-[100%] text-white">
            <div className="text-center flex flex-col items-center gap-5">
              <h1 className="text-6xl">Reserve a Cabin</h1>
              <p className="text-lg max-w-[60ch]">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </p>
              <a href="/" className="px-7 py-3 rounded bg-blue-700 text-2xl">Explore options</a>
            </div>
        </div>
      </section>

      <section className="py-24 bg-gray-900 text-white px-10">
        <section className="gap-10 flex flex-col-reverse md:grid place-items-center grid-cols-2 mb-24">
            <div>
              <img src={ `${ process.env.PUBLIC_URL }/img/cabin.png` } alt="cabin"/>
            </div>
            
            <div>
              <h1 className="text-5xl mb-5">Lorum ipsum dolar sit amit</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </p>
            </div>
        </section>

        <section className="gap-10 grid place-items-center md:grid-cols-2 mb-24">
          <div>
            <h1 className="text-5xl mb-5">Lorum ipsum dolar sit amit</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>
          </div>

          <div>
            <img src={ `${ process.env.PUBLIC_URL }/img/cabin.png` } alt="cabin"/>
          </div>
        </section>
      </section>
      
    </div>
    
    
  );
}

export default function Home() {
  return (
    <div>
      <HeaderSection/>
      <main>
          <ProductShowcaseSection/>
          <CabinSection/>
      </main>
    </div>
  );
}

