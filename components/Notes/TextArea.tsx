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
    notes: string
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
  }
  
  const TextArea = ({ notes, text, setText }: Props) => {
    (
        <ReactQuill
          theme="snow"
                    className="h-36 w-full   scrollbar scrollbar-track-white scrollbar-thumb-blue-50"
                    value={text || notes}
                    onChange={setText}
                  />
    );
  };
  
  export default TextArea;