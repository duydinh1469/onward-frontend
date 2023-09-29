export function fileNameExtract(url) {
  const fileName = url?.split("/o/").pop().split("?alt")[0];
  const name = decodeURIComponent(fileName)?.split("/cv/")?.[1];
  const rawDate = name?.split("-")?.[0]?.slice(0, 8);
  // prettier-ignore
  const date = `${rawDate.substring(6)}/${rawDate.substring(4,6)}/${rawDate.substring(0, 4)}`;
  const extractArray = name.split(".");
  const extension = extractArray[extractArray.length - 1].toLowerCase();
  return { name, extension, date };
}
