import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

type Props = {}

const SpotifyEmbed = (props: Props) => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state: any) => state.player);
    const { sessionStarted, hideElementsTimeout, hideElements } = useSelector((state: any) => state.lofi)

    const currentPage = usePathname();

    return (
        <div >
            {sessionStarted && (
                <div
                    className={`${currentPage == '/lofi' && !hideElements ? "opacity-100" : "opacity-0"} transition-opacity ease-in-out delay-150 duration-300 absolute justify-center w-[300px] h-[400px] z-40 mr-[45vw] top-[100px] left-[100px] flex animate-slideup bg-gradient-to-br `}>
                    {/* <MusicPlayer sessionStarted={sessionStarted} /> */}
                    <script src="https://open.spotify.com/embed/iframe-api/v1" async></script>
                    <iframe style={{ borderRadius: "12px" }} src="https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?si=f591446ddebe4669" width="100%" height="352" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                </div>
            )}
        </div>
    )
}

export default SpotifyEmbed