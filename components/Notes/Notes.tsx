import { Button, Dropdown, Input } from "@nextui-org/react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Notes } from "../../typings";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const Notes = ({ setNotes, setDummyNote, notes, close, categories }: any) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const router = useRouter();
  const [note, setNote] = useState({ text: "", topic: "", note: "", _id: "" });

  const handleSubmit = async (e: any) => {
    // e.preventDefault();
    const mutations: Notes = {
      _type: "notes",
      note: text,
      topic: topic,
      category: category,
      email: user?.emailAddresses[0].emailAddress!,
    };

    setDummyNote(mutations);

    const result = await fetch(`/api/addNotes`, {
      body: JSON.stringify(mutations),
      method: "POST",
    });

    const json = await result.json();
    setNotes([...notes, json]);
    router.replace(router.pathname);
    setDummyNote(null);
    return json;
  };
  const handleSet = async (id: string, topic: string) => {
    // e.preventDefault();
    const mutations = {
      note: text,
      _id: id,
      topic: topic,
    };

    const result = await fetch(`/api/setNotes`, {
      body: JSON.stringify(mutations),
      method: "POST",
    });

    const json = await result.json();
    return json;
  };
  return (
    <div>
      {" "}
      <div className="border border-white/30 overflow-hidden bg-[#212121] space-y-5  sm:h-fit h-84 py-4 w-fit  px-2  sm:w-full sm:px-4 rounded-xl sm:py-4">
        <div className="flex justify-center items-center w-min">
          <div className=" ml-3 flex flex-col gap-5 ">
            <input
              className="bg-transparent border-b flex border-white/40 justify-center  outline-none "
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              className="bg-transparent border-b border-white/40 flex justify-center  outline-none "
              placeholder="Topic"
              onChange={(e) => setTopic(e.target.value)}
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
                  className=" md:h-36 sm:h-fit  w-fit !border !border-white/10   scrollbar scrollbar-track-white scrollbar-thumb-blue-50"
                  value={text || note?.note}
                  onChange={setText}
                />
                {/* <TextArea notes={notess[0]?.note} text={text} setText={setText} /> */}
                <div
                  onClick={(e) => {
                    handleSubmit(e);
                    close();
                  }}
                  className="bg-opacity-30  w-fit mt-1 mb-1 rounded-lg active:scale-105 bg-transparent flex pl-2 justify-center items-center"
                >
                  <Button size='sm' color='primary'auto shadow css={{padding:'$5',position:'relative'}}>
                    Update Note
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Notes;
