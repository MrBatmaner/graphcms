import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/query";
import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  const products: Product[] = data?.products;

  console.log(products);

  return (
    <div className="max-w-5xl mx-auto">
      <Header />

      <div className="space-x-5 py-5">
        {products?.map(
          ({
            categories,
            collections,
            description,
            id,
            name,
            price,
            reviews,
            slug,
          }) => (
            <Link key={id} href={` /product/${id}`}>
              <div
                key={id}
                className="p-5 shadow-sm border-2 m-2 cursor-pointer"
              >
                <p className="text-2xl font-bold">{name}</p>
                <p>${price / 100}</p>
                <p>{description}</p>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
