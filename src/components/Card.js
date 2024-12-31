import useSWR from "swr";

import Link from "next/link";
import { useState } from "react";
import { useQueryState } from "nuqs";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const Cards = () => {
  const [search] = useQueryState("search");
  const url = `https://fakestoreapi.com/products`;
  const { data: items, isLoading } = useSWR(url, fetcher);

  if (isLoading) {
    return <p>wait</p>;
  }
  const filteredproducts = items.filter((item) => {
    if (!search) return true;
    return item.category.toLowerCase().includes(search?.toLowerCase());
  });
  return (
    <div>
      <div className="grid grid-cols-3 gap-10">
        {filteredproducts?.map((data) => {
          return (
            <Link key={data?.id} href={`card/${data?.id}`}>
              {" "}
              <div className="card bg-base-100 h-[488px] shadow-xl">
                <figure>
                  <img src={data?.image} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {data?.title}
                    <div className="badge badge-secondary">NEW</div>
                  </h2>
                  <p>{""}</p>
                  <div className="card-actions justify-end flex gap-3">
                    <div className="badge badge-outline">{data?.category}</div>
                    <div className="badge badge-outline">{data?.price}</div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
