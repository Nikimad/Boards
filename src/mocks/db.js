import initialData from "./db.json";

const STORAGE_KEY = "boards-db";

const load = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // corrupted storage falls back to the initial data
  }
  return structuredClone(initialData);
};

let data = load();

const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

const findById = (collection, id) =>
  collection.find((doc) => doc.id != null && String(doc.id) === String(id));

// json-server 0.17: 1 for an empty collection, max numeric id + 1, otherwise a random 7-char string
const createId = (collection) => {
  if (collection.length === 0) return 1;
  const max = collection.reduce(
    (acc, doc) => (doc.id != null && (acc === undefined || doc.id > acc) ? doc.id : acc),
    undefined
  );
  return Number.isFinite(max) ? max + 1 : Math.random().toString(36).slice(2, 9);
};

// json-server 0.17 deletes docs whose `<name>Id` points to a missing doc in `<name>s`
// shortcut: plural is `name + "s"`, switch to real pluralization if irregular collection names appear
const removeOrphans = () => {
  const orphans = Object.entries(data).flatMap(([name, collection]) =>
    collection
      .filter((doc) =>
        Object.entries(doc).some(([key, value]) => {
          if (!key.endsWith("Id")) return false;
          const ref = data[`${key.slice(0, -2)}s`];
          return Array.isArray(ref) && !findById(ref, value);
        })
      )
      .map((doc) => [name, doc])
  );
  orphans.forEach(([name, doc]) => data[name].splice(data[name].indexOf(doc), 1));
};

export const has = (name) => Array.isArray(data[name]);

export const list = (name) => data[name];

export const get = (name, id) => findById(data[name], id);

export const create = (name, body) => {
  const collection = data[name];
  const doc = { ...body };
  doc.id = doc.id || createId(collection);
  if (findById(collection, doc.id)) throw new Error("Insert failed, duplicate id");
  collection.push(doc);
  save();
  return doc;
};

export const update = (name, id, attrs) => {
  const doc = get(name, id);
  if (!doc) return undefined;
  Object.assign(doc, attrs, { id: doc.id });
  save();
  return doc;
};

export const replace = (name, id, attrs) => {
  const doc = get(name, id);
  if (!doc) return undefined;
  const docId = doc.id;
  Object.keys(doc).forEach((key) => delete doc[key]);
  Object.assign(doc, attrs, { id: docId });
  save();
  return doc;
};

export const remove = (name, id) => {
  const collection = data[name];
  const doc = get(name, id);
  if (!doc) return undefined;
  collection.splice(collection.indexOf(doc), 1);
  removeOrphans();
  save();
  return doc;
};

export const reset = () => {
  data = structuredClone(initialData);
  localStorage.removeItem(STORAGE_KEY);
};
