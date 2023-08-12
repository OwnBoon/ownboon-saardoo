import {
  Button,
  Dropdown,
  Input,
} from "@nextui-org/react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Notes } from "../../typings";
import { useUser } from "@clerk/nextjs";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });

interface Props {
  notess: Notes;
}

const Notes = ({ notess }: Props) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [topic, setTopic] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e: any) => {
    // e.preventDefault();
    const mutations: Notes = {
      _type: "notes",
      note: text,
      topic: topic,
      email: user?.emailAddresses[0].emailAddress!,
    };

    const result = await fetch(`/api/addNotes`, {
      body: JSON.stringify(mutations),
      method: "POST",
    });

    const json = await result.json();
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
      <div className="border   bg-white space-y-5 overflow-y-scroll h-fit  w-full px-2 rounded-xl py-2">
        <div className="flex justify-center items-center">
          {notess?.topic.length == 0 ? (
            <div onClick={() => setShow(true)} className="cursor-pointer">
              Add Topic
            </div>
          ) : (
            null
          )}
        </div>
        <div className="flex justify-center">
          {show && (
            <div>
              <Input
                onChange={(e) => setTopic(e.target.value)}
                label="Topic"
                placeholder="Enter your topic"
              />
              <div>
                <Button
                  onPress={(e) => {
                    handleSubmit(e);
                  }}
                  className="mt-5"
                >
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="space-y-20 flex   flex-col items-center">
          {user ? (
            <div>

              <div>
                <div className="flex space-x-5 items-center justify-center">
                  <p >{notess.topic}</p>
                  <p onClick={() => setShow2(true)} className="text-2xl cursor-pointer font-semibold"> +</p>
                  {show2 ? (
                    <div>
                      <Input
                        onChange={(e) => setTopic(e.target.value)}
                        label="Topic"
                        placeholder="Enter your topic"
                      />
                      <div>
                        <Button
                          onPress={(e) => {
                            handleSubmit(e);
                          }}
                          className="mt-5"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </div>
                <ReactQuill
                  theme="snow"
                  className="h-36 w-full   scrollbar scrollbar-track-white scrollbar-thumb-blue-50"
                  value={text || notess.note}
                  onChange={setText}
                />
                {/* <TextArea notes={notess[0]?.note} text={text} setText={setText} /> */}
                <Button
                  onPress={() => {
                    notess?.topic.length < 1
                      ? handleSubmit
                      : handleSet(notess._id!, notess.topic);
                  }}
                  className="mt-5"
                >
                  Save
                </Button>
              </div>

            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Notes;