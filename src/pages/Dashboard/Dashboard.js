import { useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { getAllProductsWithCatagories } from "../../api";
import { ProductsList } from "../../layouts/ProductsList";
import ModalHandler from "../../modals/handleModal";
import DashboardLayout from "../../layouts/DashboardLayout"

export function CatagoriesWithProducts(props) {
    const [catagories, setCatagories] = useState([]);
    const [attempt, setAttempt] = useState(false);

    useEffect(() => {
        if (attempt) return;
        if (!catagories.length) {
            getAllProductsWithCatagories()
            .then(cats => setCatagories(cats));
        }

        setAttempt(true);
    });

    return catagories.map(
        catagory => <ProductsList key={ catagory.name } catagory={ catagory } />
    );
}

export default function Dashboard(props) {
    const [modal, setModal] = useState(null);
    const modalHandler = new ModalHandler(modal, setModal);

    return (
        <DashboardLayout onClick={ () => modalHandler.closeIfExists(modal) }>
            { modal }

            <DashboardSidebar modalHandler={ modalHandler } />
            <main className="p-10 w-[100%]">
                <h1 className="text-3xl pb-5">Products</h1>

                <div className="grid gap-24 mb-10">
                    <CatagoriesWithProducts/>
                </div>
            </main>
        </DashboardLayout>
    );
}