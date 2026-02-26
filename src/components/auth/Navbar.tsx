import React from 'react'
import { Button } from '../ui/button'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header className='absolute z-20'>
        <nav className='px-4 py-4'>
            <Link href={'/'}><Button><MoveLeft /> Go Home</Button></Link>
        </nav>
    </header>
  )
}

export default Navbar
