const getObjText = (obj) =>
  Object.values(obj).reduce((text, val) => {
    text += typeof val === "string" ? `${val.toLowerCase().trim()} ` : getObjText(val)
    return text;
  }, "");

const isRequested = (obj, searchParams) => {
  if (!searchParams) return true;
  const txt = getObjText(obj);
  const regExp = new RegExp(searchParams, "i");
  return regExp.test(txt);
};

export default isRequested;
