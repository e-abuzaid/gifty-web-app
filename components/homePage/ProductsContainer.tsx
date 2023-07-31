import { fetchProducts } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { ProductType } from "@/types/types";
import React, { useEffect, useState } from "react";
import Product from "../Product";
import Products from "../Products";

type Props = {};

const ProductsContainer = (props: Props) => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (user) {
      const getProducts = async () => {
        const result = await fetchProducts(user._id);
        setProducts(result);
      };
      getProducts();
    }
  }, []);
  return (
    <div className="p-4">
      <h1 className="md:text-5xl text-3xl font-bold text-white">
        Your Saved Products
      </h1>
      {products.length ? (
        <Products products={products} />
      ) : (
        <h1 className="text-gray-500 md:text-lg m-2 font-semibold">
          You don't have any saved products
        </h1>
      )}
    </div>
  );
};

export default ProductsContainer;
