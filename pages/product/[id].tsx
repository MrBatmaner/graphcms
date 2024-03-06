import client from "@/apollo-client";
import { basketState } from "@/atoms/basketAtom";
import Header from "@/components/Header";
import { GET_PRODUCT } from "@/graphql/query";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";

interface ProductProps {
  product: Product;
}

function Product({ product }: ProductProps) {
  const [basket, setBasket] = useRecoilState(basketState);

  //const { query } = useRouter();
  return (
    <div className="p-10 max-w-5xl mx-auto">
      <Header />

      <p className="text-xl font-bold">{product.name}</p>
      <p>${product.price / 100}</p>

      {product.images.map((image) => (
        // eslint-disable-next-line react/jsx-key
        <div className="relative h-32 w-32">
          <Image src={image.url} layout="fill" alt="" />
        </div>
      ))}

      <div className="py-5">
        <h1 className="text-xl font-bold">Reviews</h1>
        <hr />
        {product.reviews.map((review) => (
          <div key={review.id}>
            <p>{review.headline}</p>
          </div>
        ))}
      </div>

      <button onClick={() => setBasket([...basket, product])}>
        Add to Basket
      </button>
    </div>
  );
}

export default Product;

// server side rendering
export const getServerSideProps: GetServerSideProps<ProductProps> = async (
  context
) => {
  const { id } = context.query;

  const results = await client.query({
    query: GET_PRODUCT,
    variables: {
      id,
    },
  });

  if (!results.data.product) {
    return {
      notFound: true,
    };
  }

  const product: Product = results.data.product;

  console.log(results.data);

  return {
    props: {
      product,
    },
  };
};
