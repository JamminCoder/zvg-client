import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCabinSection } from "../../endpoints/content";
import { serverURL } from "../../lib/utils";

export default function CabinSection() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [sectionData, setSectionData] = useState(null);

    useEffect(() => {
        if (!isLoaded && !sectionData) {
            getCabinSection()
            .then(data => {
                setSectionData(data);
                setIsLoaded(true);
            }).catch(err => {
                setIsLoaded(true);
                console.error(err);
            });
        }
    });
    
    if (!sectionData) return;
    if (!sectionData && isLoaded) return "Failed to get cabin section";

    return (
        <div>
        <section className="py-24 bg-gray-900 text-white px-10">
            <section className="gap-10 flex flex-col-reverse md:grid place-items-center grid-cols-2">
            <div>
                <img src={ serverURL( sectionData.image_path ) } alt="cabin" />
            </div>

            <div>
                <h1 className="text-3xl sm:text-5xl mb-5">{ sectionData.header }</h1>
                <p className="mb-5">{ sectionData.lead }</p>

                <a href={ sectionData.href } className="px-7 py-3 rounded bg-blue-700 text-xl sm:text-2xl">{ sectionData.link_text }</a>

            </div>
            </section>
        </section>

        </div>
    );
}