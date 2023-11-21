import React, { useState, type Dispatch, type SetStateAction } from "react";
//import

interface MyData {
  key: string;
  value: number;
}

interface TestFieldInputProps {
  getPosts: () => void; // Specify the type of getPosts function
  submitForm: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  inputText: string;
  setInputText: Dispatch<SetStateAction<string>>;
}

const TestFieldInput: React.FC<TestFieldInputProps> = ({
  getPosts,
  submitForm,
  inputText,
  setInputText,
}) => {
  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputText(inputText);
    await submitForm(e);
    setInputText("");
  };

  return (
    <>
      <div className="m-10 h-48 flex-col items-center justify-center">
        <h1 className="text-white">Add bulletin post:</h1>
        <form onSubmit={(e) => handleClick(e)}>
          <textarea
            className="h-32 w-full rounded-md border p-2"
            placeholder="Enter your text..."
            value={inputText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setInputText(e.target.value)
            }
          ></textarea>

          <button className="Button violet" type="submit">
            Submit›
          </button>
        </form>
      </div>
    </>
  );
};

export default TestFieldInput;
