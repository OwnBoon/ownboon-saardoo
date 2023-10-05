import React,{ useState } from "react";
import toast from "react-hot-toast";
import { Notes } from "../../typings";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import Dialog from "../../components/ChapterPopup/ChapterPopup";

function CategoryDropdown({ categories, handleCategoryChange }: any) {
    return (
      <select
        className="bg-transparent outline-none border-none ring-0 divide-x-0 select-none"
        onChange={handleCategoryChange}
      >
        {Array.from(categories).map((category: any, index) => (
          <option
            className="bg-transparent text-black"
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
  };

  const [note, setNote] = useState({ text: "", topic: "", note: "", _id: "" });
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  const notess = notes.filter(
    (note:any) => note.email === user?.emailAddresses[0].emailAddress
  );

  let categories = new Set();
  notess.forEach((note:any) => {
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

      const result = await fetch(`/api/deleteNote`, {
        body: JSON.stringify(noteInfo),
        method: "POST",
      });
      const json = await result.json();
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
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
        const newNote = json.message.results[0].document;
        setNotes([...notes, newNote]);
        setTempNote(null);

        toast.success("Successfully toasted!");
        toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
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
    })

  };


  const filteredNotes = notess.filter(
    (note:any) => selectedCategory == null || note.category === selectedCategory
  );

  console.log(filteredNotes)

  const [showModal, setShowModal] = React.useState(false);
  const [selectedNote, setSelectedNote] = useState("");
  const [selectedNoteData, setSelectedNoteData] = useState("");


  const [showAddNotesModal, setShowAddNotesModal] = useState(false);
  const handleAddingNewNote = () => {
    setShowAddNotesModal(true);
  };

  return (
    <>
            <div className="flex justify-center w-full  gap-1 relative items-center">
              <div className="flex items-center gap-2 col-span-2 justify-end w-full">
                <div className="w-full"></div>
                <div className="flex justify-between w-full">
                  <CategoryDropdown
                    categories={categories}
                    handleCategoryChange={handleCategoryChange}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center w-full h-full gap-3">
              {filteredNotes.map((note:any) => (
                <>
                  <Dialog isOpen={showModal} onClose={setShowModal}>
                    <div className="rounded-xl scale-150 md:scale-100 bg-[#101010] p-2 w-full h-full  md:p-16">
                      <div className=" md:h-[43px] text-white md:text-3xl  text-sm font-semibold">
                        {selectedNote}
                      </div>
                      <div className="h-4 w-10">
                        <button className="text-white" onClick={(e) => {
                           addDeleted(note._id)
                      }}>delete</button>
                      </div>
                      <div className="md:w-44 h-[0px] w-full border border-neutral-400"></div>
                      <div className="scale-75 md:scale-100 w-full h-full text-sm">
                        <ReactQuill
                          theme="snow"
                          className="h-64 md:mt-5 mt-0  !border-none !outline-none  !text-xs  scrollbar scrollbar-track-white scrollbar-thumb-blue-50"
                          value={notetext || selectedNoteData}
                          onChange={(e) => {
                            setNoteText(e);
                            handleNoteChange(note._id!);
                          }}
                        />
                      </div>
                    </div>
                  </Dialog>
                  <div
                    onClick={() => {
                      setShowModal(true);
                      console.log("note.topic", note.topic);
                      setSelectedNote(note.topic);
                      setSelectedNoteData(note.note);
                    }}
                    className="bg-[#212121] p-4 space-y-5 w-full rounded-lg"
                  >
                    <div>
                      <h1 className="border-b w-fit">{note.topic}</h1>
                    </div>
                    <div>
                      <div dangerouslySetInnerHTML={{ __html: note.note }} />
                    </div>
                  </div>
                </>
              ))}
            </div>


      {showTaskInput && (
        <div>
          {" "}
          <div className="border border-white/50  bg-[#212121] space-y-5 overflow-y-scroll h-fit   w-full px-2 rounded-xl py-2">
            <div className="flex justify-center items-center">
              <div className="flex flex-col gap-5">
                <input
                  className="bg-transparent border-b border-white/40 flex justify-center  outline-none "
                  placeholder="add a nice topic"
                  defaultValue="Topic "
                  onChange={(e) => setTopicText(e.target.value)}
                />
                <input
                  className="bg-transparent border-b flex border-white/40 justify-center  outline-none "
                  placeholder="add a category"
                  defaultValue="Category "
                  onChange={(e) => setCategoryText(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-20 flex   flex-col items-center">
              {user ? (
                <div>
                  <div>
                    <div className="flex space-x-5 items-center justify-center"></div>
                    <ReactQuill
                      theme="snow"
                      className="h-36 w-full   scrollbar scrollbar-track-white scrollbar-thumb-blue-50"
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
                      className="mt-16 px-5 border py-2 rounded-xl"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {!showTaskInput && (
        <div className="flex justify-center p-2 ">
          <div
            onClick={handleAddingTask}
            className="bg-opacity-30 rounded-sm w-fit bg-white flex p-2 justify-center items-center"
          >
            <button className=" text-sm  text-[#dddddd] relative px-5">
              Add Notes
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LofiNotes;
