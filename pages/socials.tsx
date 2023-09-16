import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import ComingSoonCard from "../components/ComingSoonCard";

const socials = () => {
  const [desc, setDesc] = useState("");
  console.log(desc);
  return (
    <Layout
      hasBg={false}
      bgColor={"#121212"}
      icon="socials.svg"
      text="Socials"
      border="gray-500"
      children={<ComingSoonCard />}
    />
  );
};

export default socials;
