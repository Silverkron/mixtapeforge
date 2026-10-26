const families: Record<string, string> = {
  sans: "Cassette Barlow",
  bold: "Cassette Barlow Bold",
  display: "Cassette Barlow Condensed",
  mono: "Cassette Plex Mono",
  poster: "Cassette Bebas Neue",
  typewriter: "Cassette Courier Prime",
};
export const artworkFontFamily = (role: string) =>
  families[role] ?? families.sans;
