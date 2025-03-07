const ItemCode = ({ code }) => {
  const codeToRemove = code?.split("-").shift();
  const newCode = code?.replace(`${codeToRemove}-`, "");
  return newCode;
};

export default ItemCode;
