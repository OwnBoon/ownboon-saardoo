import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from "next";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useUser } from "@clerk/nextjs";
import { useDispatch } from 'react-redux';

import Layout from '../components/Layout/Layout';
import Discover from '../components/lofi/components/Discover';
import { User } from "../typings";
import { fetchUsers } from '../utils/fetchUsers';
import MusicPlayer from '../components/lofi/MusicPlayer';
import { setActiveSong, setIsPlaying } from '../redux/features/playerSlice';
import Clock from '../components/Clock/Clock';

interface Props {
    users: User[];
}
const lofi = ({ users }: Props) => {

    const dispatch = useDispatch();

    const { user } = useUser();
    const router = useRouter();

    const [sessionStarted, setSessionStarted] = useState(false);
    const { activeSong, isPlaying } = useSelector((state: any) => state.player);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const [seconds, setSeconds] = useState(0);
    const [time, setTime] = useState("");

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setSeconds((s) => s + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isPlaying]);

    useEffect(() => {
        const hours = Math.floor(seconds / 3600);
        const rm = seconds % 3600;

        const minutes = Math.floor(rm / 60);
        const _seconds = seconds % 60;
        setTime(`${hours > 0 ? hours + ' h' : ''}  ${minutes > 0 ? minutes + ' m' : ''}  ${_seconds > 0 ? _seconds + ' s' : ''}`);
    }, [seconds]);

    const match = users.filter(
        (_users) => _users.email === user?.emailAddresses[0].emailAddress
    );

    useEffect(() => {
        // @ts-ignore
        setStartTime(new Date());

        const handleRouteChange = () => {
            // @ts-ignore
            setEndTime(new Date());
        };

        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
            dispatch(setActiveSong({ song: null, data: null, id: null }));
            dispatch(setIsPlaying({ playing: false }));
        };

    }, []);

    const calculatePoints = (timeSpentInSeconds: number) => {
        const pointsPerSecond = 0.1; // change this value to adjust point earning rate
        const earnedPoints = Math.floor(timeSpentInSeconds * pointsPerSecond);
        return earnedPoints;
    };

    useEffect(() => {
        if (endTime && startTime) {
            const earnedPoints = calculatePoints(seconds);
            const points = Number(match[0]?.focus) + earnedPoints;

            const postUser = async () => {
                const userInfo: User = {
                    _id: match[0]?._id,
                    focus: points.toString(),
                };
                const result = await fetch(`/api/addPoints`, {
                    body: JSON.stringify(userInfo),
                    method: "POST",
                });

                const json = await result.json();
                return json;
            };
            postUser();
        }
    }, [endTime, startTime]);


    const handleStart = () => {
        setSessionStarted(true);
    };

    return (
        <Layout
            hasBg={true}
            bgColor={'#121212'}
            icon='workspace.svg'
            text='Lofi'
            border={'#ccc'}
            children={(
                <div
                    className='w-full h-screen text-[#000000]'
                >

                    <div
                        className='flex items-center justify-center w-full h-full flex-col gap-10'
                    >
                        {sessionStarted && <>
                            <Discover />
                            {seconds > 0 && (
                                <div
                                    className='absolute right-4 top-16 h-20 w-20 rounded-full bg-[#D9D9D9] p-4 flex items-center justify-center'
                                >
                                    {time}
                                </div>
                            )}
                        </>}
                        <Clock />
                        <button
                            className='bg-[#D9D9D9] bg-opacity-50 border-white border text-white w-1/5 rounded p-4 cursor-pointer'
                            onClick={handleStart}
                        >
                            {sessionStarted ? "Stop Session" : "Start Session"}
                        </button>
                    </div>


                    {activeSong?.title && (
                        <div className="absolute z-50 h-28 w-4/5 bottom-0  right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl ">
                            <MusicPlayer />
                        </div>
                    )}
                </div>
            )}
        />
    );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
    const users = await fetchUsers();

    return {
        props: {
            users,
        },
    };
};

export default lofi;