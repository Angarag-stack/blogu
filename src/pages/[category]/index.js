
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Page = () => {
  const router = useRouter();
  const { category } = router.query;
  console.log(router.query);
  

  const {
    data: products,
    error,
    isLoading,
  } = useSWR(`https://fakestoreapi.com/products/category/${category}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return (
      <div className="container grid min-h-screen grid-cols-3 gap-4 mx-auto mt-20">
        loading
      </div>
    );

  return (
    <div className="grid grid-cols-3 gap-10 w-[1280px] m-auto">
      {products.map((product) => (
        <Link key={product.id}href={`card/${product.id}`}>
          {" "}
          <div  className="card bg-base-100 w-96 h-[488px]  shadow-xl">
            <figure>
              <img src={product.image} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {product.title}
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <p>{""}</p>
              <div className="card-actions justify-end flex gap-3">
                <div className="badge badge-outline">{product.category}</div>
                <div className="badge badge-outline">{product.price}</div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default Page;
