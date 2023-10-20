import React, { useState } from "react";
//import

interface MyData {
  // Define the properties you expect in the JSON response
  key: string;
  value: number;
}

const TestFieldInput = () => {
  const [inputText, setInputText] = useState("");

  const handleButtonClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("src/server/createBulletinPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: inputText }),
      });

      if (response.ok) {
        const data: MyData = (await response.json()) as MyData; // Specify the type
        console.log("Bulletin Post created:", data);
      } else {
        // Handle error
        console.error("Failed to create bulletin post");
      }
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
