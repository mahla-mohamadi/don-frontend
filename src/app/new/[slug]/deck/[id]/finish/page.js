'use client';
import { motion } from 'framer-motion'; 
import PlayerRole from '@/app/components/ui/gameCard/player-role';
import { useLoading } from '@/app/context/LoadingContext';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import ApiService from '@/lib/api.service';
import ResetBtn from '@/app/components/ui/gameCard/resetBtn';

export default function FinishDeck() {
    const params = useParams();
    const router = useRouter();
    const { slug, id } = params;
    const [scenario, setScenario] = useState(null);
    const [deckRoles, setDeckRoles] = useState(null);
    const { isLoading, setLoading } = useLoading();
    const [deckInfo, setDeckInfo] = useState(null);
    const [totalRoles, setTotalRoles] = useState(0);
    const [time40, setTime40] = useState(40000); 
    const [time25, setTime25] = useState(25000); 
    const [isRunning40, setIsRunning40] = useState(false);
    const [isRunning25, setIsRunning25] = useState(false);
    const [startTime40, setStartTime40] = useState(0);
    const [startTime25, setStartTime25] = useState(0);
    const [createdTime, setCreatedTime] = useState('');

    const [isRolesAccordionOpen, setIsRolesAccordionOpen] = useState(false);
    const deckCards = [
        { number: 1, title: 'دن', englishTitle: 'GODFATHER' },
        { number: 2, title: 'کاراگاه', englishTitle: 'DETECTIVE' },
        { number: 3, title: 'شیاد', englishTitle: 'GODFATHER' },
        { number: 4, title: 'بازپرس', englishTitle: 'INVESTIGATOR' },
        { number: 5, title: 'بازپرس', englishTitle: 'INVESTIGATOR' },
        { number: 6, title: 'بازپرس', englishTitle: 'INVESTIGATOR' },
        { number: 7, title: 'بازپرس', englishTitle: 'INVESTIGATOR' },
        { number: 8, title: 'بازپرس', englishTitle: 'INVESTIGATOR' },
        { number: 9, title: 'بازپرس', englishTitle: 'INVESTIGATOR' },
        { number: 10, title: 'بازپرس', englishTitle: 'INVESTIGATOR' },
        { number: 11, title: 'بازپرس', englishTitle: 'INVESTIGATOR' },
        { number: 12, title: 'بازپرس', englishTitle: 'INVESTIGATOR' },
    ];

    const formatTime = useCallback((ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = Math.floor((ms % 1000) / 10);
        
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    }, []);

    useEffect(() => {
        let animationFrameId;
        let lastTime;

        const updateTimer40 = (timestamp) => {
            if (!lastTime) lastTime = timestamp;
            const elapsed = timestamp - lastTime;
            
            if (elapsed >= 16) { // ~60fps
                setTime40(prev => {
                    const newTime = prev - elapsed;
                    if (newTime <= 0) {
                        setIsRunning40(false);
                        return 40000;
                    }
                    return newTime;
                });
                lastTime = timestamp;
            }
            animationFrameId = requestAnimationFrame(updateTimer40);
        };

        if (isRunning40) {
            animationFrameId = requestAnimationFrame(updateTimer40);
        }

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [isRunning40]);

    useEffect(() => {
        let animationFrameId;
        let lastTime;

        const updateTimer25 = (timestamp) => {
            if (!lastTime) lastTime = timestamp;
            const elapsed = timestamp - lastTime;
            
            if (elapsed >= 16) { // ~60fps
                setTime25(prev => {
                    const newTime = prev - elapsed;
                    if (newTime <= 0) {
                        setIsRunning25(false);
                        return 25000;
                    }
                    return newTime;
                });
                lastTime = timestamp;
            }
            animationFrameId = requestAnimationFrame(updateTimer25);
        };

        if (isRunning25) {
            animationFrameId = requestAnimationFrame(updateTimer25);
        }

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [isRunning25]);

    const toggleTimer40 = () => {
        if (isRunning40) {
            setIsRunning40(false);
        } else {
            setIsRunning40(true);
            if (time40 <= 0) setTime40(40000);
        }
    };

    const toggleTimer25 = () => {
        if (isRunning25) {
            setIsRunning25(false);
        } else {
            setIsRunning25(true);
            if (time25 <= 0) setTime25(25000);
        }
    };

    const resetTimer40 = () => {
        setIsRunning40(false);
        setTime40(40000);
    };

    const resetTimer25 = () => {
        setIsRunning25(false);
        setTime25(25000);
    };

    const fetchScenario = async () => {
        try {
            setLoading(true);
            const response = await ApiService.get(`/scenario/${slug}`);
            if (response) {
                setScenario(response);
            }
        } catch (error) {
            console.log('Error fetching scenario:', error);
        } finally {
            setLoading(false);
        }
    };
    const fetchDeckRoles = async () => {
        try {
            setLoading(true);
            const response = await ApiService.get(`/scenario/${slug}/deck/${id}/summary`);
            if (response) {
                setDeckRoles(response);
            }
        } catch (error) {
            console.log('Error fetching scenario:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDeckInfo = async () => {
        try {
            setLoading(true);
            const response = await ApiService.get(`/scenario/${slug}/deck/${id}`);
            if (response) {
                setDeckInfo(response);
                setTotalRoles(response.player_count);
                // Extract time from created_at
                const timeString = new Date(response.created_at).toLocaleTimeString('fa-IR', {
                    hour: '2-digit',
                    minute: '2-digit'
                });
                setCreatedTime(timeString);
            }
        } catch (error) {
            console.log('Error fetching deck info:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchScenario();
        fetchDeckInfo();
        fetchDeckRoles();
    }, [slug, id]);

    return (
        <div className='relative'>
            <ResetBtn href="/" />
            <div className='w-full h-[200px] overflow-hidden relative after:absolute after:bg-[rgba(0,0,0,0.55)] after:left-0 after:right-0 after:top-0 after:bottom-0 after:w-full after:h-full after:z-10'>
                {scenario?.images?.[1]?.original && (
                    <img 
                        src={scenario.images[0].original}
                        alt={scenario.name || 'Scenario image'}
                        className='w-full h-full block object-cover'
                    />
                )}
                {deckInfo && (
                    <div className='absolute right-0 z-20 top-0 bottom-0 m-auto h-max pr-6 pt-8'>
                        <span className='text-white block text-[13px] font-light opacity-[0.7]'>دک {deckInfo.player_count} نفره</span>
                        <span className='text-white text-[20px] font-semibold mt-1 block'>سناریو {deckInfo.scenario_name}</span>
                        <span className='text-white text-[12px] font-light opacity-[0.7] mt-5 block'>شروع: {createdTime}</span>
                    </div>
                )}
            </div>
            
            <div className='container px-2 py-4'>
                {/* Minimal Timer Section */}
                <div className="flex justify-between flex-wrap mb-3 gap-2">
                    {/* 60-second Timer */}
                    <div className="bg-white p-2 items-center rounded-lg border border-gray-100 flex-1">
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-[14px] text-gray-800 py-2">نوبت صحبت</span>
                            <span className="text-[30px]  font-mono font-medium text-gray-800">
                                {formatTime(time40)}
                            </span>
                            <div className="flex gap-4 mt-3">
                                <button
                                    onClick={toggleTimer40}
                                    className={`p-0 rounded-full flex w-[50px] h-[50px] items-center justify-center ${isRunning40 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}
                                >
                                    {isRunning40 ? (
                                        // Pause SVG Icon
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                                        </svg>
                                    ) : (
                                        // Play SVG Icon
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    )}
                                </button>
                                <button
                                    onClick={resetTimer40}
                                    className="rounded-full p-0 w-[50px] h-[50px] flex items-center justify-center bg-gray-100 text-gray-600"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.605 7.705A7.9 7.9 0 0 0 12 5.382a7.93 7.93 0 0 0-7.929 7.929A7.94 7.94 0 0 0 12 21.25a7.94 7.94 0 0 0 7.929-7.94" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/><path d="m16.88 2.75.95 3.858a1.33 1.33 0 0 1-.97 1.609l-3.869.948" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* 30-second Timer */}
                    <div className="bg-white p-2 rounded-lg border border-gray-100 flex-1">
                        <div className="flex flex-col items-center">
                            <span className="text-[14px] text-gray-800 py-2">چالش</span>
                            <span className="text-[30px] font-mono font-medium text-gray-800">
                                {formatTime(time25)}
                            </span>
                            <div className="flex gap-4 mt-3">
                                <button
                                    onClick={toggleTimer25}
                                    className={`p-0 rounded-full flex w-[50px] h-[50px] items-center justify-center ${isRunning25 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}
                                >
                                    {isRunning25
                                    ? (
                                        // Pause SVG Icon
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                                        </svg>
                                    ) : (
                                        // Play SVG Icon
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    )
                                    }
                                </button>
                                <button
                                    onClick={resetTimer25}
                                    className="rounded-full p-0 w-[50px] h-[50px] flex items-center justify-center bg-gray-100 text-gray-600"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.605 7.705A7.9 7.9 0 0 0 12 5.382a7.93 7.93 0 0 0-7.929 7.929A7.94 7.94 0 0 0 12 21.25a7.94 7.94 0 0 0 7.929-7.94" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/><path d="m16.88 2.75.95 3.858a1.33 1.33 0 0 1-.97 1.609l-3.869.948" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="mb-2 w-full mx-auto border border-gray-100 p-3 rounded-[6px]">
                <button 
                    onClick={() => setIsRolesAccordionOpen(!isRolesAccordionOpen)}
                    className="flex items-center justify-between w-full"
                >
                    <h2 className="text-[15px] font-medium">نقش‌ها به ترتیب پخش شدن</h2>
                    <div className='flex justify-center items-center'>
                        {isRolesAccordionOpen ? (
                            <span>مخفی کردن</span>
                        ):(
                            <span>مشاهده</span>
                        )}
                     <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className={`transition-transform duration-200 ${isRolesAccordionOpen ? 'rotate-180' : ''}`}
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                    </div>
                </button>
                </div>
                <motion.div
                    initial={false}
                    animate={{
                        height: isRolesAccordionOpen ? 'auto' : 0,
                        opacity: isRolesAccordionOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                >
                <div className="flex items-center justify-center flex-col gap-1.5">
                    {deckRoles?.map((cards) => (
                        <motion.div
                            key={cards.seat}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className='w-full'
                        >
                            <PlayerRole 
                                title={cards.name} 
                                number={cards.seat} 
                                englishTitle={cards.latin_name}
                            />
                        </motion.div>
                    ))}
                </div>
                </motion.div>
            </div>
        </div>
    );
}