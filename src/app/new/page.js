'use client';
import { useState, useEffect } from "react";
import { useLoading } from "../context/LoadingContext";
import ApiService from "@/lib/api.service";

export default function Page() {
    const [allDeck, setAllDeck] = useState(null);
    const { isLoading, setLoading } = useLoading();

    const fetchDeck = async () => {
        try {
            setLoading(true);
            const response = await ApiService.get(`/deck`);
            if (response) {
                setAllDeck(response);
                console.log(response);
            }
        } catch (error) {
            console.log('Error fetching scenario:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDeck();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return {
            date: `${year}-${month}-${day}`,
            time: `${hours}:${minutes}`
        };
    };

    const getStatusText = (remaining) => {
        return remaining === 0 ? 'کامل' : 'ناقص';
    };

    return (
        <div className="flex items-center justify-center p-2 flex-col gap-1.5">
            { allDeck ? (
                <div className="w-full">
                    <h1 className="text-2xl font-bold mb-4">لیست دست‌ها</h1>
                    <div className="space-y-4">
                        {allDeck.map((deck, index) => {
                            const { date, time } = formatDate(deck.created_at);
                            return (
                                <div key={index} className="p-4 border rounded-lg shadow-sm">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span>{date} - {time} - {deck.scenario_name} - {deck.player_count} نفره - {getStatusText(deck.remaining)}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div>No deck data available</div>
            )}
        </div>
    );
}