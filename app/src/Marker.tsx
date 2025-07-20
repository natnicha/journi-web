
export const getMarkerSrc = (day: number) => {
  if (day%4 == 0) return "./src/assets/map-pin-rose-sunset.png";
  else if (day%4 == 1) return "./src/assets/map-pin.png";
  else if (day%4 == 2) return "./src/assets/map-pin-lagoon-blue.png";
  else return "./src/assets/map-pin-mango-deep.png";
};
