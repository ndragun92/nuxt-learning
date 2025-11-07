export const pluralize = (word: string, count: number) =>
  `${word}${count > 1 ? "s" : ""}`;
