// Shopigent Returns — view layer. Dark-first, premium SaaS aesthetic.
// Zero-build: Tailwind Play CDN. Brand: deep purple #7C3AED, emerald #10B981.
// Light/dark mode via `dark` class on <html> + CSS variables (matching shopigent site).

const esc = (s) => String(s || "")
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#039;");

const THEME_SPIN_CSS = `
@keyframes themespin{from{transform:rotate(0) scale(1)}to{transform:rotate(360deg) scale(1.12)}}
.theme-icon.theme-spin{animation:themespin .5s ease}
@media (prefers-reduced-motion:reduce){.theme-icon.theme-spin{animation:none}}`;

function nav(currentSlug) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/guides/getting-started", label: "Docs" },
    { href: "/blog", label: "Blog" },
    { href: "/pricing", label: "Pricing" },
  ];
  const linkClass = (href) => {
    const on = currentSlug === href.replace(/^\//, "");
    return `${on ? "text-[#7C3AED] font-semibold" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"} transition no-underline`;
  };
  return `
  <nav class="sticky top-0 z-50" style="background:var(--nav);backdrop-filter:blur(12px);border-bottom:1px solid var(--border)">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/" class="flex items-center gap-3 no-underline">
        <img src="/logo-new-dark.svg" alt="Shopigent Returns" class="logo-dark-mode w-12 h-12 rounded-lg logo-spin">
        <img src="/logo-new-light.svg" alt="Shopigent Returns" class="logo-light-mode hidden w-12 h-12 rounded-lg logo-spin">
        <span class="font-bold text-lg" style="color:var(--text-strong)">Shopigent Returns</span>
      </a>
      <div class="hidden md:flex items-center gap-4">
        ${links.map((l) => `<a href="${l.href}" class="text-sm ${linkClass(l.href)}">${l.label}</a>`).join("")}
        <button id="theme-toggle" class="rounded-full border-2 border-gray-400 dark:border-gray-500 p-1.5 text-gray-500 transition hover:bg-black/5 dark:text-gray-400 dark:hover:bg-white/10 flex items-center justify-center" title="Toggle theme" aria-label="Toggle theme">
          <span class="theme-icon relative inline-flex h-4 w-4 items-center justify-center">
            <svg class="theme-sun h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
            <svg class="theme-moon hidden h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
          </span>
        </button>
        <a href="https://apps.shopify.com" class="px-4 py-2 rounded-lg text-sm font-semibold text-white no-underline" style="background:linear-gradient(135deg,#7C3AED,#10B981)" target="_blank">Install App</a>
      </div>
      <button id="mobile-menu-btn" class="md:hidden rounded-md p-2 text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10" aria-label="Menu">
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>
    <div id="mobile-menu" class="hidden border-t px-4 py-3" style="border-color:var(--border);background:var(--nav)">
      <div class="flex flex-col gap-1">
        ${links.map((l) => `<a href="${l.href}" class="rounded-md px-3 py-2 text-sm font-medium ${linkClass(l.href)}">${l.label}</a>`).join("")}
        <div class="mt-2 flex items-center gap-2 px-3">
          <button id="theme-toggle-m" class="theme-toggle-m group flex items-center gap-2 rounded-full border-2 border-gray-400 dark:border-gray-500 px-3 py-1.5 text-sm transition" style="color:var(--text)" aria-label="Toggle theme">
            <span class="theme-icon relative inline-flex h-4 w-4 items-center justify-center">
              <svg class="theme-sun h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
              <svg class="theme-moon hidden h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
            </span>
            <span class="mode-text-light" style="color:var(--text)">Light</span>
            <span class="mode-text-dark" style="color:var(--text)">Dark</span>
          </button>
        </div>
        <a href="https://apps.shopify.com" class="mt-2 rounded-lg px-4 py-2 text-center text-sm font-semibold text-white no-underline" style="background:linear-gradient(135deg,#7C3AED,#10B981)" target="_blank">Install App</a>
      </div>
    </div>
  </nav>`;
}

function footer() {
  return `
  <footer style="border-top:1px solid var(--border)" class="mt-24 py-12">
    <div class="max-w-6xl mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Product</h4>
          <div class="flex flex-col gap-2">${["Features", "Pricing", "Changelog", "Roadmap"].map((l) => `<a href="/${l.toLowerCase()}" class="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white no-underline">${l}</a>`).join("")}</div>
        </div>
        <div>
          <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Docs</h4>
          <div class="flex flex-col gap-2">${["Getting Started", "Guides", "API Reference", "MCP"].map((l) => `<a href="/guides/getting-started" class="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white no-underline">${l}</a>`).join("")}</div>
        </div>
        <div>
          <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Company</h4>
          <div class="flex flex-col gap-2">${["About", "Blog", "Contact"].map((l) => `<a href="/${l.toLowerCase()}" class="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white no-underline">${l}</a>`).join("")}
            <a href="/privacy-policy" class="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white no-underline">Privacy</a>
            <a href="/terms-of-service" class="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white no-underline">Terms</a></div>
        </div>
        <div>
          <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Agent API</h4>
          <p class="text-sm text-gray-500 dark:text-gray-400">AI agents can read all docs via <code class="text-[#10B981]">GET /api/content</code></p>
        </div>
      </div>
      <div class="text-center text-sm text-gray-500 pt-8" style="border-top:1px solid var(--border-soft)">
        <p>© 2026 Shopigent · built by <a href="https://greeknous.com" class="text-[#10B981] hover:text-gray-900 dark:hover:text-white transition no-underline" target="_blank">Greek Nous</a></p>
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
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
  <link rel="icon" href="/favicon.ico">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <script>
    (function(){var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark");})();
  </script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>tailwind.config={darkMode:"class",theme:{extend:{colors:{brand:'#7C3AED',emerald:'#10B981'}}}}}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root{
      --bg:#f6f6fb; --card:#ffffff; --text:#33324a; --text-strong:#11111c;
      --muted:#6b7280; --faint:#9ca3af;
      --border:rgba(20,20,45,.10); --border-soft:rgba(20,20,45,.05);
      --nav:rgba(255,255,255,.85); --hover:rgba(20,20,45,.04);
      --code-bg:rgba(124,58,237,.08);
      --grad-text:linear-gradient(135deg,#1c1b29,#7C3AED);
    }
    .dark{
      --bg:#0a0a0f; --card:#12121a; --text:#e0e0e0; --text-strong:#ffffff;
      --muted:#9ca3af; --faint:#6b7280;
      --border:rgba(255,255,255,.06); --border-soft:rgba(255,255,255,.04);
      --nav:rgba(15,15,20,.85); --hover:rgba(255,255,255,.05);
      --code-bg:rgba(124,58,237,.15);
      --grad-text:linear-gradient(135deg,#fff,#a78bfa);
    }
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--text);line-height:1.6;-webkit-font-smoothing:antialiased;transition:background .2s,color .2s}
    a{color:inherit;text-decoration:underline;text-underline-offset:2px;text-decoration-color:rgba(124,58,237,.4)}
    a:hover{text-decoration-color:#7C3AED}
    .prose{max-width:720px;margin:0 auto;font-size:16px;line-height:1.8}
    .prose h1{font-size:2rem;font-weight:800;margin:2rem 0 1rem;background:var(--grad-text);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .prose h2{font-size:1.4rem;font-weight:700;margin:2rem 0 .75rem;color:var(--text-strong)}
    .prose h3{font-size:1.1rem;font-weight:600;margin:1.5rem 0 .5rem;color:var(--text-strong)}
    .prose p{margin:0 0 1rem;color:var(--muted)}
    .prose strong{color:var(--text-strong)}
    .prose code{background:var(--code-bg);padding:2px 6px;border-radius:4px;font-size:.9em;color:#a78bfa}
    .prose pre{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:1.2rem;overflow-x:auto;margin:1rem 0;font-size:.9rem}
    .prose pre code{background:transparent;padding:0;color:var(--text)}
    .prose ul,.prose ol{padding-left:1.5rem;margin:0 0 1rem;color:var(--muted)}
    .prose li{margin:.25rem 0}
    .prose blockquote{border-left:3px solid #7C3AED;padding:.5rem 1rem;margin:1rem 0;background:var(--code-bg);border-radius:0 8px 8px 0;color:var(--text)}
    .prose img{max-width:100%;border-radius:12px;margin:1.5rem 0}
    .prose hr{border:none;border-top:1px solid var(--border);margin:2rem 0}
    .prose table{width:100%;border-collapse:collapse;margin:1rem 0;font-size:.9rem}
    .prose th,.prose td{padding:.6rem .8rem;text-align:left;border-bottom:1px solid var(--border)}
    .prose th{color:var(--text-strong);font-weight:600}
    /* Responsive tables: scroll on mobile */
    .prose table{display:block;overflow-x:auto;-webkit-overflow-scrolling:touch;white-space:nowrap}
    @media(max-width:640px){
      .prose table{font-size:.8rem}
      .prose th,.prose td{padding:.4rem .5rem}
    }
    ::selection{background:rgba(124,58,237,.3)}
    html:not(.dark) .theme-sun{display:block!important}
    html:not(.dark) .theme-moon{display:none!important}
    html.dark .theme-sun{display:none!important}
    html.dark .theme-moon{display:block!important}
    html:not(.dark) .mode-text-light{display:inline!important}
    html:not(.dark) .mode-text-dark{display:none!important}
    html.dark .mode-text-light{display:none!important}
    html.dark .mode-text-dark{display:inline!important}
    html:not(.dark) .logo-dark-mode{display:inline-block!important}
    html:not(.dark) .logo-light-mode{display:none!important}
    html.dark .logo-dark-mode{display:none!important}
    html.dark .logo-light-mode{display:inline-block!important}
    @keyframes logoSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    .logo-spin{animation:logoSpin 20s linear infinite}
    @media (prefers-reduced-motion:reduce){.logo-spin{animation:none}}
    ${THEME_SPIN_CSS}
  </style>
</head>
<body>
  ${nav(slug)}
  <main>${body}</main>
  ${footer()}
  <script>
  (function(){
    function toggleTheme(){
      var d=document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme",d?"dark":"light");
      document.querySelectorAll(".theme-icon").forEach(function(el){
        el.classList.remove("theme-spin"); void el.offsetWidth; el.classList.add("theme-spin");
      });
    }
    ["theme-toggle","theme-toggle-m"].forEach(function(id){var el=document.getElementById(id);if(el)el.addEventListener("click",toggleTheme);});
    var mb=document.getElementById("mobile-menu-btn"), mm=document.getElementById("mobile-menu");
    if(mb)mb.addEventListener("click",function(e){e.stopPropagation();mm.classList.toggle("hidden");});
    document.addEventListener("click",function(e){
      if(!mm||mm.classList.contains("hidden"))return;
      if(mm.contains(e.target)||mb.contains(e.target))return;
      mm.classList.add("hidden");
    });
    document.addEventListener("keydown",function(e){
      if(e.key==="Escape"&&mm&&!mm.classList.contains("hidden"))mm.classList.add("hidden");
    });
  })();
  </script>
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
      <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6" style="background:linear-gradient(135deg,var(--text-strong),#a78bfa,#10B981);-webkit-background-clip:text;-webkit-text-fill-color:transparent">
        Returns That<br/>Handle Themselves
      </h1>
      <p class="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10">
        Stop manually processing returns. Shopigent Returns uses AI agents to analyze, approve, 
        refund, and detect fraud — automatically. Saves merchants 10+ hours per week.
      </p>
      <div class="flex items-center justify-center gap-4 flex-wrap">
        <a href="https://apps.shopify.com" class="px-8 py-3 rounded-xl text-base font-semibold text-white no-underline inline-block" style="background:linear-gradient(135deg,#7C3AED,#10B981)" target="_blank">Install App →</a>
        <a href="/guides/getting-started" class="px-8 py-3 rounded-xl text-base font-semibold no-underline inline-block" style="border:1px solid var(--border);color:var(--text-strong)">View Docs</a>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 py-16">
      <div class="grid md:grid-cols-3 gap-6">
        ${features.map((f) => `
          <div class="p-6 rounded-xl" style="background:var(--card);border:1px solid var(--border)">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-4" style="background:linear-gradient(135deg,${f.color})">${f.icon}</div>
            <h3 class="font-semibold text-base mb-2" style="color:var(--text-strong)">${f.title}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">${f.desc}</p>
          </div>
        `).join("")}
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 py-16 text-center">
      <h2 class="text-2xl md:text-3xl font-bold mb-4" style="color:var(--text-strong)">Works With Your AI Tools & Agents</h2>
      <p class="text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10">Connect via MCP protocol — use any MCP-compatible client, or let autonomous agents run on a schedule.</p>
      
      <h3 class="text-lg font-semibold mb-4 text-gray-500 dark:text-gray-300">🧠 AI Tools (MCP Clients)</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
        ${["Claude Desktop", "OpenAI Codex", "Cursor", "Grok"].map((name) => `<div class="p-4 rounded-xl" style="background:var(--card);border:1px solid var(--border)"><span class="text-sm font-medium" style="color:var(--text-strong)">${name}</span></div>`).join("")}
      </div>
      
      <h3 class="text-lg font-semibold mb-4 text-gray-500 dark:text-gray-300">🤖 AI Agents (Autonomous)</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        ${["Custom MCP Agent", "n8n Workflows", "Zapier AI", "Make.com"].map((name) => `<div class="p-4 rounded-xl" style="background:var(--card);border:1px solid var(--border)"><span class="text-sm font-medium" style="color:var(--text-strong)">${name}</span></div>`).join("")}
      </div>
    </section>

    <section class="max-w-4xl mx-auto px-4 py-16">
      <div class="p-8 md:p-12 rounded-2xl text-center" style="background:linear-gradient(135deg,rgba(124,58,237,.12),rgba(16,185,129,.12));border:1px solid rgba(124,58,237,.25)">
        <h2 class="text-2xl md:text-3xl font-bold mb-4" style="color:var(--text-strong)">Ready to Automate Returns?</h2>
        <p class="text-gray-500 dark:text-gray-400 max-w-lg mx-auto mb-8">Install the app, set your policies, and let AI handle returns end-to-end.</p>
        <div class="flex items-center justify-center gap-4 flex-wrap">
          <a href="/pricing" class="px-6 py-2.5 rounded-xl text-sm font-semibold text-white no-underline" style="background:linear-gradient(135deg,#7C3AED,#10B981)">View Pricing</a>
          <a href="/guides/getting-started" class="px-6 py-2.5 rounded-xl text-sm font-semibold no-underline" style="border:1px solid var(--border);color:var(--text-strong)">Read Docs</a>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 py-8">
      <div class="rounded-xl p-6" style="background:var(--card);border:1px solid var(--border)">
        <h3 class="font-semibold text-sm mb-2" style="color:var(--text-strong)">📋 Latest Docs</h3>
        <div class="grid md:grid-cols-3 gap-4">
          ${all.slice(0, 6).map((d) => `<a href="/${d.slug}" class="p-3 rounded-lg no-underline text-sm transition" style="background:var(--hover)"><span class="font-medium" style="color:var(--text-strong)">${d.title}</span><br/><span class="text-gray-500 dark:text-gray-400 text-xs">${d.description || d.slug}</span></a>`).join("")}
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
          ${sidebar.map((d) => `<a href="/${d.slug}" class="text-sm no-underline py-1.5 px-2 rounded ${d.slug === doc.slug ? "text-[#7C3AED] font-medium" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"}" ${d.slug === doc.slug ? `style="background:var(--hover)"` : ""}>${d.title}</a>`).join("")}
        </div>
      </aside>
      <article class="prose flex-1 min-w-0 overflow-x-auto">
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
      <h1 class="text-3xl md:text-4xl font-extrabold mb-2" style="background:var(--grad-text);-webkit-background-clip:text;-webkit-text-fill-color:transparent">Blog</h1>
      <p class="text-gray-500 dark:text-gray-400 mb-10">Tips, guides, and insights about AI-powered return management for Shopify.</p>
      <div class="grid gap-6">
        ${blogPosts.map((p) => `
          <a href="/${p.slug}" class="block p-6 rounded-xl no-underline transition" style="background:var(--card);border:1px solid var(--border)">
            <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
              ${(p.frontmatter.tags || []).slice(0, 3).map((t) => `<span style="background:rgba(124,58,237,.15);color:#a78bfa;padding:2px 8px;border-radius:4px">${t}</span>`).join("")}
            </div>
            <h2 class="text-lg font-bold mb-1" style="color:var(--text-strong)">${esc(p.frontmatter.title || "")}</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">${esc(p.frontmatter.description || "")}</p>
          </a>
        `).join("")}
      </div>
    </div>
  `;
  return shell(body, "blog");
}

function render404() {
  return shell(`<div class="max-w-2xl mx-auto px-4 py-24 text-center"><h1 class="text-6xl font-bold mb-4" style="background:linear-gradient(135deg,#7C3AED,#10B981);-webkit-background-clip:text;-webkit-text-fill-color:transparent">404</h1><p class="text-gray-500 dark:text-gray-400 mb-8">Page not found</p><a href="/" class="px-6 py-2.5 rounded-xl text-sm font-semibold text-white no-underline" style="background:linear-gradient(135deg,#7C3AED,#10B981)">Go Home</a></div>`);
}

module.exports = { landing, doc, blogPage, render404 };