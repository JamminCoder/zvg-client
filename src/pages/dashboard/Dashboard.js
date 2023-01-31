import { useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { ProductsList } from "./ProductsList";
import { Outlet } from "react-router-dom";
import { Navigate, Link } from "react-router-dom";
import { isLoggedIn } from "../../lib/auth";
import { isVerified } from "../../endpoints/auth";
import { getCategories } from "../../endpoints/categories";
import Account from "./Account";

export function CategoriesWithProducts(props) {
    const [categories, setCategories] = useState([]);
    const [attempt, setAttempt] = useState(false);

    useEffect(() => {
        if (attempt) return;
        if (!categories.length) {
            getCategories()
            .then(cats => setCategories(cats));
        }

        setAttempt(true);
    });

    return categories.map(
        category => <ProductsList key={ category.name } category={ category } />
    );
}

export function DashboardProducts(props) {
    return (
    <div>
        <h1 className="text-3xl pb-5">Categories and Products</h1>
        <Link className="shadow my-8 bg-blue-500 text-white btn block w-fit" to="/dashboard/new-category">New Category</Link>
        <div className="grid gap-24 mb-10">    
            <CategoriesWithProducts/>
        </div>
    </div>
    );
}


export function DashboardHome(props) {
    return (
    <div className="grid gap-8">
       <h1 className="text-4xl font-medium mb-8">Dashboard</h1>
       <Account/>
       <DashboardProducts/>
    </div>
    );
}

export function DashboardLayout(props) {
    const [verified, setVerified] = useState("FILLER VALUE");
    const [attempt, setAttempt] = useState(false);
    
    useEffect(() => {
        if (attempt) return;
        isVerified().then(result => {
            setVerified(result);
        })

        setAttempt(true);
    });

    if (!isLoggedIn() || !verified) return <Navigate to="/login"/>;

    return (
        <div className={ `relative flex bg-slate-50 ${ props.className }` }>
            <DashboardSidebar/>
            <main className="p-10 w-[100%]">
                {/* Render routes within the dashboard */}
                <Outlet/>
            </main>
        </div>
    );

}