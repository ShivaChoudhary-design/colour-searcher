import React from "react";
import ColourRow from "./ColourRow";

const Main = ({ colours }) => {
  return (
    <div className="mt-10">
      <table>
        <thead>
          <tr className="text-left">
            <th></th>
            <th>Name</th>
            <th>Hex</th>
            <th>RGB</th>
            <th>HSL</th>
          </tr>
        </thead>
        <tbody>
          {colours.map((colour, i) => (
            <ColourRow key={i} colour={colour} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Main;
