import { Hono } from "hono";

type Bindings = {
  MY_KV: KVNamespace;
  MY_BUCKET: R2Bucket;
};

const app = new Hono<{ Bindings: Bindings }>();

// Health check
app.get("/", (c) => {
  return c.json({ message: "cf-starter is running", status: "ok" });
});

// --- KV Routes ---

app.get("/kv/:key", async (c) => {
  const key = c.req.param("key");
  const value = await c.env.MY_KV.get(key);
  if (value === null) {
    return c.json({ error: "Key not found" }, 404);
  }
  return c.json({ key, value });
});

app.put("/kv/:key", async (c) => {
  const key = c.req.param("key");
  const value = await c.req.text();
  await c.env.MY_KV.put(key, value);
  return c.json({ key, value, status: "saved" });
});

app.delete("/kv/:key", async (c) => {
  const key = c.req.param("key");
  await c.env.MY_KV.delete(key);
  return c.json({ key, status: "deleted" });
});

// --- R2 Routes ---

app.get("/r2", async (c) => {
  const list = await c.env.MY_BUCKET.list();
  const objects = list.objects.map((obj) => ({
    key: obj.key,
    size: obj.size,
    uploaded: obj.uploaded,
  }));
  return c.json({ objects });
});

app.get("/r2/:key", async (c) => {
  const key = c.req.param("key");
  const object = await c.env.MY_BUCKET.get(key);
  if (object === null) {
    return c.json({ error: "Object not found" }, 404);
  }
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  return new Response(object.body, { headers });
});

app.put("/r2/:key", async (c) => {
  const key = c.req.param("key");
  const body = await c.req.arrayBuffer();
  await c.env.MY_BUCKET.put(key, body, {
    httpMetadata: {
      contentType: c.req.header("content-type") || "application/octet-stream",
    },
  });
  return c.json({ key, status: "uploaded" });
});

app.delete("/r2/:key", async (c) => {
  const key = c.req.param("key");
  await c.env.MY_BUCKET.delete(key);
  return c.json({ key, status: "deleted" });
});

export default app;
