import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const { category} = router.query;
  const url=`https://fakestoreapi.com/products/category/${category}`

  return <div>{category}</div>;
};
export default Page;
