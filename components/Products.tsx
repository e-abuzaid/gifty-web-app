import React from "react";
import Product from "./Product";
import { ProductType } from "@/types/types";

type Props = {
  products: ProductType[];
};

const Products = ({ products }: Props) => {
  return (
    <div className="flex flex-nowrap w-full overflow-x-scroll scrollbar-hide">
      {products.map((product: ProductType) => (
        <Product key={product.name} product={product} />
      ))}
    </div>
  );
};

export default Products;
