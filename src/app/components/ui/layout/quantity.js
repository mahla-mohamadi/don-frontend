'use client';

import Button from "./general-button";
import { useState } from "react";
export default function Quantity({
  min = 10,
  max = 15,
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

  const minusSvg = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
  
  const plusSvg = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14m-7-7v14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );

  return (
    <div className={`flex items-center gap-2 ${className}`} {...props}>
      <Button
        onClick={handleDecrease}
        text={minusSvg}
        className="quantityButton group"
        disabled={quantity <= min}
        tooltip={quantity <= min ? `حداقل تعداد ${min}` : 'کم کردن'}
      />
      <span className="text-lg font-medium w-8 text-center">{quantity}</span>
      <Button
        onClick={handleIncrease}
        text={plusSvg}
        className="quantityButton group"
        disabled={quantity >= max}
        tooltip={quantity >= max ? `حداکثر تعداد ${max}` : 'اضافه کردن'}
      />
    </div>
  );
}