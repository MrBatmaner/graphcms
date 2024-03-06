import { basketState } from "@/atoms/basketAtom";
import Link from "next/link";
import React from "react";
import { useRecoilState } from "recoil";

function Header() {
  const [basket, setBasket] = useRecoilState(basketState);

  return (
    <div className="flex items-center justify-between mb-10">
      <Link href="/">
        <h1 className="text-3xl font-extrabold cursor-pointer">
          Ecommerce Store
        </h1>
      </Link>

      <Link href="/basket">
        <button>View Basket ({basket.length})</button>
      </Link>
    </div>
  );
}

export default Header;
