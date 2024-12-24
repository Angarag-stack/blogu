import useSWR from "swr";
import Link from "next/link";
import { useQueryState } from "nuqs";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const Header = (props) => {
  const [search, setSearch] = useQueryState("search");
  const url = `https://fakestoreapi.com/products/categories`;

  const { data: categories, isLoading } = useSWR(url, fetcher);
  const { buys } = props;
  if (isLoading) {
    return <p>wait</p>;
  }
  const Gitsearch = (event) => setSearch(event.target.value);
  return (
    <div className="flex justify-around items-center gap-7 mb-10">
      <div className="flex gap-5">
        <Link href={`./`}>
          <p className="text-xl font-semibold">Store</p>
        </Link>
        {categories?.map((category) => {
          return (
            <Link key={category?.id} className="text-lg" href={`/${category}`}>
              {category}
            </Link>
          );
        })}
      </div>
      <div className="flex gap-2">
        <div className="">
          <label className="input input-bordered flex items-center gap-2">
            <input
              onChange={Gitsearch}
              value={search}
              type="text"
              className="grow"
              placeholder="Search"
            />
            <svg
              onClick={""}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <button className="btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          {buys}
        </button>
      </div>
    </div>
  );
};
