import { useState, useEffect } from "react";

import * as categoryEndpoints from "../../endpoints/categories";
import CategoryDisplay from "../../components/CategoryDisplay"

export default function ProductsDisplay(props) {
    const categoryLimit = 3;
    const [categories, setCategories] = useState(null);
    const [attempt, setAttempt] = useState(false);
  
    useEffect(() => {
      if (!attempt) {
        categoryEndpoints.getCategories(categoryLimit).then(cats => {
          setCategories(cats)
        });
        setAttempt(true);
      }
    }); 
    
    if (!categories) {
      return <h2 className="text-4xl font-medium py-16 text-center">There are currently no products in stock. (no categories) </h2>
    }

    if (!categories[0].products.length) {
      return <h2 className="text-4xl font-medium py-16 text-center">There are currently no products in stock.</h2>
    }

    return (
      <div>
        { categories.map(cat => <CategoryDisplay category={cat} className="p-8"/>) }
      </div>
    );
  }