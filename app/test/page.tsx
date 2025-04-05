import { toDataURL } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

async function page() {
    
    const base64: string = await toDataURL("https://res.cloudinary.com/doj9hfdji/h_10,q_20,f_auto/sample.jpg")

    return (
        <div className='h-full flex items-center'>
            <div className="relative w-1/4 aspect-video mx-auto">
                <Image alt='IDK' src="https://res.cloudinary.com/doj9hfdji/sample.jpg" placeholder='blur' blurDataURL={base64} fill />
            </div>
        </div>
    )
}

export default page