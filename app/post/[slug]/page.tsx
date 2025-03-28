import React from 'react'

async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    return <div>My Post: {slug}</div>
}

export default Page