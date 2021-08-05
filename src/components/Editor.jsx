import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import { Gif, Grid } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";

// In prod use .env to load keys
const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);

const Editor = () => {
  const [text, setText] = useState("");
  const [gif, setGif] = useState("");
  const [search, setSearch] = useState("");
  const [showGif, setShowGif] = useState(false);
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem("messages")) || []
  );

  const fetchGifs = (offset) =>
    gf.search(search, {
      sort: "relevant",
      lang: "es",
      limit: 20,
      offset,
    });

  const submit = () => {
    if (text.length > 0 || gif) {
      messages.push({
        text: text,
        gif: gif,
      });
      localStorage.setItem("messages", JSON.stringify(messages));
      setMessages(messages);
      setText("");
      setGif("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submit();
    }
  };

  return (
    <div className="pb-4">
      <div className="w-5/6 lg:w-3/4 mx-auto mt-8 p-4 border border-gray-700 rounded-lg">
        <input
          type="text"
          placeholder="Type anything here"
          className="p-2 bg-gray-800 lg:text-sm shadow hover:bg-gray-900 outline-none duration-500 w-full rounded-lg border border-gray-700"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {gif && (
          <Gif
            className="mt-2 w-64 max-h-32"
            gif={gif}
            noLink={true}
            hideAttribution={true}
          />
        )}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowGif((p) => !p)}
            className="mt-4 py-1 px-2 lg:text-sm shadow bg-gray-800 hover:bg-gray-900 duration-500 border border-gray-700 text-gray-400 rounded-full"
          >
            {showGif ? "❌ GIF" : "➕ GIF"}
          </button>
          <button
            onClick={submit}
            className="mt-4 py-2 px-4 lg:text-sm bg-indigo-500 hover:bg-indigo-700 duration-500 text-gray-200 rounded-full"
          >
            post
          </button>
        </div>
        {showGif && (
          <div className="mt-2 border border-gray-700 p-4 rounded-lg">
            <input
              type="text"
              className="py-2 border border-gray-700 lg:text-sm focus:outline-none px-4 rounded-full bg-gray-800 w-full"
              placeholder="Search GIFs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <div className="duration-500 overflow-hidden mt-4 border rounded-lg border-gray-700 overflow-y-auto">
                <Grid
                  width={1000}
                  noLink={true}
                  hideAttribution={true}
                  borderRadius={10}
                  columns={7}
                  className="p-4 h-64 w-full"
                  layoutType="responsive"
                  fetchGifs={fetchGifs}
                  key={search}
                  onGifClick={(e) => {
                    setGif(e);
                    setShowGif(false);
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <Messages messages={messages} setMessages={setMessages} />
    </div>
  );
};

export default Editor;
