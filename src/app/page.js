'use client';
import LoginForm from "@/app/components/partials/login-form";
import Card from "./components/ui/gameCard/card";
export default function Home() {

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
    <div className="container  mx-auto  px-1">
      <div className="w-full  pt-10 min-h-screen">
        <div className="mb-3 w-full pr-1  mx-auto">
          <h2 className="text-[16px] text-[#373F46]">تقسیم نقش</h2>
          <span className="h-[2px] w-9 bg-red-500 flex mt-1"></span>
        </div>
        <div className="grid grid-col-3"> 
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
