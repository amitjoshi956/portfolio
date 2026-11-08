export const classnames = (classMap: Record<string, boolean>): string => {
  if (!Object.keys(classMap).length) return "";

  return Object.entries(classMap)
    .filter((entry) => Boolean(entry[1]))
    .map(([className]) => className)
    .join(" ")
    .trim();
};
