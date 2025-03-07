export function getValueIgnoreCase(obj, itemKey) {
  // Check if obj is a valid object and itemKey is a valid string
  if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
    console.error("Invalid object provided");
    return undefined;
  }

  if (typeof itemKey !== "string") {
    console.error("Invalid key provided");
    return undefined;
  }

  // Convert the lookup key to lowercase
  const lowerCaseKey = itemKey.toLowerCase();

  // Find the key in the object that matches the lowercase version
  const matchedKey = Object.keys(obj).find(
    (key) => typeof key === "string" && key.toLowerCase() === lowerCaseKey
  );

  // Return the value if the key is found, otherwise return undefined
  return matchedKey ? obj[matchedKey] : undefined;
}

export function getMatchedKeyOrItemKey(queryParams, itemKey) {
  // Validate that queryParams is a valid object and itemKey is a valid string
  if (
    typeof queryParams !== "object" ||
    queryParams === null ||
    Array.isArray(queryParams)
  ) {
    console.error("Invalid queryParams provided");
    return itemKey;
  }

  if (typeof itemKey !== "string") {
    console.error("Invalid itemKey provided");
    return itemKey;
  }

  // Convert the itemKey to lowercase
  const lowerCaseItemKey = itemKey.toLowerCase();

  // Find the key in the queryParams that matches the lowercase itemKey
  const matchedKey = Object.keys(queryParams).find(
    (key) => typeof key === "string" && key.toLowerCase() === lowerCaseItemKey
  );

  // Return the matched key if found, otherwise return the original itemKey
  return matchedKey || itemKey;
}
