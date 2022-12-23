import { useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { getAllProductsWithCategories } from "../../api";
import { ProductsList } from "./ProductsList";
import { Outlet } from "react-router-dom";
import NewCategoryModal from "./modals/NewCategoryModal";
import Button from "../../components/Button";
import { Navigate, Link } from "react-router-dom";
import { isVerified, isLoggedIn } from "../../lib/auth";

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

export function DashboardProducts(props) {
    const [modal, setModal] = useState(null);

    return <>
        { modal }
        <h1 className="text-3xl pb-5">Products</h1>
        <Button className="shadow my-8 bg-blue-500 text-white" onClick={ () => setModal(<NewCategoryModal close={() => setModal(null)}/>) }>New Category</Button>
        <div className="grid gap-24 mb-10">    
            <CategoriesWithProducts/>
        </div>
    </>;
}


export function DashboardHome(props) {
    return (<>
       <h1 className="text-4xl font-medium mb-8">Dashboard</h1>
       <p className="text-xl mb-2">Quick Links</p>

        <div className="grid gap-2 w-fit">
            <Link className="link list-item list-inside w-fit" to="products">Products</Link>
            <Link className="link list-item list-inside w-fit" to="slides">Slides</Link>
        </div>
        
    </>);
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
                <Outlet/>
            </main>
        </div>
    );

}