/* eslint-disable @typescript-eslint/no-unused-vars, @next/next/no-img-element, jsx-a11y/alt-text */
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {

        const { searchParams } = new URL(request.url);
        const hasTitle = searchParams.has('title');
        const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : "My Website"

        const InterBold = await fetch(new URL("../../fonts/Inter-Bold.ttf", import.meta.url)).then((res) => res.arrayBuffer())
        const InterRegular = await fetch(new URL("../../fonts/Inter-Regular.ttf", import.meta.url)).then((res) => res.arrayBuffer())

        return new ImageResponse(
            (
                <div
                    style={{
                        backgroundImage: 'url(http://localhost:3000/grainy-bg-1.jpeg)',
                        backgroundSize: '100% 100%',
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        fontFamily: 'Inter',
                        padding: '40px 80px',
                    }}
                >
                    <div
                        style={{
                            fontSize: 60,
                            fontWeight: 700,
                            letterSpacing: '-0.025em',
                            lineHeight: 1,
                            color: 'white',
                            marginBottom: 24,
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        {title}
                    </div>
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        color: 'white'
                    }}>
                        <img
                            width="44"
                            height="44"
                            style={{
                                borderRadius: 44,
                            }}
                            src={`https://res.cloudinary.com/doj9hfdji/image/upload/w_44/f_auto,q_auto/rick-and-morty-comic-art-of-doofus-rick-running-for-president-1_1_aiforn`}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div tw='font-bold'>
                                Hasbi Assidiqi
                            </div>
                            <div>
                                Software Engineer
                            </div>
                        </div>
                    </div>
                </div>
            )
            , {
                fonts: [
                    {
                        name: "Inter",
                        data: InterBold,
                        style: 'normal',
                        weight: 700
                    },
                    {
                        name: "Inter",
                        data: InterRegular,
                        style: 'normal',
                        weight: 400
                    }
                ]
            });
    } catch (error) {
        return new Response("Failed to generate OG Image", { status: 500 })
    }
}