import React from "react";

import { MoonIcon } from "@heroicons/react/solid";

const ThemeIcon = (props) => {
  return (
    <button className="rounded-lg border-1 border-neutral-400 p-2 absolute right-8 xl:right-32 shadow-lg" onClick={props.handleClick}>
      {props.text}
    </button>
  );
};

export default ThemeIcon;