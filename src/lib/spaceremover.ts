import type { ChangeEvent } from "react";

export const handleInputSpaces = (
  e: ChangeEvent<HTMLInputElement>,
  disallowSpaces: boolean,
  callback?: (e: ChangeEvent<HTMLInputElement>) => void,
) => {
  if (disallowSpaces) {
    e.target.value = e.target.value.replace(/\s/g, "");
  }

  if (callback) {
    callback(e);
  }
};
