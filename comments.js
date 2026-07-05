/* 区块级 giscus 评论 —— 每个区块一个 term 线程，懒加载。零后端，落 GitHub Discussions。 */
(function () {
  "use strict";
  var REPO = "Geoxxll/atelier-module-review";
  var REPO_ID = "R_kgDOTN-woQ";
  var CATEGORY = "Announcements";
  var CATEGORY_ID = "DIC_kwDOTN-woc4DAhjD";

  var slug = (location.pathname.split("/").pop() || "index").replace(/\.html$/, "") || "index";

  function theme() {
    var t = document.documentElement.getAttribute("data-theme");
    if (!t) t = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    return t === "dark" ? "dark" : "light";
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function txt(el, n) {
    if (!el) return "";
    return el.textContent.trim().replace(/\s+/g, " ").slice(0, n || 56);
  }

  function loadGiscus(mount, term) {
    if (mount._loaded) return;
    mount._loaded = true;
    var s = document.createElement("script");
    s.src = "https://giscus.app/client.js";
    s.setAttribute("data-repo", REPO);
    s.setAttribute("data-repo-id", REPO_ID);
    s.setAttribute("data-category", CATEGORY);
    s.setAttribute("data-category-id", CATEGORY_ID);
    s.setAttribute("data-mapping", "specific");
    s.setAttribute("data-term", term);
    s.setAttribute("data-strict", "1");
    s.setAttribute("data-reactions-enabled", "1");
    s.setAttribute("data-emit-metadata", "0");
    s.setAttribute("data-input-position", "top");
    s.setAttribute("data-theme", theme());
    s.setAttribute("data-lang", "zh-CN");
    s.setAttribute("data-loading", "lazy");
    s.crossOrigin = "anonymous";
    s.async = true;
    mount.appendChild(s);
  }

  function attach(block, term, label) {
    if (getComputedStyle(block).position === "static") block.style.position = "relative";
    var btn = document.createElement("button");
    btn.className = "cmt-btn";
    btn.type = "button";
    btn.innerHTML = '💬 <span>评论</span>';
    btn.setAttribute("aria-label", "评论：" + label);
    block.appendChild(btn);

    var panel = null;
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      if (!panel) {
        panel = document.createElement("div");
        panel.className = "cmt-panel";
        panel.innerHTML =
          '<div class="cmt-h"><span>💬 评论 · ' + esc(label) +
          '</span><button class="cmt-x" type="button" aria-label="收起">✕</button></div>' +
          '<div class="cmt-mount"></div>';
        block.appendChild(panel);
        var mount = panel.querySelector(".cmt-mount");
        panel.querySelector(".cmt-x").addEventListener("click", function () {
          panel.style.display = "none";
          btn.classList.remove("on");
        });
        loadGiscus(mount, term);
        btn.classList.add("on");
      } else {
        var hidden = panel.style.display === "none";
        panel.style.display = hidden ? "" : "none";
        btn.classList.toggle("on", hidden);
      }
      if (panel.style.display !== "none")
        panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  function init() {
    // 章节级
    document.querySelectorAll("main .cwrap > section[id]").forEach(function (sec) {
      attach(sec, slug + " · §" + sec.id, txt(sec.querySelector("h2")) || sec.id);
    });
    // 端到端块
    var ei = 0;
    document.querySelectorAll(".e2e").forEach(function (b) {
      ei++;
      attach(b, slug + " · e2e#" + ei, txt(b.querySelector(".e2e-head h3")) || "端到端 " + ei);
    });
    // 深挖块（锚在展开区，避开 summary 右侧标签）
    var di = 0;
    document.querySelectorAll("details.deep").forEach(function (d) {
      di++;
      var inner = d.querySelector(".inner") || d;
      attach(inner, slug + " · deep#" + di, txt(d.querySelector("summary")) || "深挖 " + di);
    });

    // 全局开关：显示/隐藏评论标记
    var fab = document.createElement("button");
    fab.className = "cmt-fab";
    fab.type = "button";
    fab.innerHTML = '💬 <span>评论</span>';
    fab.title = "显示 / 隐藏评论标记";
    fab.addEventListener("click", function () {
      document.body.classList.toggle("cmt-off");
    });
    document.body.appendChild(fab);

    // 主题联动：页面切换明暗时，通知已加载的 giscus iframe 换主题
    new MutationObserver(function () {
      var t = theme();
      document.querySelectorAll("iframe.giscus-frame").forEach(function (f) {
        try {
          f.contentWindow.postMessage({ giscus: { setConfig: { theme: t } } }, "https://giscus.app");
        } catch (e) {}
      });
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
