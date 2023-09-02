import React, { useEffect, useState } from "react";
import Main from "./Main";

const ColourSearcher = () => {
  const [colours, setColours] = useState([]);
  const [inputData, setInputData] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [fetchedResult, setFetchedResult] = useState(false);

  useEffect(() => {
    getColours();
  }, []);

  const getColours = async () => {
    try {
      const data = await fetch(
        "https://raw.githubusercontent.com/NishantChandla/color-test-resources/main/xkcd-colors.json"
      );
      const json = await data.json();
      setColours(json.colors);
      setFiltered(json.colors);
      setFetchedResult(false);
    } catch (error) {
      setFetchedResult(true);
    }
  };

  const hexToRGB = (hex) => {
    const hexValue = hex.slice(1);
    const rgbHex = hexValue.match(/.{1,2}/g);
    const result = {
      r: parseInt(rgbHex[0], 16),
      g: parseInt(rgbHex[1], 16),
      b: parseInt(rgbHex[2], 16),
    };
    return result;
  };
  const calculateColourDifference = (color1, color2) => {
    const rgb1 = hexToRGB(color1);
    const rgb2 = hexToRGB(color2);
    return Math.sqrt(
      Math.pow(rgb2.r - rgb1.r, 2) +
        Math.pow(rgb2.g - rgb1.g, 2) +
        Math.pow(rgb2.b - rgb1.b, 2)
    );
  };

  const calculateColourDifferenceForRGB = (color1, color2) => {
    const extract = color1.match(/\d+/g);
    const result = {
      r: extract[0],
      g: extract[1],
      b: extract[2],
    };
    const rgb1 = result;
    const rgb2 = hexToRGB(color2);
    return Math.sqrt(
      Math.pow(rgb2.r - rgb1.r, 2) +
        Math.pow(rgb2.g - rgb1.g, 2) +
        Math.pow(rgb2.b - rgb1.b, 2)
    );
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (inputData.match(/^#([A-Fa-f0-9]{6})$/)) {
        const filteredColours = colours
          .sort((colorA, colorB) => {
            const diffA = calculateColourDifference(inputData, colorA.hex);
            const diffB = calculateColourDifference(inputData, colorB.hex);
            return diffA - diffB;
          })
          .slice(0, 100);
        setFiltered(filteredColours);
        setInputData("");
      } else if (
        inputData.match(/^rgb\(\s*(?:\d{1,3}\s*,\s*){2}\d{1,3}\s*\)$/)
      ) {
        const filteredColours = colours
          .sort((colorA, colorB) => {
            const diffA = calculateColourDifferenceForRGB(
              inputData,
              colorA.hex
            );
            const diffB = calculateColourDifferenceForRGB(
              inputData,
              colorB.hex
            );
            return diffA - diffB;
          })
          .slice(0, 100);
        setFiltered(filteredColours);
        setInputData("");
      } else {
        alert("Colour is invalid");
        setInputData("");
      }
    }
    //
  };

  return (
    <div>
      {fetchedResult ? (
        <div className="m-4 my-6 text-center">
          {" "}
          <h2 className="text-3xl font-semibold">Unable to Fetch Colours</h2>
          <button className="bg-red-500 p-2 rounded mt-2 " onClick={getColours}>
            Retry
          </button>
        </div>
      ) : (
        <div className="m-4 my-6">
          <div className="flex">
            <h2 className="text-2xl font-semibold mb-3">Colour Searcher</h2>
            <button
              className="mb-3 ml-6 bg-slate-700 text-white rounded-sm p-2"
              onClick={() => setFiltered(colours)}
            >
              Back
            </button>
          </div>

          <p className="text-xs">Colour</p>
          <input
            type="text"
            placeholder="Enter Colour"
            className="border border-black rounded-md px-2 py-1 text-gray-400 text-xs bg-white"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          {colours.length === 0 ? (
            <div> Loading </div>
          ) : (
            <Main colours={filtered} />
          )}
        </div>
      )}
    </div>
  );
};

export default ColourSearcher;
