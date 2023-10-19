import React from 'react'
import { useSelector } from 'react-redux';
import MusicPlayer from './MusicPlayer';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';


type Props = {}

const MusicPlayerContainer = (props: Props) => {
    const { activeSong, isPlaying } = useSelector((state: any) => state.player);
    const { sessionStarted } = useSelector((state: any) => state.lofi)

    const currentPage = usePathname();
    console.log(currentPage)

    return (
        <div>
            {activeSong?.title && sessionStarted && (
                <div className={`absolute justify-center z-40 mr-[45vw] bottom-11 right-0 flex animate-slideup bg-gradient-to-br ${currentPage == '/lofi' ? 'block' : 'hidden'}`}>
                    <MusicPlayer sessionStarted={sessionStarted} />
                </div>
            )}
        </div>
    )
}

export default MusicPlayerContainer