const getObjText = (obj) =>
  Object.values(obj).reduce((text, val) => {
    text.concat(
      typeof val === "string" ? val.toLowerCase().trim() : getObjText(val)
    );
    return text;
  }, "");

const isRequsted = (obj, searchParams) => {
  const txt = getObjText(obj);
  const regExp = new RegExp(searchParams, "i");
  return regExp.test(txt);
};

export default isRequsted;
