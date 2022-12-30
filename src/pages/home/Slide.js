import ButtonMap from "../../components/ButtonMap";
import { serverURL } from "../../lib/utils";
import Button from "../../components/Button";

export default function Slide({ parent, img, header, lead, buttons, sliderNum, max }) {
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