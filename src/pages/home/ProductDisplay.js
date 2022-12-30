import { useState, useEffect } from "react";

import { getCategories } from "../../api";
import CategoryDisplay from "../../components/CategoryDisplay"

export default function ProductsDisplay(props) {
    const categoryLimit = 3;
    const [categories, setCategories] = useState(null);
    const [attempt, setAttempt] = useState(false);
  
    useEffect(() => {
      if (!attempt) {
        getCategories(categoryLimit).then(cats => {
          setCategories(cats)
        });
        setAttempt(true);
      }
    }); 
  
    return (
      <div>
        {
          categories
          ? categories.map(cat => <CategoryDisplay category={cat} className="p-8"/>)
          : <h2 className="text-4xl font-medium py-16 text-center">There are currently no products in stock.</h2>
        }
      </div>
    );
  }