// Shopigent Returns — view layer. Dark-first, premium SaaS aesthetic.
// Zero-build: Tailwind Play CDN. Brand: deep purple #7C3AED, emerald #10B981.

const esc = (s) => String(s || "")
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#039;");

function nav(currentSlug) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/guides/getting-started", label: "Docs" },
    { href: "/blog", label: "Blog" },
    { href: "/pricing", label: "Pricing" },
  ];
  return `
  <nav class="sticky top-0 z-50" style="background:rgba(15,15,20,.85);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,.06)">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/" class="flex items-center gap-3 no-underline">
        <span class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:linear-gradient(135deg,#7C3AED,#10B981)">↩</span>
        <span class="font-bold text-lg">Shopigent Returns</span>
      </a>
      <div class="flex items-center gap-6">
        ${links.map((l) => `<a href="${l.href}" class="text-sm ${currentSlug === l.href.replace(/^\//, "") ? "text-[#7C3AED] font-semibold" : "text-gray-400 hover:text-white"} transition no-underline">${l.label}</a>`).join("")}
        <a href="https://returns-app-production-8384.up.railway.app/return" class="px-4 py-2 rounded-lg text-sm font-semibold text-white no-underline" style="background:linear-gradient(135deg,#7C3AED,#10B981)">Start a Return</a>
      </div>
    </div>
  </nav>`;
}

function footer() {
  return `
  <footer style="border-top:1px solid rgba(255,255,255,.06)" class="mt-24 py-12">
    <div class="max-w-6xl mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Product</h4>
          <div class="flex flex-col gap-2">${["Features", "Pricing", "Changelog", "Roadmap"].map((l) => `<a href="/${l.toLowerCase()}" class="text-sm text-gray-400 hover:text-white no-underline">${l}</a>`).join("")}</div>
        </div>
        <div>
          <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Docs</h4>
          <div class="flex flex-col gap-2">${["Getting Started", "Guides", "API Reference", "MCP"].map((l) => `<a href="/guides/getting-started" class="text-sm text-gray-400 hover:text-white no-underline">${l}</a>`).join("")}</div>
        </div>
        <div>
          <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Company</h4>
          <div class="flex flex-col gap-2">${["About", "Blog", "Contact", "Privacy"].map((l) => `<a href="/${l.toLowerCase()}" class="text-sm text-gray-400 hover:text-white no-underline">${l}</a>`).join("")}</div>
        </div>
        <div>
          <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Agent API</h4>
          <p class="text-sm text-gray-400">AI agents can read all docs via <code class="text-[#10B981]">GET /api/content</code></p>
        </div>
      </div>
      <div class="text-center text-sm text-gray-500 pt-8" style="border-top:1px solid rgba(255,255,255,.04)">
        <p>© ${new Date().getFullYear()} Shopigent Returns. AI-powered return management for Shopify.</p>
      </div>
    </div>
  </footer>`;
}

function shell(body, slug = "") {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Shopigent Returns — AI-Powered Shopify Returns</title>
  <meta name="description" content="Automate your Shopify returns with AI. Policy engine, fraud detection, auto-refunds, MCP server, and customer portal."/>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>tailwind.config={theme:{extend:{colors:{brand:'#7C3AED',emerald:'#10B981'}}}}}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Inter',system-ui,sans-serif;background:#0a0a0f;color:#e0e0e0;line-height:1.6;-webkit-font-smoothing:antialiased}
    a{color:inherit;text-decoration:underline;text-underline-offset:2px;text-decoration-color:rgba(124,58,237,.4)}
    a:hover{text-decoration-color:#7C3AED}
    .prose{max-width:720px;margin:0 auto;font-size:16px;line-height:1.8}
    .prose h1{font-size:2rem;font-weight:800;margin:2rem 0 1rem;background:linear-gradient(135deg,#fff,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .prose h2{font-size:1.4rem;font-weight:700;margin:2rem 0 .75rem;color:#e0e0e0}
    .prose h3{font-size:1.1rem;font-weight:600;margin:1.5rem 0 .5rem;color:#ccc}
    .prose p{margin:0 0 1rem;color:#aaa}
    .prose strong{color:#e0e0e0}
    .prose code{background:rgba(124,58,237,.15);padding:2px 6px;border-radius:4px;font-size:.9em;color:#a78bfa}
    .prose pre{background:#12121a;border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:1.2rem;overflow-x:auto;margin:1rem 0;font-size:.9rem}
    .prose pre code{background:transparent;padding:0;color:#e0e0e0}
    .prose ul,.prose ol{padding-left:1.5rem;margin:0 0 1rem;color:#aaa}
    .prose li{margin:.25rem 0}
    .prose blockquote{border-left:3px solid #7C3AED;padding:.5rem 1rem;margin:1rem 0;background:rgba(124,58,237,.08);border-radius:0 8px 8px 0;color:#ccc}
    .prose img{max-width:100%;border-radius:12px;margin:1.5rem 0}
    .prose hr{border:none;border-top:1px solid rgba(255,255,255,.08);margin:2rem 0}
    .prose table{width:100%;border-collapse:collapse;margin:1rem 0;font-size:.9rem}
    .prose th,.prose td{padding:.6rem .8rem;text-align:left;border-bottom:1px solid rgba(255,255,255,.08)}
    .prose th{color:#e0e0e0;font-weight:600}
    ::selection{background:rgba(124,58,237,.3)}
  </style>
</head>
<body>
  ${nav(slug)}
  <main>${body}</main>
  ${footer()}
</body>
</html>`;
}

function landing(doc, all) {
  const features = [
    { title: "AI Agent", desc: "MCP-powered agent analyzes returns, approves/denies, executes refunds, and detects fraud automatically.", icon: "🤖", color: "from-purple-500 to-emerald-500" },
    { title: "Policy Engine", desc: "Configurable rules: time windows, amounts, restocking fees. Auto-approve or flag for review.", icon: "⚙️", color: "from-emerald-500 to-teal-500" },
    { title: "Customer Portal", desc: "Self-service return initiation. Customers enter their email, select items, and submit.", icon: "🛒", color: "from-blue-500 to-purple-500" },
    { title: "Fraud Detection", desc: "IP checks, velocity analysis, amount anomalies. Automatic flagging of suspicious returns.", icon: "🛡️", color: "from-red-500 to-orange-500" },
    { title: "Auto-Refund", desc: "Execute refunds directly in Shopify. AI agent processes refunds without your involvement.", icon: "💰", color: "from-green-500 to-emerald-500" },
    { title: "Label Generation", desc: "SendCloud, Shippo, or EasyPost. Auto-generate return labels on approval.", icon: "📦", color: "from-purple-500 to-pink-500" },
  ];

  const body = `
    <section class="max-w-6xl mx-auto px-4 pt-24 pb-16 text-center">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6" style="background:rgba(124,58,237,.15);color:#a78bfa;border:1px solid rgba(124,58,237,.3)">
        🚀 AI-Powered Return Management for Shopify
      </div>
      <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6" style="background:linear-gradient(135deg,#fff,#a78bfa,#10B981);-webkit-background-clip:text;-webkit-text-fill-color:transparent">
        Returns That<br/>Handle Themselves
      </h1>
      <p class="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
        Stop manually processing returns. Shopigent Returns uses AI agents to analyze, approve, 
        refund, and detect fraud — automatically. Saves merchants 10+ hours per week.
      </p>
      <div class="flex items-center justify-center gap-4 flex-wrap">
        <a href="https://returns-app-production-8384.up.railway.app/return" class="px-8 py-3 rounded-xl text-base font-semibold text-white no-underline inline-block" style="background:linear-gradient(135deg,#7C3AED,#10B981)">Start a Return →</a>
        <a href="/guides/getting-started" class="px-8 py-3 rounded-xl text-base font-semibold no-underline inline-block" style="border:1px solid rgba(255,255,255,.15);color:#e0e0e0">View Docs</a>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 py-16">
      <div class="grid md:grid-cols-3 gap-6">
        ${features.map((f) => `
          <div class="p-6 rounded-xl" style="background:#12121a;border:1px solid rgba(255,255,255,.06)">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-4" style="background:linear-gradient(135deg,${f.color})">${f.icon}</div>
            <h3 class="font-semibold text-base mb-2">${f.title}</h3>
            <p class="text-sm text-gray-400 leading-relaxed">${f.desc}</p>
          </div>
        `).join("")}
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 py-16 text-center">
      <h2 class="text-2xl md:text-3xl font-bold mb-4">Works With Your AI Tools & Agents</h2>
      <p class="text-gray-400 max-w-xl mx-auto mb-10">Connect via MCP protocol — use any MCP-compatible client, or let autonomous agents run on a schedule.</p>
      
      <h3 class="text-lg font-semibold mb-4 text-gray-300">🧠 AI Tools (MCP Clients)</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
        ${["Claude Desktop", "OpenAI Codex", "Cursor", "Grok"].map((name) => `<div class="p-4 rounded-xl" style="background:#12121a;border:1px solid rgba(255,255,255,.06)"><span class="text-sm font-medium">${name}</span></div>`).join("")}
      </div>
      
      <h3 class="text-lg font-semibold mb-4 text-gray-300">🤖 AI Agents (Autonomous)</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        ${["Custom MCP Agent", "n8n Workflows", "Zapier AI", "Make.com"].map((name) => `<div class="p-4 rounded-xl" style="background:#12121a;border:1px solid rgba(255,255,255,.06)"><span class="text-sm font-medium">${name}</span></div>`).join("")}
      </div>
    </section>

    <section class="max-w-4xl mx-auto px-4 py-16">
      <div class="p-8 md:p-12 rounded-2xl text-center" style="background:linear-gradient(135deg,rgba(124,58,237,.1),rgba(16,185,129,.1));border:1px solid rgba(124,58,237,.2)">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">Ready to Automate Returns?</h2>
        <p class="text-gray-400 max-w-lg mx-auto mb-8">Install the app, set your policies, and let AI handle returns end-to-end.</p>
        <div class="flex items-center justify-center gap-4 flex-wrap">
          <a href="/pricing" class="px-6 py-2.5 rounded-xl text-sm font-semibold text-white no-underline" style="background:linear-gradient(135deg,#7C3AED,#10B981)">View Pricing</a>
          <a href="/guides/getting-started" class="px-6 py-2.5 rounded-xl text-sm font-semibold no-underline" style="border:1px solid rgba(255,255,255,.15);color:#e0e0e0">Read Docs</a>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 py-8">
      <div class="rounded-xl p-6" style="background:#12121a;border:1px solid rgba(255,255,255,.06)">
        <h3 class="font-semibold text-sm mb-2">📋 Latest Docs</h3>
        <div class="grid md:grid-cols-3 gap-4">
          ${all.slice(0, 6).map((d) => `<a href="/${d.slug}" class="p-3 rounded-lg no-underline text-sm hover:bg-white/5 transition" style="background:rgba(255,255,255,.03)"><span class="font-medium text-white">${d.title}</span><br/><span class="text-gray-500 text-xs">${d.description || d.slug}</span></a>`).join("")}
        </div>
      </div>
    </section>
  `;
  return shell(body);
}

function doc(doc, all) {
  const sidebar = all.filter((d) => d.slug !== "index");
  const body = `
    <div class="max-w-6xl mx-auto px-4 py-12 flex gap-8">
      <aside class="hidden md:block w-56 shrink-0">
        <div class="sticky top-24 flex flex-col gap-1">
          <span class="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Docs</span>
          ${sidebar.map((d) => `<a href="/${d.slug}" class="text-sm no-underline py-1.5 px-2 rounded ${d.slug === doc.slug ? "text-[#7C3AED] font-medium bg-white/5" : "text-gray-400 hover:text-white"}">${d.title}</a>`).join("")}
        </div>
      </aside>
      <article class="prose flex-1 min-w-0">
        <h1>${esc(doc.frontmatter.title || "")}</h1>
        ${doc.html}
      </article>
    </div>
  `;
  return shell(body, doc.slug);
}

function blogPage(blogPosts) {
  const body = `
    <div class="max-w-4xl mx-auto px-4 py-12">
      <h1 class="text-3xl md:text-4xl font-extrabold mb-2" style="background:linear-gradient(135deg,#fff,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent">Blog</h1>
      <p class="text-gray-400 mb-10">Tips, guides, and insights about AI-powered return management for Shopify.</p>
      <div class="grid gap-6">
        ${blogPosts.map((p) => `
          <a href="/${p.slug}" class="block p-6 rounded-xl no-underline transition hover:bg-white/5" style="background:#12121a;border:1px solid rgba(255,255,255,.06)">
            <div class="flex items-center gap-2 text-xs text-gray-500 mb-2">
              ${(p.frontmatter.tags || []).slice(0, 3).map((t) => `<span style="background:rgba(124,58,237,.15);color:#a78bfa;padding:2px 8px;border-radius:4px">${t}</span>`).join("")}
            </div>
            <h2 class="text-lg font-bold text-white mb-1">${esc(p.frontmatter.title || "")}</h2>
            <p class="text-sm text-gray-400">${esc(p.frontmatter.description || "")}</p>
          </a>
        `).join("")}
      </div>
    </div>
  `;
  return shell(body, "blog");
}

function render404() {
  return shell(`<div class="max-w-2xl mx-auto px-4 py-24 text-center"><h1 class="text-6xl font-bold mb-4" style="background:linear-gradient(135deg,#7C3AED,#10B981);-webkit-background-clip:text;-webkit-text-fill-color:transparent">404</h1><p class="text-gray-400 mb-8">Page not found</p><a href="/" class="px-6 py-2.5 rounded-xl text-sm font-semibold text-white no-underline" style="background:linear-gradient(135deg,#7C3AED,#10B981)">Go Home</a></div>`);
}

module.exports = { landing, doc, blogPage, render404 };