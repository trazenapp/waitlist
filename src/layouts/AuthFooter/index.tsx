import React from 'react'
import Link from 'next/link'

const AuthFooter = () => {
  return (
    <footer className='pb-10 mt-16 w-11/12 mx-auto hidden md:flex justify-between items-center font-sans text-base font-normal text-[#B7B7B7]'>
      <div className=''>
        © 2025 Trazen
      </div>
      <ul className='flex gap-x-10'>
        <li>
          <Link href="#">Privacy Policy</Link>
        </li>
        <li>
          <Link href="#">Support</Link>
        </li>
      </ul>
    </footer>
  )
}

export default AuthFooter