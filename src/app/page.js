'use client';
import LoginForm from "@/app/components/partials/login-form";
import Card from "./components/ui/gameCard/card";
import SeeRoll from "./components/ui/deck/seeRoll";
import axios from "axios";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
      axios.get('https://api.donplay.ir/api/scenario')
        .then(function (response) {
          // handle success
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
      });
  }, []);
  const card = [
    {
      id : 1,
      title : 'بازپرس',
      img:'/img/gamecard1.png'
    },
    {
      id : 2,
      title : 'کاپو',
      img:'/img/gamecard2.png'
    },
    {
      id : 3,
      title : 'نماینده',
      img:'/img/gamecard3.png'
    },
  ]

  return (
    <div className="container mx-auto p-1">
      <div className="w-full  pt-10 min-h-screen">
        <div className="mb-3 w-full pr-1  mx-auto">
          <h2 className="text-[16px] text-titleText">تقسیم نقش</h2>
          <span className="h-[2px] w-9 bg-[#D52A2A] flex mt-1"></span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"> 
            {card.map((val)=>{
              return(
              <Card  
              key={val.id}
              title={val.title}
              img={val.img}
              />)
            })}
        </div>  
      </div>
    </div>
  );
}
