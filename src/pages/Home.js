import "../css/Home.css";


export function HeaderSection(props) {
  return (
    <div>
      <section class="relative grid place-items-center">
        <div class="w-[100%]">
          <img src='/img/zoar_valley.jpg' class="h-[50vh] md:h-[70vh] w-[100%] object-cover" />
        </div>
        
        <div class="welcome-header-section w-[100%] h-[100%] absolute grid place-items-center">
          <div class="flex flex-col items-center gap-2">

            <h1 class="text-white text-center text-3xl md:text-7xl font-bold ">Zoar Valley Gifts & More</h1>
            <p class="text-center text-white text-2xl font-light max-w-[30rem]">lorem ipsum something awesome, I wish I could come up with cool things to say</p>
            
            <div class="flex justify-center gap-2 mt-2">
              <a class="px-2 py-1 bg-white bg-opacity-75 rounded text-xl">Shop</a>
              <a class="px-2 py-1 bg-white bg-opacity-75 rounded text-xl">Campgrounds</a>
            </div>

          </div>
        </div>
      </section>

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

