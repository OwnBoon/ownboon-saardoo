import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { fetchUsers } from "../utils/fetchUsers";
import { Goals, Notes, User } from "../typings";
import { useRouter } from "next/router";
import { fetchGoals } from "../utils/fetchGoals";
import { fetchNotes } from "../utils/fetchNotes";
import { useUser } from "@clerk/nextjs";
import {
    Button,
    Textarea,
    Progress,
    Card,
    Modal,
    Grid,
    Text
} from "@nextui-org/react";
import {
    ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { MdPassword } from "react-icons/md";
import ReactPlayer from "react-player";
import Layout from "../components/Layout/Layout";
interface datatype {
    message: {
        choices: [
            {
                message: {
                    content: string;
                };
            }
        ];
    };
}
interface Info {
    link: string;
    description: string;
}
interface Props {
    users: User[];
    goals: Goals[];
    notes: Notes[];
}

interface RoadmapItem {
    id: number;
    level: number;
    parent: number;
    title: string;
}
const Home = ({ users, goals, notes }: Props) => {
    const { isLoaded, isSignedIn, user } = useUser();
    const [show, setShow] = useState(false);
    const router = useRouter();
    const [desc, setDesc] = useState("");
    const [data, setData] = useState<datatype>();

    const sampleData = [{
        category: "ui/ux",
        roadmap: [
            { id: 1, level: 0, parent: 0, title: "HTML5", completed: true, description: "Learn the basics of HTML5." },
            { id: 2, level: 0, parent: 0, title: "CSS3", completed: true, description: "Explore advanced CSS3 techniques." },
            { id: 3, level: 0, parent: 0, title: "Javascript", completed: true, description: "Dive into the world of JavaScript." },
            { id: 4, level: 0, parent: 0, title: "React", completed: true, description: "Build interactive UIs with React." },
            { id: 5, level: 1, parent: 1, title: "Semantic Markup", completed: true, description: "Master the art of semantic markup." },
            { id: 6, level: 1, parent: 1, title: "Forms", completed: true, description: "Create user-friendly forms." },
            { id: 7, level: 1, parent: 1, title: "Accessibility", completed: true, description: "Ensure accessibility for all users." },
            { id: 8, level: 1, parent: 2, title: "Responsive Design", completed: true, description: "Design responsive layouts." },
            { id: 9, level: 1, parent: 2, title: "CSS Frameworks", completed: true, description: "Use popular CSS frameworks." },
            { id: 10, level: 1, parent: 2, title: "CSS Preprocessors", completed: true, description: "Enhance CSS with preprocessors." },
            { id: 11, level: 1, parent: 3, title: "ES6", completed: false, description: "Discover the power of ES6." },
            { id: 12, level: 1, parent: 3, title: "Ajax and APIs", completed: false, description: "Connect to APIs using Ajax." },
            { id: 13, level: 1, parent: 3, title: "React State and Props", completed: false, description: "Manage state and props in React." },
            { id: 14, level: 1, parent: 3, title: "React Router", completed: false, description: "Navigate with React Router." },
            { id: 15, level: 1, parent: 4, title: "React Redux", completed: false, description: "Implement Redux in React applications." },
            { id: 16, level: 2, parent: 5, title: "SEO Friendly Markup", completed: false, description: "Optimize for search engines." },
            { id: 17, level: 2, parent: 5, title: "Microdata", completed: false, description: "Add microdata to your pages." },
            { id: 18, level: 2, parent: 6, title: "Custom Validation", completed: false, description: "Customize form validation." },
            { id: 19, level: 2, parent: 6, title: "Progressive Enhancements", completed: false, description: "Enhance user experience progressively." },
            { id: 20, level: 2, parent: 8, title: "Mobile First Design", completed: false, description: "Prioritize mobile-friendly design." },
        ],
    }];

    const lastCompleted = () => {
        const completedItems = sampleData[0].roadmap.filter(item => item.completed === true);
        return completedItems.slice(-3);
    };

    const firstRemaining = () => {
        const remaining = sampleData[0].roadmap.filter(item => item.completed === false);
        return remaining.slice(0, 3);
    };

    const completed = lastCompleted();
    const remaining = firstRemaining();

    const [visible, setVisible] = useState(false);
    const [text, setText] = useState("");
    const [stuff, setStuff] = useState("");
    const handler = async (texts: string) => {
        setText(texts);
        const result = await fetch(`/api/roadmap/normalchat?title=${text}`);
        const json = await result.json();
        // @ts-ignore
        setStuff(json);
        setVisible(true);
        return json;
    };

    const closeHandler = () => {
        setVisible(false);
    };
    const fetchRoadmap = async (e: any) => {
        // e.preventDefault();

        setShow(true);

        const result = await fetch(
            `https://nodejs-sms.saard00vfx.repl.co/api/handler?title=${desc}`
        );

        const json = await result.json();
        setData(json);
        return json;
    };
    const [modaldata, setModaldata] = useState<Info>();
    useEffect(() => {
        if (stuff) {
            // @ts-ignore
            const deez = stuff.message.choices[0].message.content;
            const bnruh = JSON.parse(deez);
            setModaldata(bnruh);
        }
    }, [stuff]);
    // console.log(video);
    // const roadmapdata = data?.message.choices[0].content.roadmap;

    const odd = "flex flex-col";
    const even = "flex flex-col-reverse -translate-y-6";
    
    const _odd = "mt-10";
    const _even = "mb-10";

    const oddT = "-mb-4 font-semibold"
    const evenT = "-mt-4 font-semibold"

    return (
        <Layout
            bgColor={'#121212'}
            icon='roadmap.svg'
            text='Roadmap'
            border='gray-500'
            children={(
                <div>
                    <div className="flex w-full gap-6 ">
                        <div
                            className="first w-1/2 bg-[#191919] flex items-center justify-between p-4 rounded-md"
                            style={{
                                border: "1px solid #585858"
                            }}
                        >
                            <div className="flex flex-col gap-1">
                                <span>Self Improvement Roadmap</span>
                                <span className="w-1/2" style={{
                                    borderBottom: "1px solid #585858"
                                }}></span>
                            </div>
                            <button
                                className="bg-[#474747] py-2 px-3 rounded-md"
                                style={{
                                    border: "1px solid #585858"
                                }}
                            >
                                Generate Now
                            </button>
                        </div>
                        <div
                            className="first w-1/2 bg-[#191919] flex items-center justify-between p-4 rounded-md"
                            style={{
                                border: "1px solid #585858"
                            }}
                        >
                            <div className="flex flex-col gap-1">
                                <span>Skill Improvement Roadmap</span>
                                <span className="w-1/2" style={{
                                    borderBottom: "1px solid #585858"
                                }}></span>
                            </div>
                            <button
                                className="bg-[#474747] py-2 px-3 rounded-md"
                                style={{
                                    border: "1px solid #585858"
                                }}
                            >
                                Generate Now
                            </button>
                        </div>
                    </div>

                    {/* road map data */}


                    {data && (<div className="flex items-center justify-center my-10 text-[#2CD3E1]">
                        <span>Haven't yet generated any -- plz chose category and continue!</span>
                    </div>)}
                    {!data && (
                        <div className="w-full mt-12">
                            <div
                                className="flex"
                            >
                                <div className="completed bg-gradient-to-r from-[#cccccc] to-[#121212] text-[#DDDDDD] w-1/2 flex items-center p-6 rounded ">
                                    {completed?.map((item, i) => (
                                        <div
                                            key={i}
                                            className={`${i % 2 === 0 ? even : odd}`}
                                        >
                                            <p className={`${i % 2 === 0 ? evenT : oddT}`}>{item.title}</p>
                                            <span
                                                className={`${i % 2 === 0 ? _even : _odd}`}
                                            >{item.description}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="remaining text-[#DDDDDD] w-1/2 flex items-center p-6 rounded ">
                                    {remaining?.map((item, i) => (
                                        <div key={i}
                                            className={`${i % 2 === 0 ? even : odd}`}
                                        >
                                            <p className="font-bold">{item.title}</p>
                                            <span>{item.description}</span>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    )}

                </div>)
            }
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
export default Home;
