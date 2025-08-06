'use client';
import Button from "@/app/components/ui/layout/general-button";
import Quantity from "@/app/components/ui/layout/quantity";
import Back from "@/app/components/ui/layout/back-button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ApiService from "@/lib/api.service";
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from "@/app/context/LoadingContext";
export default function Page() {
    const params = useParams();
    const router = useRouter();
    const { slug } = params;
    const [scenario, setScenario] = useState(null);
    const { isLoading, setLoading } = useLoading();
    const [quantity, setQuantity] = useState(10);

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
    };

    const createNewDeck = async () => {
        try {
            const newDeck = {
                name: "donDeck",
                player_count: quantity, 
            };
            const response = await ApiService.post(`/scenario/${slug}/deck`, newDeck);
            if (response) {
                router.push(`/new/${slug}/deck/${response.id}`);
            }
        } catch (error) {
            console.log("Error creating scenario:", error);
        }
    };
    useEffect(() => {
        const fetchScenario = async () => {
            try {
                setLoading(true);
                const response = await ApiService.get(`/scenario/${slug}`);
                if (response) {
                    setScenario(response);
                }
            } catch (error) {
                console.log('Error fetching scenario:', error);
            } finally{
                setLoading(false);
            }
        };
        fetchScenario();

    }, [slug]);
    if(isLoading){
        setLoading(true);
    }
    if (!scenario) {
        return ;
    }

    return (
        <div className="mx-auto lg:py-4 h-full">
            <div className="max-w-[480px] w-full h-full overflow-hidden mx-auto object-cover relative mainOverlay">
                {scenario?.images?.[1]?.original && (
                    <motion.img 
                        initial={{ scale: 1.1}}
                        animate={{ scale: 1}}
                        exit={{ scale: 1.1}}
                        transition={{ type: 'spring', stiffness: 150, damping: 30 }}
                        src={scenario.images[1].original} 
                        alt={scenario.name || 'Scenario image'} 
                        className="block w-full h-full object-cover"
                    />
                )}
                <Back link="../" className="fixed left-[20px] top-[20px] z-20"/>
                <motion.div 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ stiffness: 150 }}
                className="max-w-[480px] mx-auto rounded-t-[30px] mainBox z-20">
                    <h2 className="text-[20px] font-[800]">سناریو {scenario.name}</h2>
                    <Quantity 
                        onQuantityChange={handleQuantityChange}
                        defaultValue={quantity}
                    />
                    <Button label="توزیع نقش" onClick={createNewDeck} />
                </motion.div>
            </div>
        </div>
    )
}