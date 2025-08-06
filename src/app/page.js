'use client';
import Card from "./components/ui/gameCard/card";
import { useEffect, useState } from "react";
import ApiService from "@/lib/api.service";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const scenarios = await ApiService.get('/scenario');
        setCards(scenarios);
      } catch (error) {
        console.log('Error fetching scenarios:', error);
      }
    };
    fetchScenarios();
  }, []);
  const createNewDeck = (id) => { 
    console.log(id);
    router.push(`/new/${id}`);
  };
  return (
    <div className="container mx-auto p-1">
      <div className="w-full  pt-10 min-h-screen">
        <div className="mb-3 w-full pr-1  mx-auto">
          <h2 className="text-[16px] text-titleText">تقسیم نقش</h2>
          <span className="h-[2px] w-9 bg-[#D52A2A] flex mt-1"></span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"> 
            {cards.map((val)=>{
              return(
              <Card  
              key={val.id}
              id={val.slug}
              title={val.name}
              img={val.images?.[0]?.original}
              onClick={() => createNewDeck(val.slug)} 
              />)
            })}
        </div>  
      </div>
    </div>
  );
}
