export const getRotationAngle = (
  segmentsLength: number,
  prizeIndex: number,
  rotationCount: number
): number => {
  const finalAngle =
    (360 / segmentsLength) * prizeIndex +
    180 / segmentsLength +
    rotationCount * 360;

  return finalAngle;
};

const wheelImageCache = new Map<string, Promise<HTMLImageElement[]>>();

export const fetchWheelImages = async (
  renderImages: string[]
): Promise<HTMLImageElement[]> => {
  if (typeof wheelImageCache.get("__cache") !== "undefined")
    return wheelImageCache.get("__cache") as unknown as Promise<
      HTMLImageElement[]
    >;

  const imageLoadPromise = Promise.all(
    renderImages.map(
      async (source): Promise<HTMLImageElement> =>
        new Promise((resolve) => {
          const image = new Image();
          image.src = source;
          image.addEventListener("load", () => {
            resolve(image);
          });
        })
    )
  );

  wheelImageCache.set("__cache", imageLoadPromise);

  return imageLoadPromise;
};

export const segColors = [
  "#0058d4",
  "#8627d9",
  "#ca0bcb",
  "#e91c6b",
  "#74b233",
  "#0892c0",
  "#e71530",
  "#f9672b",
];
