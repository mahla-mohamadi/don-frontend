'use client';
import { motion } from 'framer-motion'; // Minimal import
import PlayerRole from "../components/ui/gameCard/player-role";

export default function Page() {
  const deckCards = [
    { number: 1, title: 'دن', englishTitle: 'GODFATHER' },
    { number: 2, title: 'کاراگاه', englishTitle: 'DETECTIVE' },
    { number: 3, title: 'دن', englishTitle: 'GODFATHER' },
    { number: 4, title: 'دن', englishTitle: 'GODFATHER' },
  ];
  
  return (
    <div className="w-3/4 m-auto h-3/4 flex items-center justify-center p-20 flex-col gap-1.5">
      {deckCards.map((cards) => (
        <motion.div
          key={cards.number}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='w-[100%]'
        >
          <PlayerRole 
            title={cards.title} 
            number={cards.number} 
            englishTitle={cards.englishTitle}
          />
        </motion.div>
      ))}
    </div>
  );
}