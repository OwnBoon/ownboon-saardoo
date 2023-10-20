import React, { useState } from "react";
import toast from "react-hot-toast";
import { Notes } from "../../typings";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import Dialog from "../../components/ChapterPopup/ChapterPopup";
import {
  ArrowDown,
  ArrowUp,
  ArrowUp01Icon,
  CrossIcon,
  DeleteIcon,
  MenuIcon,
  PlusCircle,
  XIcon,
} from "lucide-react";
import { FaDumpster, FaHamburger } from "react-icons/fa";
import Draggable, { DraggableCore } from "react-draggable";
import { useRouter } from "next/router";
import { Tooltip } from "@nextui-org/react";


function CategoryDropdown({ categories, handleCategoryChange }: any) {
  return (
    <select
      className="btn  bg-white bg-opacity-30 text-neutral-200 ring-0 ring-transparent outline-none focus:ring-0 focus:outline-none focus:border-white/30  text-base rounded border border-white border-opacity-50 backdrop-blur-xl"
      onChange={handleCategoryChange}
    >
      {Array.from(categories).map((category: any, index) => (
        <option
          className="   bg-transparent text-neutral-800 pointer-events-none text-base rounded border border-white border-opacity-50 backdrop-blur-xl"
          key={index}
          value={category}
        >
          {category}
        </option>
      ))}
    </select>
  );
}

const LofiNotes = ({ notes, user, setNotes }: any) => {
  const [notetext, setNoteText] = useState("");
  const [topictext, setTopicText] = useState("");
  const [categorytext, setCategoryText] = useState("");
  const [tempNote, setTempNote] = useState<any>(null);

  const [showTaskInput, setShowTaskInput] = useState(false);
  const handleAddingTask = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setShowTaskInput(true);
    setShowModal(false);
    setNotesshow(false);
  };
  const router = useRouter();

  const [note, setNote] = useState({ text: "", topic: "", note: "", _id: "" });
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event: any) => {
    setNotesshow(true);
    setSelectedCategory(event.target.value);
  };

  const notess = notes.filter(
    (note: any) => note.email === user?.emailAddresses[0].emailAddress
  );

  let categories = new Set();
  notess.forEach((note: any) => {
    categories.add(note.category);
  });

  const handleNoteChange = async (id: string) => {
    const mutations = {
      _id: id,
      note: notetext,
    };

    const result = await fetch("/api/setNotes", {
      body: JSON.stringify(mutations),
      method: "POST",
    });
    const json = result.json();
    setShowModal(false);
    router.replace("/lofi");
    return json;
  };

  const addDeleted = async (id: string | undefined) => {
    try {
      const noteInfo = {
        // @ts-ignore
        _id: id,
      };
      //@ts-ignore
      setNotes(notes.filter((t: any) => t._id != id));

      fetch(`/api/deleteNote`, {
        body: JSON.stringify(noteInfo),
        method: "POST",
      }).then(async (res) => {
        const json = await res.json();
        router.replace("/lofi");
        setShowModal(false);
        return json;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: any) => {
    // e.preventDefault();
    const mutations: Notes = {
      _type: "notes",
      note: notetext,
      topic: topictext,
      category: categorytext,
      email: user?.emailAddresses[0].emailAddress!,
    };

    setTempNote(mutations);

    fetch(`/api/addNotes`, {
      body: JSON.stringify(mutations),
      method: "POST",
    }).then(async (res) => {
      const json = await res.json();
      const router = useRouter();
      
      const newNote = json.message.results[0].document;
      setNotes([...notes, newNote]);
      setTempNote(null);
      //@ts-ignore
      router.refresh();
    });
  };

  const filteredNotes = notess.filter(
    (note: any) =>
      selectedCategory == null || note.category === selectedCategory
  );

  console.log(filteredNotes);

  const [showModal, setShowModal] = React.useState(false);
  const [notesshow, setNotesshow] = React.useState(true);
  const [selectedNote, setSelectedNote] = useState("");
  const [selectedNoteData, setSelectedNoteData] = useState("");

  const [showAddNotesModal, setShowAddNotesModal] = useState(false);
  const handleAddingNewNote = () => {
    setShowAddNotesModal(true);
  };

  return (
    <div className="flex flex-col justify-center   items-center gap-4">
      <div className="flex justify-center    gap-1 relative items-center">
        <div className="flex items-center gap-2  col-span-2 justify-end">
          <Draggable cancel=".btn">
            <div className="flex items-center justify-between gap-2 select-none">
              <MenuIcon className="text-neutral-200/50 cursor-pointer" />
              <CategoryDropdown
                categories={categories}
                handleCategoryChange={handleCategoryChange}
              />
              {!showTaskInput && (
                <div className="flex justify-center p-2 ">
                  <div onClick={handleAddingTask} className="btn">
                    <PlusCircle className=" cursor-pointer bg-clip-text bg-opacity-30 bg-white text-white " />
                  </div>
                </div>
              )}
              {showTaskInput && (
                <div className="flex justify-center p-2 ">
                  <div onClick={() => setShowTaskInput(false)} className="btn">
                    <ArrowUp className=" cursor-pointer bg-clip-text bg-opacity-30 bg-white text-white " />
                  </div>
                </div>
              )}
            </div>
          </Draggable>
        </div>
      </div>

      <div className=" justify-center items-center w-full h-full gap-3">
        {filteredNotes.map((note: any) => (
          <>
            <Dialog isOpen={showModal} onClose={setShowModal}>
              <Draggable cancel=".btn">
                <div className="btn rounded-md scale-150 md:scale-100  bg-white bg-opacity-30  border border-white border-opacity-50 backdrop-blur-xl p-2 w-full h-full  md:p-8">
                  <XIcon
                    onClick={() => setShowModal(false)}
                    className="flex justify-end right-2 text-white/30 text-sm font-light cursor-pointer absolute top-2"
                  />
                  <div className=" md:h-[43px] flex gap-6 items-center text-white md:text-3xl  text-sm font-semibold">
                    {selectedNote}
                    <button
                      className="text-white flex btn"
                      onClick={(e) => {
                        addDeleted(note._id);
                      }}
                    >
                      <Tooltip content="delete the note">
                        <DeleteIcon className="text-sm text-red-200" />
                      </Tooltip>
                    </button>
                  </div>
                  <div className="md:w-44 h-[0px] w-full border border-neutral-400"></div>
                  <div className="btn scale-75 md:scale-100 -mb-5 w-full h-full text-sm">
                    <ReactQuill
                      theme="snow"
                      className="h-52  md:mt-5 mt-0 !text-white  !border-none !outline-none  !text-xs  scrollbar scrollbar-track-white scrollbar-thumb-blue-50"
                      value={notetext || selectedNoteData}
                      onChange={(e) => {
                        setNoteText(e);
                      }}
                    />
                    <div
                      onClick={(e) => handleNoteChange(note._id!)}
                      className="bg-opacity-30  w-fit mt-16 rounded-lg bg-white flex p-2 justify-center items-center"
                    >
                      <button className=" text-sm select-none  text-[#dddddd] relative px-5">
                        Update Note
                      </button>
                    </div>
                  </div>
                </div>
              </Draggable>
            </Dialog>
            {notesshow && (
              <Draggable cancel=".btn">
                <div
                  onClick={() => {
                    setShowModal(true);
                    setSelectedNote(note.topic);
                    setSelectedNoteData(note.note);
                  }}
                  className="btn bg-white bg-opacity-30 rounded-md border w-64 h-56 overflow-y-scroll border-white border-opacity-50 backdrop-blur-xl p-4 space-y-5  text-neutral-200"
                >
                  <div>
                    <h1 className="border-b w-fit">{note.topic}</h1>
                  </div>
                  <div>
                    <div dangerouslySetInnerHTML={{ __html: note.note }} />
                  </div>
                </div>
              </Draggable>
            )}
          </>
        ))}
      </div>

      {showTaskInput && (
        <div>
          {" "}
          <Draggable cancel=".btn">
            <div className="btn bg-white bg-opacity-30   z-50  border border-white border-opacity-50 backdrop-blur-xl space-y-5 overflow-y-scroll h-fit   w-full px-2 rounded-xl py-2">
              <div className="flex justify-center items-center">
                <div className="flex flex-col gap-5">
                  <input
                    className="bg-transparent border-b flex text-white placeholder-neutral-400 border-white/40 justify-center  outline-none "
                    placeholder="Category"
                    onChange={(e) => setCategoryText(e.target.value)}
                  />
                  <input
                    className="bg-transparent border-b border-white/40 placeholder-neutral-400 flex justify-center  outline-none "
                    placeholder="Topic"
                    onChange={(e) => setTopicText(e.target.value)}
                  />
                </div>
              </div>
              <div className="btn space-y-20 flex   flex-col items-center">
                {user ? (
                  <div>
                    <div>
                      <div className="flex space-x-5 items-center justify-center"></div>
                      <ReactQuill
                        theme="snow"
                        className="h-36 w-full !text-white  scrollbar scrollbar-track-white scrollbar-thumb-blue-50"
                        value={notetext || note?.note}
                        onChange={setNoteText}
                      />
                      {/* <TextArea notes={notess[0]?.note} text={text} setText={setText} /> */}
                      <button
                        onClick={(e) => {
                          handleSubmit(e);
                          // close();
                          setShowTaskInput(false);
                        }}
                        className="btn mt-16 px-5 border py-2 text-neutral-300 rounded-xl"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </Draggable>
        </div>
      )}
    </div>
  );
};

export default LofiNotes;
