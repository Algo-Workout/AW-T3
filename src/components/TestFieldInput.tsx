import { NextResponse } from "next/server";
import React, { useState } from "react";

interface MyData {
  key: string;
  value: number;
}

const TestFieldInput = () => {
  const [inputText, setInputText] = useState("");
  const [userID, setuserID] = useState("clnz8jzpg00067z3yx42l0w60");

  const handleButtonClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID: userID, message: inputText }),
      });
      const data: string = (await res.json()) as string; // Specify the type
      console.log("Bulletin Post created:", data);
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <>
      <div className="m-10 h-48 flex-col items-center justify-center">
        <h1>Add Description:</h1>
        <form onSubmit={handleButtonClick}>
          <textarea
            className="h-32 w-full rounded-md border p-2"
            placeholder="Enter your text..."
            value={inputText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setInputText(e.target.value)
            }
          ></textarea>

          <button
            className="rounder-r bg-blue-600 p-2 text-white shadow duration-300 hover:bg-blue-700"
            type="submit"
          >
            Submit›
          </button>
        </form>
      </div>
    </>
  );
};

export default TestFieldInput;
