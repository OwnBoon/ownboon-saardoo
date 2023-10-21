import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MusicPlayer from './MusicPlayer';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import { setHideElements } from '../../redux/features/lofiSlice';


type Props = {}

const MusicPlayerContainer = (props: Props) => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state: any) => state.player);
    const { sessionStarted, hideElementsTimeout, hideElements } = useSelector((state: any) => state.lofi)

    const currentPage = usePathname();

    // let timeout: string | number | NodeJS.Timeout | undefined;

    // const handleMouseMove = (e: any) => {
    //     e.stopPropagation()
    //     if (sessionStarted) {
    //         dispatch(setHideElements(false))
    //         clearTimeout(timeout);
    //         timeout = setTimeout(handleHideElements, 3000);
    //     }
    // }

    // const handleHideElements = () => {
    //     dispatch(setHideElements(true))
    // }

    return (
        <div>
            {activeSong?.title && sessionStarted && (
                <div className={`absolute justify-center z-40 mr-[45vw] bottom-11 right-0 flex animate-slideup bg-gradient-to-br ${currentPage == '/lofi' && !hideElements ? 'block' : 'hidden'}`}>
                    <MusicPlayer sessionStarted={sessionStarted} />
                </div>
            )}
        </div>
    )
}

export default MusicPlayerContainer