'use client'
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ApiService from '@/lib/api.service';
import SeeRoll from '@/app/components/ui/deck/seeRoll';
import Role from '@/app/components/ui/deck/role';
import { motion, AnimatePresence } from 'framer-motion';
import ResetBtn from '@/app/components/ui/gameCard/resetBtn';
import Button from '@/app/components/ui/layout/general-button';
import Link from 'next/link';
import { useLoading } from '@/app/context/LoadingContext';
export default function DeckPage() {
    const params = useParams();
    const router = useRouter();
    const { slug, id } = params;
    const [currentRole, setCurrentRole] = useState(null);
    const [showRole, setShowRole] = useState(false);
    const { isLoading, setLoading } = useLoading();
    const [finished, setFinished] = useState(false);
    const [totalRoles, setTotalRoles] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [deckInfo, setDeckInfo] = useState(null);
    const [firstTap, setFirstTap] = useState(true); // Track if it's the first tap

    const fetchDeckInfo = async () => {
        
        try {
            setLoading(true);
            const response = await ApiService.get(`/scenario/${slug}/deck/${id}`);
            if (response) {
                setDeckInfo(response);
                setTotalRoles(response.player_count);
            }
        } catch (error) {
            console.log('Error fetching deck info:', error);
        }finally {
            setLoading(false);
        }
    };

    const fetchRole = async () => {
        try {
            setLoading(true);
            const response = await ApiService.get(`/scenario/${slug}/deck/${id}/take`);
            if (response) {
                setCurrentRole(response);
                setCurrentIndex(prev => prev + 1);
                return true;
            }
        } catch (error) {
            if (error.response?.data?.message === 'No Cards Remaining') {
                setFinished(true);
                setCurrentRole(null);
            } else {
                console.log('Error fetching role:', error);
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const initialize = async () => {
            setLoading(true);
            await fetchDeckInfo();
            setLoading(false);
        };
        initialize();
    }, [slug, id]);

    const handleTap = async () => {
        if (finished) return;
        
        if (firstTap) {
            // First tap - fetch and show the first role immediately
            const success = await fetchRole();
            if (success) {
                setShowRole(true);
                setFirstTap(false);
            }
        } else {
            // Subsequent taps
            if (!showRole && currentRole) {
                setShowRole(true);
            } else {
                const success = await fetchRole();
                if (success) {
                    setShowRole(false); // Hide role immediately after fetching new one
                }
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#e4dbce]">
                <div>در حال بارگزاری...</div>
            </div>
        );
    }

    if (finished) {
        return (
            <>
            <ResetBtn href={`/new/${slug}`}/>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-screen bg-[#e4dbce] text-black"
            >
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    className="text-center w-full h-full flex flex-col relative justify-center items-center container px-2"
                >
                    <motion.h2 
                        className="text-2xl font-bold mb-4"
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        😀<br />
                        خوش بگذره
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                         همه پلیرها نقش گرفتن
                    </motion.p>
                    <Link href='/' className='bg-white p-2 text-neutral-800 rounded-[4px] mt-[20px] min-w-[150px] text-center'>شروع دک جدید</Link>
                </motion.div>
            </motion.div>
            </>
        );
    }

    return (
        <div onClick={handleTap} className="w-full h-screen bg-[#e4dbce] overflow-hidden relative">
            <ResetBtn href={`/new/${slug}`}/>
            <AnimatePresence mode="wait">
                {showRole ? (
                    <>
                    
                    <motion.div
                        key="role"
                        initial={{ scale: 0.9, opacity: 0}}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.1, opacity: 0}}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="absolute inset-0"
                    >
                        <Role 
                            name={currentRole?.name} 
                            enName={currentRole?.latin_name} 
                            number={currentIndex}
                            total={totalRoles}
                            image={currentRole?.images?.[0]?.original}
                        />
                    </motion.div>
                    </>
                ) : (
                    <>
                    <motion.div
                        key="seeRoll"
                        initial={{ scale: 0.9, opacity: 0.6}}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="absolute inset-0"
                    >
                        <SeeRoll />
                    </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}