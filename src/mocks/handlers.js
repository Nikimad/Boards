import { http, HttpResponse } from "msw";
import * as db from "./db";

const notFound = () => HttpResponse.json({}, { status: 404 });

const found = (doc) => (doc ? HttpResponse.json(doc) : notFound());

const deepQuery = (value, q) => {
  if (!value) return false;
  if (Array.isArray(value)) return value.some((item) => deepQuery(item, q));
  if (typeof value === "object") return Object.values(value).some((item) => deepQuery(item, q));
  return value.toString().toLowerCase().includes(q);
};

// json-server 0.17 list semantics, limited to what the client uses: `q`, `<field>`, `<field>_like`
const applyQuery = (items, searchParams) => {
  let result = items;

  const q = searchParams.get("q");
  if (q) {
    const needle = q.toLowerCase();
    result = result.filter((item) => Object.values(item).some((value) => deepQuery(value, needle)));
  }

  new Set(searchParams.keys()).forEach((key) => {
    if (key === "q" || key === "callback" || key === "_") return;
    const isLike = key.endsWith("_like");
    // json-server ignores filters on fields that no item has
    if (!isLike && !items.some((item) => Object.hasOwn(item, key))) return;
    const field = isLike ? key.slice(0, -"_like".length) : key;
    const matchers = searchParams
      .getAll(key)
      .map((expected) =>
        isLike ? (actual) => new RegExp(expected, "i").test(actual) : (actual) => actual === expected
      );
    result = result.filter((item) => {
      const value = item[field];
      return value != null && matchers.some((matches) => matches(value.toString()));
    });
  });

  return result;
};

const withCollection =
  (resolver) =>
  ({ params, request }) =>
    db.has(params.collection) ? resolver({ name: params.collection, id: params.id, request }) : notFound();

export const handlers = [
  http.get(
    "/api/:collection",
    withCollection(({ name, request }) => {
      try {
        return HttpResponse.json(applyQuery(db.list(name), new URL(request.url).searchParams));
      } catch (error) {
        // json-server answers an invalid *_like regex with 500 and the error stack
        return new HttpResponse(error.stack, { status: 500 });
      }
    })
  ),
  http.post(
    "/api/:collection",
    withCollection(async ({ name, request }) => {
      const doc = db.create(name, await request.json());
      return HttpResponse.json(doc, {
        status: 201,
        headers: {
          Location: `${request.url}/${doc.id}`,
          "Access-Control-Expose-Headers": "Location",
        },
      });
    })
  ),
  http.get(
    "/api/:collection/:id",
    withCollection(({ name, id }) => found(db.get(name, id)))
  ),
  http.put(
    "/api/:collection/:id",
    withCollection(async ({ name, id, request }) => found(db.replace(name, id, await request.json())))
  ),
  http.patch(
    "/api/:collection/:id",
    withCollection(async ({ name, id, request }) => found(db.update(name, id, await request.json())))
  ),
  http.delete(
    "/api/:collection/:id",
    withCollection(({ name, id }) => (db.remove(name, id) ? HttpResponse.json({}) : notFound()))
  ),
];
