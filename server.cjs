// Shopigent Returns docs site — headless, AI-manageable.
// Content as markdown in ./content, rendered on the fly.
// AI agents can read all content via GET /api/content (JSON).
const express = require("express");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");
const views = require("./views/layout.cjs");

const PORT = process.env.PORT || 4177;
const ROOT = __dirname;
const CONTENT_DIR = path.join(ROOT, "content");

const app = express();
app.use(express.json());
app.use(express.static(path.join(ROOT, "public"), { maxAge: "1h" }));

// ---- Helpers ----
function listFiles(dir, base = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const rel = path.join(base, e.name);
    if (e.isDirectory()) files.push(...listFiles(path.join(dir, e.name), rel));
    else if (e.name.endsWith(".md")) files.push(rel);
  }
  return files;
}

function parseMd(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const html = marked.parse(content, { async: false });
  return { frontmatter: data, html, content };
}

function allDocs() {
  return listFiles(CONTENT_DIR).map((f) => {
    const full = path.join(CONTENT_DIR, f);
    const { frontmatter, html, content } = parseMd(full);
    const slug = f.replace(/\.md$/, "").replace(/\\/g, "/");
    return { slug, title: frontmatter.title || slug, description: frontmatter.description || "", tags: frontmatter.tags || [], html, content, frontmatter };
  });
}

function findDoc(slug) {
  const candidates = [path.join(CONTENT_DIR, slug + ".md"), path.join(CONTENT_DIR, slug, "index.md")];
  for (const c of candidates) {
    if (fs.existsSync(c)) return { slug, ...parseMd(c) };
  }
  return null;
}

function renderHtml(slug, layout = "doc") {
  const doc = findDoc(slug);
  if (!doc) return null;

  const all = allDocs();
  if (layout === "landing") return views.landing(doc, all);
  return views.doc(doc, all);
}

// ---- Routes ----
app.get("/", (req, res) => {
  const html = renderHtml("index", "landing");
  if (!html) return res.status(404).send(views.render404());
  res.send(html);
});

app.get("/:slug(*)", (req, res) => {
  if (req.path.startsWith("/api/")) return; // skip
  const slug = req.params.slug.replace(/\.html$/, "");
  const html = renderHtml(slug);
  if (!html) return res.status(404).send(views.render404());
  res.send(html);
});

// JSON API — AI-manageable
app.get("/api/content", (req, res) => {
  res.json(allDocs().map(({ slug, title, description, tags, content }) => ({ slug, title, description, tags, content })));
});

app.get("/api/content/:slug(*)", (req, res) => {
  const doc = findDoc(req.params.slug);
  if (!doc) return res.status(404).json({ error: "not found" });
  res.json({ slug: doc.slug, title: doc.frontmatter.title, description: doc.frontmatter.description, tags: doc.frontmatter.tags, content: doc.content });
});

app.listen(PORT, () => console.log(`[returns-docs] http://localhost:${PORT}`));