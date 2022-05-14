export const sagaTestingConsole = false;
export function gameImage(src: string) {
  const noImageURL =
    "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101032/112815935-no-image-available-icon-flat-vector-illustration.jpg";
  return src && src.includes(".") ? src : noImageURL;
}
