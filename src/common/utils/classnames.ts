export const classnames = (classMap: Record<string, boolean>): string => {
  if (!Object.keys(classMap).length) return "";

  return Object.entries(classMap)
    .filter(([_, value]) => value)
    .map(([className]) => className)
    .join(" ")
    .trim();
};
