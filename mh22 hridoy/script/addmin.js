
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getDatabase, ref, push, set, update, remove, onValue, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AI***********************o",
  authDomain: "mh2-**********************com",
  databaseURL: "http*********************e.app",
  projectId: "mh2******************oy",
  storageBucket: "mh2-h*******************pp",
  messagingSenderId: "102************506",
  appId: "1:102966351506:web:6*********************84b",
  measurementId: "G-R************6**EVE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const projectsRef = ref(db, "portfolio/projects");

let allProjects = {};
let deleteTargetId = null;

/* ---------- Toast ---------- */
function toast(msg, type = "success") {
  const el = document.createElement("div");
  el.className = `toast-item ${type}`;
  el.innerHTML = `<i class="fa-solid ${type === "success" ? "fa-circle-check" : "fa-circle-exclamation"}"></i> ${msg}`;
  document.getElementById("toast").appendChild(el);
  setTimeout(() => { el.style.opacity = "0"; el.style.transition = "opacity .3s"; setTimeout(() => el.remove(), 300); }, 3200);
}

/* ---------- Auth ---------- */
document.getElementById("boot-loader").style.display = "none";

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("dash").style.display = "block";
    document.getElementById("admin-email").innerHTML = `<i class="fa-solid fa-user-shield"></i> ${user.email}`;
    listenProjects();
  } else {
    document.getElementById("login-screen").style.display = "flex";
    document.getElementById("dash").style.display = "none";
  }
});

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("l-email").value.trim();
  const pass = document.getElementById("l-pass").value;
  const btn = document.getElementById("login-btn");
  const errEl = document.getElementById("login-error");
  errEl.style.display = "none";
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-circle-notch spin"></i> Signing in…';
  try {
    await signInWithEmailAndPassword(auth, email, pass);
  } catch (err) {
    errEl.textContent = "⚠️ Invalid email or password.";
    errEl.style.display = "block";
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Sign In';
  }
});

document.getElementById("logout-btn").addEventListener("click", () => signOut(auth));

/* ---------- Realtime projects list ---------- */
function listenProjects() {
  onValue(projectsRef, (snap) => {
    allProjects = snap.val() || {};
    renderTable();
    renderStats();
  });
}

function renderStats() {
  const arr = Object.values(allProjects);
  document.getElementById("s-total").textContent = arr.length;
  document.getElementById("s-featured").textContent = arr.filter(p => p.featured).length;
  document.getElementById("s-live").textContent = arr.filter(p => p.status === "live").length;
  document.getElementById("s-draft").textContent = arr.filter(p => p.status !== "live").length;
}

function renderTable() {
  const q = (document.getElementById("search-input").value || "").toLowerCase();
  const tbody = document.getElementById("project-tbody");
  const entries = Object.entries(allProjects)
    .filter(([id, p]) => {
      if (!q) return true;
      const hay = `${p.title || ""} ${(p.technologies || []).join(" ")}`.toLowerCase();
      return hay.includes(q);
    })
    .sort((a, b) => (b[1].createdAt || 0) - (a[1].createdAt || 0));

  document.getElementById("empty-state").style.display = entries.length ? "none" : "block";
  tbody.innerHTML = entries.map(([id, p]) => {
    const techs = (p.technologies || []).slice(0, 3);
    const badgeClass = p.status === "live" ? "badge-live" : p.status === "archived" ? "badge-archived" : "badge-draft";
    const updated = p.updatedAt ? new Date(p.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "—";
    return `
      <tr>
        <td>
          <div class="p-title-cell">
            <img class="p-thumb" src="${escapeAttr(p.image || "")}" alt="" loading="lazy" onerror="this.src='https://placehold.co/100x100/0c1526/475569?text=%20'" />
            <div>
              <div class="p-title-txt">${escapeHtml(p.title || "Untitled")} ${p.featured ? '<span class="badge badge-featured" style="margin-left:.4rem;"><i class="fa-solid fa-star"></i></span>' : ""}</div>
              <div class="p-sub-txt">${escapeHtml(p.shortDescription || "")}</div>
            </div>
          </div>
        </td>
        <td><div class="tags-mini">${techs.map(t => `<span class="tag-mini">${escapeHtml(t)}</span>`).join("")}${(p.technologies || []).length > 3 ? `<span class="tag-mini">+${p.technologies.length - 3}</span>` : ""}</div></td>
        <td><span class="badge ${badgeClass}">${(p.status || "draft").toUpperCase()}</span></td>
        <td class="mono" style="color:var(--txt-3); font-size:.75rem;">${updated}</td>
        <td>
          <div class="row-actions" style="justify-content:flex-end;">
            <button class="btn btn-ghost btn-sm" onclick="editProject('${id}')"><i class="fa-solid fa-pen"></i></button>
            <button class="btn btn-danger btn-sm" onclick="askDelete('${id}')"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

document.getElementById("search-input").addEventListener("input", renderTable);

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
}
function escapeAttr(str) { return escapeHtml(str); }

/* ---------- Editor modal ---------- */
const overlay = document.getElementById("editor-overlay");
const form = document.getElementById("project-form");

function openEditor(id = null) {
  form.reset();
  document.getElementById("p-id").value = "";
  document.getElementById("p-status").value = "live";
  document.getElementById("editor-title").textContent = "Add Project";

  if (id && allProjects[id]) {
    const p = allProjects[id];
    document.getElementById("p-id").value = id;
    document.getElementById("p-title").value = p.title || "";
    document.getElementById("p-short").value = p.shortDescription || "";
    document.getElementById("p-full").value = p.fullDescription || "";
    document.getElementById("p-image").value = p.image || "";
    document.getElementById("p-github").value = p.github || "";
    document.getElementById("p-live").value = p.live || "";
    document.getElementById("p-tech").value = (p.technologies || []).join(", ");
    document.getElementById("p-status").value = p.status || "live";
    document.getElementById("p-featured").checked = !!p.featured;
    document.getElementById("editor-title").textContent = "Edit Project";
  }
  updatePreview();
  overlay.classList.add("open");
}
function closeEditor() { overlay.classList.remove("open"); }

document.getElementById("add-project-btn").addEventListener("click", () => openEditor());
document.getElementById("editor-close").addEventListener("click", closeEditor);
document.getElementById("editor-cancel").addEventListener("click", closeEditor);
overlay.addEventListener("click", (e) => { if (e.target === overlay) closeEditor(); });

window.editProject = (id) => openEditor(id);

/* live preview binding */
["p-title", "p-short", "p-image", "p-tech", "p-live"].forEach(id => {
  document.getElementById(id).addEventListener("input", updatePreview);
});
function updatePreview() {
  const title = document.getElementById("p-title").value || "Project Title";
  const shortD = document.getElementById("p-short").value || "Short description will appear here…";
  const img = document.getElementById("p-image").value || "https://placehold.co/600x400/0c1526/475569?text=Image+Preview";
  const live = document.getElementById("p-live").value.trim();
  const techs = document.getElementById("p-tech").value.split(",").map(t => t.trim()).filter(Boolean);

  document.getElementById("pv-title").textContent = title;
  document.getElementById("pv-desc").textContent = shortD;
  document.getElementById("pv-img").src = img;
  document.getElementById("pv-tags").innerHTML = techs.slice(0, 4).map(t => `<span class="tag-mini">${escapeHtml(t)}</span>`).join("");
  document.getElementById("pv-live-btn").style.display = live ? "inline-flex" : "none";
}

/* ---------- Save (add / edit) ---------- */
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("p-id").value;
  const btn = document.getElementById("save-btn");
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-circle-notch spin"></i> Saving…';

  const data = {
    title: document.getElementById("p-title").value.trim(),
    shortDescription: document.getElementById("p-short").value.trim(),
    fullDescription: document.getElementById("p-full").value.trim(),
    image: document.getElementById("p-image").value.trim(),
    github: document.getElementById("p-github").value.trim(),
    live: document.getElementById("p-live").value.trim(),
    technologies: document.getElementById("p-tech").value.split(",").map(t => t.trim()).filter(Boolean),
    featured: document.getElementById("p-featured").checked,
    status: document.getElementById("p-status").value,
    updatedAt: Date.now(),
  };

  try {
    if (id) {
      await update(ref(db, `portfolio/projects/${id}`), data);
      toast("Project updated successfully.");
    } else {
      data.createdAt = Date.now();
      const newRef = push(projectsRef);
      await set(newRef, data);
      toast("Project added successfully.");
    }
    closeEditor();
  } catch (err) {
    toast("Something went wrong. Please try again.", "error");
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save Project';
  }
});

/* ---------- Delete ---------- */
const confirmOverlay = document.getElementById("confirm-overlay");
window.askDelete = (id) => {
  deleteTargetId = id;
  document.getElementById("confirm-name").textContent = `"${allProjects[id]?.title || "this project"}"`;
  confirmOverlay.classList.add("open");
};
document.getElementById("confirm-cancel").addEventListener("click", () => { confirmOverlay.classList.remove("open"); deleteTargetId = null; });
confirmOverlay.addEventListener("click", (e) => { if (e.target === confirmOverlay) confirmOverlay.classList.remove("open"); });

document.getElementById("confirm-delete").addEventListener("click", async () => {
  if (!deleteTargetId) return;
  const btn = document.getElementById("confirm-delete");
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-circle-notch spin"></i> Deleting…';
  try {
    await remove(ref(db, `portfolio/projects/${deleteTargetId}`));
    toast("Project deleted.");
  } catch (err) {
    toast("Failed to delete project.", "error");
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-trash"></i> Delete';
    confirmOverlay.classList.remove("open");
    deleteTargetId = null;
  }
});
