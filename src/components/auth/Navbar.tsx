import React from 'react'
import { Button } from '../ui/button'
import { MoveLeft } from 'lucide-react'

const Navbar = () => {
  return (
    <header>
        <nav className='px-4 py-4'>
            <Button><MoveLeft /> Go Home</Button>
        </nav>
    </header>
  )
}

export default Navbar
