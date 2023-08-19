import React, { MouseEventHandler } from "react";
import { Text, Button, Grid, Row } from "@nextui-org/react";

interface Props {
  setGoal: MouseEventHandler<HTMLButtonElement>;
}

export const Menu = ({ setGoal }: Props) => {
  return (
    <div className="flex flex-col items-center gap-5 justify-center">
      <Text className="!text-white" b>
        Confirm
      </Text>
      <div className="flex gap-5">
        <Text className="!text-white">Click to know more</Text>

        <button onClick={setGoal}>Set as Current Goal</button>
      </div>
    </div>
  );
};
