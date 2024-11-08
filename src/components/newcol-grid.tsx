import { client } from "@/sanity/lib/client";
import {
  ACCESSORIES_PAGE_PRODS,
  APPAEREL_PAGE_PRODS,
  mainPageProds,
  MEN_PAGE_PRODS,
  WOMEN_PAGE_PRODS,
} from "@/sanity/query";
import Image from "next/image";
import Link from "next/link";

import React from "react";

export default async function NewColGrid({
  variant = "mainPage",
}: {
  variant?: string;
}) {
  let products = [];
  if (variant === "mainPage")
    products = await client.fetch(mainPageProds, {
      useCdn: true,
    });
  if (variant === "apparelPage")
    products = await client.fetch(APPAEREL_PAGE_PRODS, {
      useCdn: true,
    });
  if (variant === "accessoriesPage") {
    products = await client.fetch(ACCESSORIES_PAGE_PRODS, {
      useCdn: true,
    });
  }
  if (variant === "menPage") products = await client.fetch(MEN_PAGE_PRODS);
  if (variant === "womenPage") products = await client.fetch(WOMEN_PAGE_PRODS);

  return (
    <section className="grid max-sm:grid-cols-2 sm:grid-cols-2 custom-md:grid-cols-3 xl:grid-cols-4   gap-y-10 lg:gap-y-[100px] mt-6 place-items-center custom-xsm:px-[10%] sm:px-[5%] xl:px-0   text-[12px] lg:text-[16px] mb-[200px] ">
      {products.map((prod) => (
        <div
          key={prod.title}
          className="hover:scale-105 transition duration-300"
        >
          <Link href={`/product/${prod.slug}`}>
            <Image
              src={prod.images.asset.url}
              width={255}
              height={337}
              alt="prod img"
              className=" w-[150px] h-[150px] sm:w-[255px] sm:h-[300px] object-cover"
            ></Image>
            <div>
              <div className="flex justify-between">
                <p className=" max-w-[100px] md:max-w-[200px] truncate ">
                  {prod.title}
                </p>
                <p>${prod.price}</p>
              </div>
              <div className="flex justify-between mt-1">
                <p>{prod.sex}</p>
                <button className="bg-accent w-[60px] h-[25px]   ">BUY</button>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </section>
  );
}
