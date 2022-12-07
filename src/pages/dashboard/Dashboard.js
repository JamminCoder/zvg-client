import { useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { getAllProductsWithCategories } from "../../api";
import { ProductsList } from "./ProductsList";
import DashboardLayout from "./DashboardLayout"
import { Outlet } from "react-router-dom";

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

export function Dashboard(props) {
    return <>
        <h1 className="text-3xl pb-5">Products</h1>

        <div className="grid gap-24 mb-10">
            <CategoriesWithProducts/>
        </div>
    </>;
}

export default function DashboardRoot(props) {
    const [modal, setModal] = useState(null);

    return (
        <DashboardLayout>
            { modal }
            
            <DashboardSidebar setModal={ setModal } />

            <main className="p-10 w-[100%]">
                <Outlet/>
            </main>
        </DashboardLayout>
    );
}