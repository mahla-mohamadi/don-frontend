'use client';
import LoginForm from "@/app/components/partials/login-form";
import Card from "./components/ui/gameCard/card";
import SeeRoll from "./components/ui/deck/seeRoll";
import axios from "axios";
import { useEffect, useState } from "react";
import ApiService from "@/lib/api.service";

export default function Home() {
  const [cards, setCards] = useState([]);


  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const scenarios = await ApiService.get('/scenario');
        setCards(scenarios);
      } catch (error) {
        console.error('Error fetching scenarios:', error);
      }
    };

    fetchScenarios();
  }, []);

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
              title={val.name}
              img={val.images?.[0]?.original}
              />)
            })}
        </div>  
      </div>
    </div>
  );
}
