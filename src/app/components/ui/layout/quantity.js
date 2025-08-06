'use client';

import Button from "./general-button";
import { useState } from "react";
import { SVGMinus , SVGPlus } from "@/app/svg";
export default function Quantity({
  min = 10,
  max = 13,
  defaultValue = 10,
  onQuantityChange,
  className = '',
  ...props
}) {
  const [quantity, setQuantity] = useState(defaultValue);

  const handleDecrease = () => {
    const newQuantity = Math.max(min, quantity - 1);
    setQuantity(newQuantity);
    onQuantityChange?.(newQuantity);
  };

  const handleIncrease = () => {
    const newQuantity = Math.min(max, quantity + 1);
    setQuantity(newQuantity);
    onQuantityChange?.(newQuantity);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`} {...props}>
      <Button
        onClick={handleDecrease}
        text={<SVGMinus />}
        className="quantityButton group"
        disabled={quantity <= min}
        tooltip={quantity <= min ? `حداقل تعداد ${min}` : 'کم کردن'}
      />
      <span className="text-lg font-medium w-8 text-center">{quantity}</span>
      <Button
        onClick={handleIncrease}
        text={<SVGPlus />}
        className="quantityButton group"
        disabled={quantity >= max}
        tooltip={quantity >= max ? `حداکثر تعداد ${max}` : 'اضافه کردن'}
      />
    </div>
  );
}