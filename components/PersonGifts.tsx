import { Event, Person } from "@/types/types";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import Loader from "./ui/Loader";
import { generateQueries, getProducts } from "@/api";
import Products from "./Products";

type Props = {
  person: Person;
  event: Event;
};

const PersonGifts = ({ person, event }: Props) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [error, setError] = useState("");

  const handleProductSearch = async () => {
    setLoading(true);
    setProducts([]);
    setError("");
    console.log(loading);
    try {
      const text = await generateQueries(event, person);
      const items = text
        .split("\n")
        .map((item: string) => item.trim().replace(/^\d+\.\s*/, ""));
      const res1 = await getProducts(items[5]);
      const res2 = await getProducts(items[4]);
      const res3 = await getProducts(items[3]);
      const products1 = [
        [...res1?.products],
        [...res2?.products],
        [...res3?.products],
      ];
      setProducts(products1);
      console.log(products);
    } catch (error) {
      setError("Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5">
      <Button onClick={handleProductSearch}>
        Explore gifts for {person.name}
      </Button>
      <div className="p-5">
        {loading && <Loader color="#ffffff" />}
        {error && <h1 className="text-red-600">{error}</h1>}
        {products?.length > 1 && (
          <div>
            {products.map((product: any, i: number) => (
              <Products key={i} products={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonGifts;
