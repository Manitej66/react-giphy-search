import React from "react";
import { Gif } from "@giphy/react-components";

const Messages = ({ messages, setMessages }) => {
  return (
    <div className="w-5/6 lg:w-3/4 mx-auto mt-4 border border-gray-700 rounded-lg p-4">
      <h1 className="text-2xl text-gray-300 font-bold">Messages</h1>
      {/* loop through messages and display them */}
      {messages.map((message, index) => (
        <div
          key={index}
          className="bg-gray-800 flex items-center justify-between border border-gray-700 rounded-lg mt-4 p-2"
        >
          <div>
            {message.text && (
              <p className="pl-2 text-gray-200 ">{message.text}</p>
            )}
            {message.gif && (
              <Gif
                gif={message.gif}
                width={200}
                borderRadius={10}
                hideAttribution={true}
                noLink={true}
                className="w-64 max-h-32 mt-2"
              />
            )}
          </div>
          <button
            onClick={() => {
              let m = messages.filter((m, i) => i !== index);
              localStorage.setItem("messages", JSON.stringify(m));
              setMessages(m);
            }}
            className="py-1 px-2 border border-red-400 text-red-400 hover:bg-red-400 hover:text-white duration-500 lg:text-sm rounded-full"
          >
            delete
          </button>
        </div>
      ))}
      {messages.length === 0 && (
        <div className="bg-gray-800 flex items-center justify-between border border-gray-700 rounded-lg mt-4 p-2">
          <p className="pl-2 text-gray-300 lg:text-sm">No messages yet :/</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
