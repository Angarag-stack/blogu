import { useRouter } from "next/router"
import { useState } from "react"

const { default: useSWR } = require("swr")


const fetcher = (...args) => fetch(...args).then((res) => res.json())
const Detailcard=()=>{
    const router=useRouter()
    const query=router.query.cardId
    const url=`https://fakestoreapi.com/products/${query}`
    const {data, isLoading}=useSWR(url, fetcher)
  const [buys, setBuys]=useState(0)
    console.log(data)
const buyProducts=()=>{
  setBuys((prev)=>prev+1)
}
    if (isLoading) return <p>wait</p>
    return (
   <div className="card lg:card-side bg-base-100 shadow-xl w-[1280px] m-auto grid grid-cols-2 rounded-xl">
    <figure className=" ">
      <img className="w-[300px] py-[40px] mx-[200px] h-[400px] "
        src={data.image}
        alt="Album" />
    </figure>
    <div className="card-body bg-gray-100">
      <h2 className="card-title">{data.title}</h2>
      <p>{data.description}</p>
      <div className="card-actions justify-end">
        <p>{data.price}</p>
        <p>{buys}</p>
        <button onClick={buyProducts}  className="btn btn-primary">Add cards</button>
      </div>
    </div>
  </div>
       )
}
export default Detailcard

