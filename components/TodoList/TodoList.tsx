import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { GoalBody } from '../../typings'
import { ReactSortable, Sortable, Store } from "react-sortablejs";
import Image from "next/image";
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

type Props = {
    todos: any[],
    user: any,
    setTodos: any
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const TodoList = ({ todos, user, setTodos }: Props) => {

    const [todoText, setTodoText] = useState("")

    const [showTaskInput, setShowTaskInput] = useState(false);
    const [tempTodo, setTemptodo] = useState<any>(null)

    const [showtask, setShowTask] = useState(false);

    const [value, onChange] = useState<Value>(new Date());

    const handleAddingTask = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setShowTaskInput(true)
    };

    const handleNewTaskChange = (e: any) => {
        console.log(e.target.value)
        setTodoText(e.target.value)
    }

    const addGoalData = async () => {
        try {
            const postInfo: GoalBody = {
                // @ts-ignore
                _type: "goals",
                title: todoText,
                progress: 0,
                username: user?.username!,
                completed: false,
                delete: false,
                todoIndex: todos.length
            };
            setTemptodo(postInfo)
            fetch(`/api/addGoalData`, {
                body: JSON.stringify(postInfo),
                method: "POST",
            }).then(async (res) => {
                const json = await res.json();
                console.log(json.message.results[0].document)
                const newTodo = json.message.results[0].document
                setTemptodo(null)
                setTodos([...todos, newTodo])
                toast.success('Successfully toasted!')
                // toast.custom((t) => (
                //   <div
                //     className={`${t.visible ? "animate-enter" : "animate-leave"
                //       } max-w-md w-full  bg-white shadow-lg rounded-lg pointer-events-auto flex ring-black ring-opacity-5`}
                //   >
                //     <div className="flex-1 w-0 p-4">
                //       <div className="flex items-start">
                //         <div className="flex-shrink-0 pt-0.5">
                //           <img
                //             className="h-10 w-10 rounded-full"
                //             src="https://ownboon-practice.vercel.app/_next/image?url=%2Flogo.png&w=48&q=75"
                //             alt=""
                //           />
                //         </div>
                //         <div className="ml-3 flex-1">
                //           <p className="text-[15px] font-medium text-gray-900">
                //             Todos Updated
                //           </p>
                //           <p className="mt-1 text-[15px] text-gray-500">
                //             Try refreshing the page to see it!
                //           </p>
                //         </div>
                //       </div>
                //       <div className="flex border-l border-gray-200">
                //         <button
                //           onClick={() => toast.dismiss(t.id)}
                //           className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-[15px] font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                //         >
                //           Close
                //         </button>
                //       </div>
                //     </div>
                //   </div>
                // ));
            });

            toast.custom((t) => (
                <div
                    className={`${t.visible ? "animate-enter" : "animate-leave"
                        } max-w-md w-full  bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src="https://ownboon-practice.vercel.app/_next/image?url=%2Flogo.png&w=48&q=75"
                                    alt=""
                                />
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-[15px] font-medium text-gray-900">
                                    Todos Updated
                                </p>
                                <p className="mt-1 text-[15px] text-gray-500">
                                    Try refreshing the page to see it!
                                </p>
                            </div>
                        </div>
                        <div className="flex border-l border-gray-200">
                            <button
                                onClick={() => toast.dismiss(t.id)}
                                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-[15px] font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            ));
        } catch (err) {
            console.error(err);
        }
    };

    const handlesubmit = (e: any) => {
        if (e.key == "Enter") {
            e.preventDefault();
            addGoalData();
            setShowTask(false);
            setTodoText("")
            setShowTaskInput(false)
        }
    };

    const addDeleted = async (id: string | undefined) => {
        try {
            const postInfo = {
                // @ts-ignore
                _id: id,
            };
            setTodos(todos.filter((t: any) => t._id != id))

            const result = await fetch(`/api/deleteGoals`, {
                body: JSON.stringify(postInfo),
                method: "POST",
            });
            const json = await result.json();
            console.log(json);
            toast.custom((t) => (
                <div
                    className={`${t.visible ? "animate-enter" : "animate-leave"
                        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src="https://ownboon-practice.vercel.app/_next/image?url=%2Flogo.png&w=48&q=75"
                                    alt=""
                                />
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-[15px] font-medium text-gray-900">
                                    U Deleted a todos
                                </p>
                                <p className="mt-1 text-[15px] text-gray-500">
                                    Try refreshing the page to see it!
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-gray-200">
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-[15px] font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            ));
            return json;
        } catch (err) {
            console.error(err);
        }
    };

    const [isOpen, setIsOpen] = useState(false);


    const dropdownRef = useRef<any>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: any) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const deleteAllTodos = () => {
        setIsOpen(false)
        if (user) {
            fetch(`/api/deleteAllGoals`, {
                body: JSON.stringify(user?.username),
                method: "POST",
            }).then(async (res) => {
                setTodos([])
            })
        }
    }

    const deleteAllCompletedTodos = () => {
        setIsOpen(false)
        if (user) {
            setTodos(todos.filter((t) => t.completed != true))

            fetch(`/api/deleteCompletedGoals`, {
                body: JSON.stringify(user?.username),
                method: "POST",
            }).then(async (res) => {
                console.log("deleted")
            })
        }
    }

    const changeTodoState = (id: any, e: any) => {
        if (user) {
            setTodos(todos.map((t) => {
                if (t._id == id) {
                    return { ...t, completed: e.target.checked }
                } else {
                    return t
                }
            }))
            fetch(`/api/changeTodoState`, {
                body: JSON.stringify({ _id: id, state: e.target.checked }),
                method: "POST",
            }).then(async (res) => {
                console.log("updated")
            })
        }
    }

    const color = "#2CD3E180";
    const border = "1px solid #2CD3E180"

    const handleSort = (newState: any[], sortable: Sortable | null, store: Store) => {
        console.log(newState)
        setTodos(newState)
        newState.forEach((s, i) => {
            fetch('/api/sortGoals', {
                body: JSON.stringify({ _id: s._id, newIndex: i }),
                method: "POST",
            }).then(async (res) => {
                console.log("updated")
            })
        })
    }

    return (
        <div
            style={{
                background:
                    "linear-gradient(0deg, rgba(61,61,61,1)   0%, transparent 100%)",
            }}
            className="flex flex-col gap-2 relative w-full min-h-[18vw] h-fit shrink-0  px-12 py-3  rounded-lg"
        >
            <div className="w-full  flex flex-row gap-1 relative items-center justify-between">
                <div className='w-10 h-10'></div>
                <div className="whitespace-nowrap text-[23px] font-sans text-white w-fit flex gap-2">
                    To Do List
                    <img
                        src="https://file.rendit.io/n/JmNhUvsva3wm0ElTUHoF.svg"
                        className="min-h-0 min-w-0 relative w-4 shrink-0"
                    />
                </div>
                <div className="relative inline-block text-left" ref={dropdownRef}>
                    <button
                        onClick={toggleDropdown}
                        type="button"

                    >
                        <Image
                            src="more-options.svg"
                            alt={""}
                            width={40}
                            height={40}
                            className="p-2 fade transition-all  rounded  drag-handle"
                        />
                    </button>
                    {isOpen && (
                        <div className="absolute z-50 w-fit left-[30px] top-0 mt-2 origin-top-right bg-slate-800 divide-y rounded-md shadow-lg">
                            <div className="py-1">
                                <a
                                    href="#"
                                    className="px-4 py-2 text-sm whitespace-nowrap hover:bg-slate-700  flex w-full"
                                    onClick={deleteAllTodos}
                                >
                                    Delete all Tasks
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm hover:bg-slate-700 whitespace-nowrap"
                                    onClick={deleteAllCompletedTodos}
                                >
                                    Delete Completed Task
                                </a>
                            </div>
                        </div>
                    )}
                </div>

            </div>
            <div className="border-solid border-gray-700 self-center mb-3 relative w-40 h-px shrink-0 " />
            {!showTaskInput && <div className="overflow-auto">

                <ReactSortable handle='.drag-handle' list={todos} setList={handleSort}>
                    {todos.map((t) => (
                        <div key={t._id} className="flex flex-row mb-1 gap-4 relative items-center rounded-[5px] w-full hover:border hover:border-cyan-400 hover:border-opacity-30 ">
                            <Image
                                src="draghandle.svg"
                                alt={""}
                                width={30}
                                height={30}
                                className="p-2 fade transition-all  rounded  drag-handle"
                            />
                            <input id="default-checkbox" type="checkbox" value="" checked={t.completed} onChange={(e) => changeTodoState(t._id, e)} className="border-solid border-gray-700 bg-transparent mb-px relative w-6 shrink-0 h-6 border-2 rounded checked:bg-[#2CD3E1] focus:ring-transparent focus:border-none" />
                            <div className="whitespace-nowrap  font-sans text-white relative">
                                {t.title}
                            </div>
                            <Image
                                src="delete-icon.svg"
                                alt={""}
                                width={30}
                                height={30}
                                className="p-2 fade transition-all  rounded  drag-handle ml-auto"
                                onClick={() => addDeleted(t._id)}
                            />
                            <Image
                                src="calendar.svg"
                                alt={""}
                                width={30}
                                height={30}
                                className="p-2 fade transition-all  rounded  drag-handle"
                            />
                        </div>
                    ))}
                </ReactSortable>

                {tempTodo && (
                    <div className="flex flex-row mb-1 gap-4 relative items-center rounded-[5px] w-full hover:border hover:border-cyan-400 hover:border-opacity-30 opactity-50">
                        <Image
                            src="draghandle.svg"
                            alt={""}
                            width={30}
                            height={30}
                            className="p-2 fade transition-all  rounded  drag-handle"
                        />
                        <div className="border-solid border-gray-700 mb-px relative w-6 shrink-0 h-6 border-2 rounded" />
                        <div className="whitespace-nowrap  font-sans text-white relative">
                            {tempTodo.title}
                        </div>
                        <Image
                            src="delete-icon.svg"
                            alt={""}
                            width={30}
                            height={30}
                            className="p-2 fade transition-all  rounded  drag-handle ml-auto"
                        />
                        <Image
                            src="calendar.svg"
                            alt={""}
                            width={30}
                            height={30}
                            className="p-2 fade transition-all  rounded  drag-handle"
                        />
                    </div>
                )}
            </div>}


            {showTaskInput && (
                <div className="flex flex-col mb-3 gap-4 relative">
                    <div onClick={() => setShowTaskInput(false)}>Back</div>
                    <input className="whitespace-nowrap w-40 rounded bg-transparent border border-cyan-400 border-opacity-30" id="username" type="text" placeholder="Name of the task" onChange={(e) => handleNewTaskChange(e)} onKeyUp={handlesubmit} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker sx={{
                            svg: { color },
                            input: { color: "white" },
                            label: { color },
                            border: { border },
                            ":focus": {
                                border: { border },
                                borderColor: { color: 'transparent' },
                            }
                        }} />
                        <TimePicker sx={{
                            svg: { color },
                            input: { color: "white" },
                            label: { color },
                            border: { border },
                            ":focus": {
                                border: { border },
                                borderColor: { color: 'transparent' },
                            }
                        }} />
                        <TimePicker views={['hours', 'minutes']} ampm={false} format="hh:mm" sx={{
                            svg: { color },
                            input: { color: "white" },
                            label: { color },
                            border: { border },
                            ":focus": {
                                border: { border },
                                borderColor: { color: 'transparent' },
                            }
                        }} />
                    </LocalizationProvider>
                    <div className='flex justify-between'>
                        <div>Delete Task</div>
                        <div>Delete from Calendar</div>
                    </div>
                </div>
            )}
            {!showTaskInput && (
                <div onClick={handleAddingTask} className=" border-gray-500 bg-[#38383A] self-center flex flex-row justify-center gap-1 relative h-10 shrink-0 items-center px-[10vw] py-2 border rounded">
                    <img
                        src="https://file.rendit.io/n/xqvQ4cl5AoJGfD7albqE.png"
                        className="min-h-0 min-w-0 relative w-4 shrink-0"
                    />
                    <button className="whitespace-nowrap text-[15px] font-sans text-[#dddddd] relative" >
                        Add Task
                    </button>
                </div>
            )}
        </div>
    )
}

export default TodoList