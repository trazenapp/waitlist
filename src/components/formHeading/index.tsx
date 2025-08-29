import React from 'react'

interface FormHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const FormHeading = ({ title, subtitle, className }: FormHeadingProps) => {
  return (
    <div className={`flex flex-col gap-y-4 text-center ${className}`}>
      <h5 className='font-sans text-2xl md:text-[32px] font-medium'>
        {title}
      </h5>
      {subtitle && (
        <p className='font-sans text-base font-normal'>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default FormHeading