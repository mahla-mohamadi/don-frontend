'use client';
import LoginForm from "@/app/components/partials/login-form";
import Card from "./components/ui/gameCard/card";
export default function Home() {
  return (
    <div>
        <LoginForm className="max-w-md mx-auto mt-10" />
        <Card img={"/img/gamecard1.png"} title={"بازپرس"} />
    </div>
  );
}
