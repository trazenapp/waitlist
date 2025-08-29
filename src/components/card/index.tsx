import React from 'react'

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({children, className}: CardProps) => {
  return (
    <div className={`bg-[#161616] border border-[#434343] rounded-4xl p-4 md:px-[60px] md:py-14 ${className}`}>
      {children}
    </div>
  )
}

export default Card