import React from 'react'

export default function RollHeader() {

     const roll ={
            
       id: 1,
       title : 'بازپرس',
       titleEng : 'INVESTIGATOR',
       number : 'نقش 1 از 10',
            
           
     }

  return (
   <div key={val.id}>
       <h2>{val.title}</h2>
       <h4>{val.titleEng}</h4>
       <p>{val.number}</p>
   </div>
  
  )
}
