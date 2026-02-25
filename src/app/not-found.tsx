import { Button } from '@/components/ui/button'
import Link from 'next/link'
import './globals.css'
import { NotFoundPage } from '../../components/not-found'
 
export default function NotFound() {
  return (
    <div className="dark">
        <NotFoundPage />
    </div>
  )
}