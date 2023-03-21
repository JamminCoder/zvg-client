import * as contentEndpoints from "../../endpoints/content"
import { useState, useEffect } from "react";
import Slide from "./Slide";
import HeroSection from '../../layouts/HeroSection';

export default function HeaderSection(props) {
    const [slider, setSlider] = useState(document.querySelector(".welcome-slider"));
    const [slides, setSlides] = useState();
    const [attempt, setAttempt] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (attempt) return;

        if (!slider) setSlider(document.querySelector(".welcome-slider"));

        if (!slides) {
            contentEndpoints.getSlides()
            .then(slidesData => {
                const slidesArray = [];
                console.log("HERE");
                console.log(slidesData);

                let i = 1;
                slidesData.forEach(slideData => {
                    console.log(slideData)
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

                    console.log(slideData);
                    
                    i++;
                });

                setSlides(slidesArray);
                setIsLoaded(true);
            });

            setAttempt(true);
        }

    });

    if (!isLoaded) {
        return (
            <HeroSection>
                Gift Shop
            </HeroSection>
        );
    }

    return (
        <div className="welcome-slider relative">
            { slides }
        </div>
    );
}
  