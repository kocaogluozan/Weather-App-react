import React, { useState } from "react";

import { IoMdSearch } from "react-icons/io";

const SearchForm = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);

  const textChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    console.log(inputValue);

    //if input value is not empty:
    if (inputValue !== "") {
      props.onSetLocation(inputValue);
      props.onSetErrorMsg("");
    }
    //if input value empty:
    if (inputValue === "") {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }
    setInputValue("");
  };

  return (
    <form
      onSubmit={submitFormHandler}
      className="max-w-[450px] w-full bg-black/20 h-12 rounded-full 
    backdrop-blur-[32px] mb-8"
    >
      <div
        className="relative h-full flex items-center justify-between
    p-2 "
      >
        <input
          className={`${
            animate ? "animate-shake" : "animate - none"
          } flex-1 bg-transparent outline-none text-white
  placeholder:text-white text-[15px] font-light p-6 h-full`}
          type="text"
          placeholder="Search by city or country"
          onChange={textChangeHandler}
          value={inputValue}
        />
        <button
          className="bg-[#1ab8ed] hover:bg-[#15abdd] w-12 h-8 rounded-full 
    flex justify-center items-center transition"
        >
          <IoMdSearch className="text-2xl text-white" />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
