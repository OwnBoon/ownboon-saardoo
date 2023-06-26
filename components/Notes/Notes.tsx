import { useUser } from "@clerk/nextjs";
import React, { MouseEventHandler } from "react";
import ReactQuill from "react-quill";
import { Notes, User } from "../../typings";

interface Props {
  handleSubmit: MouseEventHandler<HTMLDivElement>;
  text: string;
  match: Notes[];
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const Notes = ({ handleSubmit, text, match, setText }: Props) => {
  const { isLoaded, isSignedIn, user } = useUser();
  return (
    <div className=" flex flex-col gap-5">
      <div
        onClick={handleSubmit}
        className="bg-black/5 w-fit p-2 mt-3  rounded-lg cursor-pointer text-sm "
      >
        Save
      </div>
      <div className=" overflow-y-scroll    h-full bg-white/80 ">
        {user ? (
          <ReactQuill
            theme="snow"
            className="h-56   scrollbar scrollbar-track-white scrollbar-thumb-blue-50"
            value={text || match[0]?.note}
            onChange={setText}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Notes;
