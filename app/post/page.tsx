import Link from 'next/link';
import React from 'react'
const dummyData = [
  {
    date: '16-10-2022',
    title: 'Lorem ipsum dolor sit amet consectetur',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, natus enim repudiandae accusamus doloremque sequi. Voluptate aliquam similique incidunt sapiente.'
  },
  {
    date: '17-10-2022',
    title: 'Sed do eiusmod tempor incididunt ut labore',
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    date: '18-10-2022',
    title: 'Duis aute irure dolor in reprehenderit',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
];
export default function Post() {
  return (
    <main className='mt-24 px-4'>
      <h1 className='text-4xl font-bold text-center'>
        Exploring the Depths of Knowledge
      </h1>
      <p className='text-center text-sm text-muted-foreground mt-4'>This is a detailed post about various topics of interest. Stay tuned for more updates and insights!</p>

      <div className="mt-8 mx-auto w-fit grid gap-3">
        {dummyData.map((item, index) => (
            <Link href={'post/' + item.title.toLowerCase().replace(/ /g, '-')} key={index} className="flex gap-4 items-center group cursor-pointer">
            <span className='text-muted-foreground text-sm font-mono hidden md:block'>{item.date}</span>
            <div className="size-3 rounded-full border border-primary/20 bg-primary/10 hidden md:block"></div>
            <div className="border border-primary/20 backdrop-blur-sm rounded-lg bg-primary/5 group-hover:bg-primary/10 p-4 w-full max-w-lg">
              <h2 className="text-md font-bold">{item.title}</h2>
              <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
            </div>
            </Link>
        ))}
      </div>
    </main>
  )
}
