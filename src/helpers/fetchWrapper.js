const handleFetch = async (...args) => {
  const res = await fetch(...args);
  if (!res.ok) throw new Error(res.status);
  if (res.ok) return await res.json();
};

const fetchWrapper = (path) => {
  const baseUrl = `/api/${path}`;
  const methods = {
    post: "POST",
    patch: "PATCH",
    delete: "DELETE",
  };
  const headers = {
    "Content-Type": "application/json",
  };
  return {
    get: (url) => handleFetch(`${baseUrl}${Boolean(url) ? `/${url}` : ""}`),
    post: (body) =>
      handleFetch(baseUrl, {
        method: methods.post,
        headers,
        body: JSON.stringify(body),
      }),
    patch: (url, body) =>
      handleFetch(`${baseUrl}/${url}`, {
        method: methods.patch,
        headers,
        body: JSON.stringify(body),
      }),
    delete: (url) =>
      handleFetch(`${baseUrl}/${url}`, {
        method: methods.delete,
      }),
  };
};

export default fetchWrapper;
