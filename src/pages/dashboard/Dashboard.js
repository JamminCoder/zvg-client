import { useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { getAllProductsWithCategories } from "../../api";
import { ProductsList } from "./ProductsList";
import ModalHandler from "./modals/handleModal";
import DashboardLayout from "../../layouts/DashboardLayout"

export function CategoriesWithProducts(props) {
    const [categories, setCategories] = useState([]);
    const [attempt, setAttempt] = useState(false);

    useEffect(() => {
        if (attempt) return;
        if (!categories.length) {
            getAllProductsWithCategories()
            .then(cats => setCategories(cats));
        }

        setAttempt(true);
    });

    return categories.map(
        category => <ProductsList key={ category.name } category={ category } />
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
                    <CategoriesWithProducts/>
                </div>
            </main>
        </DashboardLayout>
    );
}