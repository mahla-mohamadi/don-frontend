'use client'
import Button from "../components/ui/layout/general-button"
import Quantity from "../components/ui/layout/quantity"
import Back from "../components/ui/layout/back-button";
import ApiService from "@/lib/api.service";
export default function page() {
    const handleQuantityChange = (newQuantity) => {
        console.log('Quantity changed to:', newQuantity);
    };
    const createNewDeck = async () => {
    try {
        const newDeck = {
            name: "donDeck",
            player_count: 13,
        };

        const response = await ApiService.post('/scenario/bazpors/deck', newDeck);
    } catch (error) {
        console.error("Error creating scenario:", error);
    }
    };
    return (
        <div className="mx-auto lg:py-4 h-full">
            <div className="max-w-[480px] w-full h-full overflow-hidden mx-auto object-cover relative rounded-[24px] mainOverlay">
                <img src="/img/domy.png" alt="" className="block w-full h-full object-cover"/>
                <Back link="../" className="absolute right-[28px] top-[48px] z-20"/>
                <div className="rounded-t-[25px] mainBox z-20">
                    <h2 className="text-[20px] font-[800]">سناریو بازپرس</h2>
                    <Quantity 
                        onQuantityChange={handleQuantityChange}
                    />
                    <Button label="توزیع نقش" onClick={() => createNewDeck()} />
                </div>
            </div>
        </div>
    )
}
