import * as contentEndpoints from "../../endpoints/content"
import { useState, useEffect } from "react";
import Slide from "./Slide";

export default function HeaderSection(props) {
    const [slider, setSlider] = useState(document.querySelector(".welcome-slider"));
    const [slides, setSlides] = useState(null);

    useEffect(() => {
        if (!slider) setSlider(document.querySelector(".welcome-slider"));
        if (!slides && slider) {
            contentEndpoints.getSlides()
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
  