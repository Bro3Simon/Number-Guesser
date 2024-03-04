export const REQUIRED_ERROR_MESSAGE = "Required";
export const REQUIRED_RULE = {
  required: { message: REQUIRED_ERROR_MESSAGE, value: true },
};

export function arrayToCommaSeparatedString(array: string[]) {
  return new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  }).format(array);
}

export function naturalSort(array: string[]) {
  return array.sort((firstItem, secondItem) =>
    firstItem.localeCompare(
      secondItem,
      navigator.languages[0] || navigator.language,
      {
        ignorePunctuation: true,
        numeric: true,
      }
    )
  );
}
