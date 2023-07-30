import { ProductType } from "@/types/types";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { Heart, HeartIcon, HeartOffIcon } from "lucide-react";
import { createProduct, deleteProduct } from "@/api";
import { useAuth } from "@/context/AuthContext";

type Props = {
  product: ProductType;
};

const Product = ({ product }: Props) => {
  const [loading, setLoading] = useState(false);
  const [isProductAdded, setIsProductAdded] = useState(
    product._id?.length ? true : false
  );
  const [productId, setProductId] = useState(product._id ? product._id : null);
  const { user } = useAuth();

  const handleProductAdd = async () => {
    setLoading(true);
    if (user) {
      try {
        const response = await createProduct({
          ...product,
          user: user._id,
        });
        setIsProductAdded(true);
        setProductId(response._id);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleProductDelete = async () => {
    setLoading(true);
    if (productId) {
      await deleteProduct(productId).then((res) => {
        setIsProductAdded(false);
        setProductId(null);
      });
    }
    setLoading(false);
  };

  return (
    <div className="relative max-w-[200px] min-w-[200px] pt-5 p-2 rounded-md m-4 bg-gradient-to-b from-[#875fb6] to-transparent flex flex-col items-center">
      <button
        onClick={isProductAdded ? handleProductDelete : handleProductAdd}
        className="absolute top-0 right-0"
      >
        {isProductAdded ? <Heart /> : <HeartOffIcon />}
      </button>
      <Link href={product.url} target="_blank">
        <h1 className="hover:underline text-gray-200">{product.name}</h1>
      </Link>
      <Image
        src={product.image.url}
        alt={product.image.description}
        width={200}
        height={200}
        className="w-full"
      />
      <h2 className="text-gray-100">
        {product.price.priceSymbol} {product.price.currentPrice}
      </h2>
    </div>
  );
};

export default Product;
