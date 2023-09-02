import React from "react";

const ColourRow = ({ colour }) => {
  const hexValue = colour.hex.slice(1);
  const rgbHex = hexValue.match(/.{1,2}/g);
  const rgb = [
    parseInt(rgbHex[0], 16),
    parseInt(rgbHex[1], 16),
    parseInt(rgbHex[2], 16),
  ];

  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    return [
      Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h),
      Math.round(
        100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)
      ),
      Math.round((100 * (2 * l - s)) / 2),
    ];
  };
  const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);

  const bgStyle = {
    backgroundColor: colour.hex,
  };

  return (
    <tr>
      <td>
        <div style={bgStyle} className="p-[11px] rounded-sm mr-2"></div>
      </td>
      <td className="pr-2">{colour.color}</td>
      <td className="pr-6">{colour.hex}</td>
      <td className="pr-6">{rgb.join(", ")}</td>
      <td className="pr-6">{hsl.join(", ")}</td>
    </tr>
  );
};

export default ColourRow;
