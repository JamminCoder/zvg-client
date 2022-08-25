import "../css/Home.css";


export function Slide({ img, header, lead, buttons, sliderNum, max }) {

  const indicators = [];
  for (let i = 1; i <= max; i++) {
    let style = {backgroundColor: "grey"}
    
    if (i === sliderNum) style = {backgroundColor: "white"};


    let indicator = <span key={i} class="w-2 aspect-square bg-white inline-block mx-2 rounded-full" style={style}></span>
    indicators.push(indicator);
  }

  return (
    <section className="slide flex-grow w-[100vw] relative grid place-items-center" id={"slide-" + sliderNum}>

      <div class="w-[100vw]">
        {/* Image */}
        <img src={ img } class="h-[50vh] md:h-[70vh] w-[100%] object-cover" />
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


export function HeaderSection(props) {
  const sliderCount = 5;
  let currentSlider = 1;

  function handleSlides() {
    let scrollWidth = document.body.clientWidth;
    let slider = document.querySelector(".welcome-slider");
    if (currentSlider === sliderCount) {
      scrollWidth = -100000;
      slider.scrollBy(scrollWidth, 0);
      currentSlider = 1;
      return;
    }

    slider.scrollBy(scrollWidth, 0);
    
    currentSlider++;
  }

  return (
    <div className="welcome-slider" 
      onClick={ handleSlides }>
        <Slide 
          img='/img/zoar_valley.jpg'
          header="Zoar Valley Gifts & More"
          lead="lorem ipsum something awesome, I wish I could come up with cool things to say"
          buttons={[
            <a class="px-2 py-1 bg-white bg-opacity-75 rounded text-xl">Shop</a>,
            <a class="px-2 py-1 bg-white bg-opacity-75 rounded text-xl">Campgrounds</a>
          ]}

          sliderNum={1}
          max={sliderCount}
        />

        <Slide 
          img='/img/zoar_valley.jpg'
          header="The Second Slide"
          lead="Backend development is better"
          buttons={[
            <a class="px-2 py-1 bg-white bg-opacity-75 rounded text-xl">Shop</a>,
            <a class="px-2 py-1 bg-white bg-opacity-75 rounded text-xl">Campgrounds</a>
          ]}

          sliderNum={2}
          max={sliderCount}
        />

        <Slide 
          img='/img/zoar_valley.jpg'
          header="The Third Slide"
          lead="Backend development is better"
          buttons={[
            <a class="px-2 py-1 bg-white bg-opacity-75 rounded text-xl">Shop</a>,
            <a class="px-2 py-1 bg-white bg-opacity-75 rounded text-xl">Campgrounds</a>
          ]}

          sliderNum={3}
          max={sliderCount}
        />

        <Slide 
          img='/img/zoar_valley.jpg'
          header="The Fourth Slide"
          lead="Backend development is better"
          buttons={[
            <a class="px-2 py-1 bg-white bg-opacity-75 rounded text-xl">Shop</a>,
            <a class="px-2 py-1 bg-white bg-opacity-75 rounded text-xl">Campgrounds</a>
          ]}

          sliderNum={4}
          max={sliderCount}
        />

        <Slide 
          img='/img/zoar_valley.jpg'
          header="The Fifth Slide"
          lead="Backend development is better"
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


export default function Home() {
  return (
    <div>
      <HeaderSection/>
      
    </div>
  );
}

