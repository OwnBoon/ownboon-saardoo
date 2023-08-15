import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from "next";
import socketIO from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useUser } from "@clerk/nextjs";
import { useDispatch } from 'react-redux';

import Layout from '../components/Layout/Layout';
import Discover from '../components/lofi/components/Discover';
import { Goals, Notes, User } from "../typings";
import { fetchGoals } from "../utils/fetchGoals";
import { fetchNotes } from "../utils/fetchNotes";
import { fetchUsers } from '../utils/fetchUsers';
import MusicPlayer from '../components/lofi/MusicPlayer';
import { setActiveSong, setIsPlaying } from '../redux/features/playerSlice';

interface Props {
    users: User[];
    goals: Goals[];
    notes: Notes[];
}
const lofi = ({ users, goals, notes }: Props) => {

    const dispatch = useDispatch();

    const { user } = useUser();
    const router = useRouter();
    const socket = socketIO("http://localhost:8000/");

    const { activeSong } = useSelector((state: any) => state.player);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [timeSpent, setTimeSpent] = useState(0);
    const [points, setPoints] = useState(0);

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
            const timeSpentInSeconds = Math.floor((endTime! - startTime!) / 1000);
            const pointsEarned = calculatePoints(timeSpentInSeconds);
            dispatch(setActiveSong({ song: null, data: null, id: null }));
            dispatch(setIsPlaying({ playing: false }));
        };

    }, []);

    const calculatePoints = (timeSpentInSeconds: number) => {
        const pointsPerSecond = 0.1; // change this value to adjust point earning rate
        const earnedPoints = Math.floor(timeSpentInSeconds * pointsPerSecond);
        setPoints(earnedPoints);
        return earnedPoints;
    };

    useEffect(() => {
        if (endTime) {
            const timeSpentInSeconds = Math.floor((endTime - startTime!) / 1000);
            setTimeSpent(timeSpentInSeconds);
            const earnedPoints = calculatePoints(timeSpentInSeconds);
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
    }, [endTime]);

    return (
        <Layout
            bgColor={'#121212'}
            icon='workspace.svg'
            text='Lofi'
            border={'#ccc'}
            children={(
                <div
                    className='w-full h-screen'
                >
                    <Discover socket={socket} />

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
    const goals = await fetchGoals();
    const notes = await fetchNotes();

    return {
        props: {
            users,
            goals,
            notes,
        },
    };
};

export default lofi;