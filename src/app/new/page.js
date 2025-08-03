'use client'
import Button from "../components/ui/layout/general-button"
import Quantity from "../components/ui/layout/quantity"
import Back from "../components/ui/layout/back-button";

export default function page() {
    const handleQuantityChange = (newQuantity) => {
        console.log('Quantity changed to:', newQuantity);
    };
    return (
        <div className="max-w-md mx-auto mt-10 bg-amber-600">
                <Button label="توزیع نقش" onClick={() => console.log('Button clicked')} />
                <Quantity 
                    onQuantityChange={handleQuantityChange}
                    className="my-4"
                />
                <Back link="../" />
        </div>
    )
}
