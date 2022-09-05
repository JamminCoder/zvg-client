import { useParams } from "react-router-dom";

export default function ProductDetails(props) {
    const productName = useParams().productName;
    return (
        <div className="flex justify-center">
            <main className="grid place-content-center md:grid-cols-2 max-w-[100rem] flex-grow">
                <div className="p-10 w-[100%] max-w-[30rem] place-self-center">
                    <img className="w-[100%]" src={`${process.env.PUBLIC_URL}/img/placeholder-square-1024.png`} />
                </div>
                <div className="p-10">
                    <h1 className="text-4xl">{ productName }</h1>
                    <p>Product description</p>
                </div>
            </main>
        </div>
    );
}