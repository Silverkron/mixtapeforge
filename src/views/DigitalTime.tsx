const segments = [
  "4,0 20,0 23,3 20,6 4,6 1,3",
  "21,4 24,7 24,19 21,22 18,19 18,7",
  "21,24 24,27 24,39 21,42 18,39 18,27",
  "4,40 20,40 23,43 20,46 4,46 1,43",
  "3,24 6,27 6,39 3,42 0,39 0,27",
  "3,4 6,7 6,19 3,22 0,19 0,7",
  "4,20 20,20 23,23 20,26 4,26 1,23",
];
const digits: Record<string, string> = {
  "0": "abcdef",
  "1": "bc",
  "2": "abdeg",
  "3": "abcdg",
  "4": "bcfg",
  "5": "acdfg",
  "6": "acdefg",
  "7": "abc",
  "8": "abcdefg",
  "9": "abcdfg",
  "−": "g",
};

export function DigitalTime({ value }: { value: string }) {
  let cursor = 0;
  const characters = [...value].map((character) => {
    const x = cursor;
    cursor += character === ":" ? 13 : 30;
    return { character, x };
  });
  return (
    <svg
      className="digital-time"
      viewBox={`0 0 ${cursor - 6} 46`}
      role="img"
      aria-label={value}
    >
      {characters.map(({ character, x }, index) => (
        <g key={index} transform={`translate(${x} 0)`}>
          {character === ":" ? (
            <>
              <rect x="1" y="13" width="5" height="5" />
              <rect x="1" y="29" width="5" height="5" />
            </>
          ) : (
            segments.map((points, i) => (
              <polygon
                key={i}
                points={points}
                opacity={digits[character]?.includes("abcdefg"[i]) ? 1 : 0.07}
              />
            ))
          )}
        </g>
      ))}
    </svg>
  );
}
