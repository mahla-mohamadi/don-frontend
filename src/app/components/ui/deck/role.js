'use client'
import NextBtn from "../gameCard/nextBtn"
import { motion } from 'framer-motion';

export default function Role({ name = 'بازپرس', enName = 'INVESTIGATOR', number = '1', total = '13', image }) {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative boxOverlay min-h-screen block"
        >
            {image ? (
                <motion.img 
                    src={image} 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full min-h-screen object-cover block"
                />
            ) : (
                <img src="/img/domy.png" className="w-full h-full min-h-screen object-cover block" />
            )}
            
            <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className='w-full text-center fixed top-[50px] left-0 right-0 z-20'
            >
                <motion.h2 
                    className='text-[35px] font-extrabold mb-3 text-white'
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                >
                    {name}
                </motion.h2>
                <motion.h4 
                    className='text-[14px] font-semibold mb-1 text-[#E6E6E6] tracking-1 opacity-50'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.5 }}
                >
                    {enName}
                </motion.h4>
                <motion.p 
                    className='text-[13px] text-white'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    نقش {number} از {total}
                </motion.p>
            </motion.div>
            <NextBtn />
        </motion.div>
    )
}