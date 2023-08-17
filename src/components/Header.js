import React from "react";
import Search from "./Search";
import ThemeIcon from "./ThemeIcon";

const Header = ({ name, signOut }) => {
  return (
    <>
      <div className="xl:px-32">
        <h1 className="text-5xl">{name}</h1>
        <Search />
      </div>
      <div className="pr-64">
        <ThemeIcon handleClick={signOut} text="Sign Out"/>
      </div>
    </>
  );
};

export default Header;