import React, { useEffect, useState } from "react";
import ShoppingCart from "./ShoppingCart";
import { TbTruckDelivery } from "react-icons/tb";
import { LuBadgePercent } from "react-icons/lu";
import CheckoutSidebar from "./sidebar/CheckoutSidebar";
import GetOrders from "./makeOrders/GetOrders";
import { useFirebase } from "../../firebase/FirebaseContext";
import toast, { Toaster } from "react-hot-toast";
const CartPage = ({ setNav, setFoot }) => {
  const [loading, setLoading] = useState(false);
  const [isCheckoutShow, setISCheckoutShow] = useState(false);
  const [allImages,setAllImages] = useState([])
  const [carts, setCarts] = useState(() => {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  });
  const { addToCart,lengthOfCart } = useFirebase();
  const calculateSubTotal = (price) => {
    let sum = 0;
    if (carts.length > 0) {
      sum = carts.reduce((acc, curr) => {
        return acc + curr?.OPrice * curr?.qty;
      }, 0);
    }
    return sum;
  };

  const calculateOriginalPrice = (price) => {
    let sum = 0;
    if (carts.length > 0) {
      sum = carts.reduce((acc, curr) => {
        return acc + curr.price;
      }, 0);
    }
    console.log(sum);
    return sum;
  };
  useEffect(()=>{
    setCarts(() => {
      const data = localStorage.getItem("cart");
      return data ? JSON.parse(data) : [];
    })
  },[lengthOfCart])
  useEffect(() => {
    setFoot(true);
    setNav(true);
    calculateSubTotal();
  });

useEffect(()=>{
  if(carts){
    const images = carts.map((item)=>{return {thumbnail:item.thumbnail,price:item.price}})
    console.log(images);
    setAllImages(images)
    
  }
},[carts])
  if (loading) {
    return (
      <>
        <div className="w-full h-full flex flex-col sm:flex-row">
          <div className="p-5 sm:p-14 w-full sm:w-[70%]">
            <div className="w-32 h-5 my-10 bg-slate-200 animate-pulse rounded-lg"></div>
            <div className="sm:h-36 w-full flex">
              <div className="w-[20%] h-20 sm:h-full  bg-slate-200 animate-pulse"></div>
              <div className="h-full w-[80%] ">
                <div className="upper w-full flex px-3 justify-between items-start flex-col sm:flex-row h-[80%] ">
                  <div className="left w-full sm:w-[80%] flex flex-col items-start pl-1">
                    <h2 className="text-sm h-5 w-48 bg-slate-200 animate-pulse rounded-lg"></h2>
                    <h3 className="text-sm h-5 w-56 bg-slate-200 animate-pulse rounded-lg my-3"></h3>
                    <div className="flex justify-start gap-1 items-center mt-2 h-5 w-40 bg-slate-200 animate-pulse rounded-lg"></div>
                  </div>
                  <div className="right w-full flex flex-row justify-start items-center gap-3 sm:gap-2 sm:flex-col sm:w-[20%]">
                    <h1 className="font-semibold text-sm sm:text-xl my-2 sm:my-0 h-5 w-20 bg-slate-200 animate-pulse rounded-lg"></h1>
                    <h3 className="inilne-block text-sm sm:text-md font-semibold h-5 w-20 bg-slate-200 animate-pulse rounded-lg "></h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:h-36 w-full my-10 sm:my-5 flex">
              <div className="w-[20%] h-20 sm:h-full  bg-slate-200 animate-pulse"></div>
              <div className="h-full w-[80%] ">
                <div className="upper w-full flex px-3 justify-between items-start flex-col sm:flex-row h-[80%] ">
                  <div className="left w-full sm:w-[80%] flex flex-col items-start pl-1">
                    <h2 className="text-sm h-5 w-48 bg-slate-200 animate-pulse rounded-lg"></h2>
                    <h3 className="text-sm h-5 w-56 bg-slate-200 animate-pulse rounded-lg my-3"></h3>
                    <div className="flex justify-start gap-1 items-center mt-2 h-5 w-40 bg-slate-200 animate-pulse rounded-lg"></div>
                  </div>
                  <div className="right w-full flex flex-row justify-start items-center gap-3 sm:gap-2 sm:flex-col sm:w-[20%]">
                    <h1 className="font-semibold text-sm sm:text-xl my-2 sm:my-0 h-5 w-20 bg-slate-200 animate-pulse rounded-lg"></h1>
                    <h3 className="inilne-block text-sm sm:text-md font-semibold h-5 w-20 bg-slate-200 animate-pulse rounded-lg "></h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right p-5 sm:p-10 w-full h-auto sm:w-[30%] sm:border-l-2">
            <h1 className="my-5 text-base font-semibold sm:text-2xl bg-slate-200 animate-pulse h-6 w-28 rounded-lg"></h1>
            <div className="flex justify-between items-center py-0 sm:py-2  sm:text-base">
              <h2 className="bg-slate-200 animate-pulse h-6 w-14 rounded-l my-1"></h2>
              <h2 className="bg-slate-200 animate-pulse h-6 w-20 rounded-l my-1"></h2>
            </div>
            <div className="flex justify-between items-center  py-0 sm:py-2 text-base">
              <h2 className="bg-slate-200 animate-pulse h-6 w-28 rounded-l my-1"></h2>
              <h2 className="bg-slate-200 animate-pulse h-6 w-20 rounded-l my-1"></h2>
            </div>
            <div className="flex justify-between items-center  py-0 sm:py-2 pb-4 text-base">
              <h2 className="bg-slate-200 animate-pulse h-6 w-20 rounded-l my-1"></h2>
              <h2 className="bg-slate-200 animate-pulse h-6 w-24 rounded-l my-1"></h2>
            </div>
            {
              <div className="flex justify-center items-center py-5 pb-4 text-base bg-slate-200 animate-pulse h-6 w-full my-4  rounded-lg"></div>
            }
            <div className="py-4 text-center px-6 border text-green-600 my-3 cursor-pointer rounded-md bg-slate-200 animate-pulse h-6 w-full"></div>
            <div className="flex w-full px-4 py-2  flex-row sm:flex-col justify-between items-center fixed left-0 bottom-0 sm:relative bg-white">
              <div className="total flex flex-col sm:flex-row w-1/2 sm:w-full sm:justify-between items-start sm:items-center">
                <h2 className="font-bold text-xs sm:text-xl text-left text-slate-500 sm:capitalize uppercase bg-slate-200 animate-pulse h-6 w-28 rounded-md"></h2>
                <h2 className="font-bold text-left sm:text-xl text-2xl bg-slate-200 animate-pulse h-6 w-28 rounded-lg"></h2>
              </div>
              <div className="btn px-3 py-4 w-1/2 sm:w-full text-center cursor-pointer text-white font-semibold my-3 rounded-lg bg-slate-200 animate-pulse h-14"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
  if (carts.length === 0) {
    return (
      <>
        <div className="sm:h-[80vh] h-auto w-full flex justify-start sm:justify-center items-center flex-col">
          <img
            src="/emptyCart.jpg"
            alt=""
            className="object-fit h-96 w-96"
          />
          <h2 className="text-slate-500 font-semibold text-xl -mt-5">
            Your cart is empty
          </h2>
        </div>
      </>
    );
  }
  return (
    <div className="p-5 sm:px-10 flex h-full flex-col sm:flex-row justify-between items-start">
      {!isCheckoutShow ? (
        <div className="left sm:p-10 w-full sm:w-[70%]">
          <div className="flex justify-between items-center sm:mb-0 mb-5">
            <h1 className="font-semibold text-base sm:text-xl">
              Shopping cart
            </h1>
            <h1 className="text-base sm:text-md font-semibold text-zinc-500 mr-2">
               Price per sqr-foot
            </h1>
          </div>
          {carts?.map((item, idx) => {
            // console.log(item?.size);
            return (
              <ShoppingCart
                key={item.$id}
                title={item.title}
                price={item.price}
                thumbnail={item.thumbnail}
                id={item?.id}
                setCart={setCarts}
                description={item.description}
                idx={idx}
              />
            );
          })}
        </div>
      ) : (
        <>
          <GetOrders
            isCheckoutShow={isCheckoutShow}
            setISCheckoutShow={setISCheckoutShow}
            handleQuantityChange={handleQuantityChange}
            buyNow={buyNow}
          />
        </>
      )}

      <CheckoutSidebar
        calculateSubTotal={calculateSubTotal}
        calculateOriginalPrice={calculateOriginalPrice}
        setISCheckoutShow={setISCheckoutShow}
        isCheckoutShow={isCheckoutShow}
        allImages={allImages}
      />

      <Toaster />
    </div>
  );
};

export default CartPage;
