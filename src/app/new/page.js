'use client'
import Button from "../components/ui/layout/general-button"
import Quantity from "../components/ui/layout/quantity"
import Back from "../components/ui/layout/back-button";

export default function page() {
    const handleQuantityChange = (newQuantity) => {
        console.log('Quantity changed to:', newQuantity);
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
                    <Button label="توزیع نقش" onClick={() => console.log('Button clicked')} />
                </div>
            </div>
        </div>
    )
}
