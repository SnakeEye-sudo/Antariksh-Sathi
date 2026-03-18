"use strict";

(function initAntarikshSathi() {
  const data = window.ANTARIKSH_DATA;
  const state = {
    eventFilter: "all",
    curiosityFilter: "all",
    stateFilter: "All India",
    agencyQuery: "",
    theme: localStorage.getItem("as-theme") || "night",
    reminderTime: localStorage.getItem("as-reminder") || "20:30",
    deferredPrompt: null
  };

  const loadingMessages = [
    "Collecting your first orbit view...",
    "Aligning meteor calendar with India-friendly nights...",
    "Docking ISRO mission watch and curiosity cards...",
    "Packing offline stars for low-network nights..."
  ];

  function $(id) {
    return document.getElementById(id);
  }

  function setTheme(theme) {
    state.theme = theme;
    document.body.dataset.theme = theme;
    localStorage.setItem("as-theme", theme);
  }

  function toggleTheme() {
    setTheme(state.theme === "night" ? "day" : "night");
  }

  function eventColor(type) {
    return ({
      meteor: "accent-meteor",
      eclipse: "accent-eclipse",
      planetary: "accent-planetary",
      season: "accent-season"
    })[type] || "accent-meteor";
  }

  function createStatusStrip() {
    const upcomingEvents = data.events.length;
    const stateCount = data.stargazing.length;
    const agencyCount = data.agencies.length;
    $("statusStrip").innerHTML = [
      `<span>${upcomingEvents} sky markers loaded</span>`,
      `<span>${stateCount} India spot suggestions</span>`,
      `<span>${agencyCount} major agency profiles</span>`,
      `<span>Offline pack updated ${data.meta.lastUpdated}</span>`
    ].map((item) => `<div class="status-pill">${item}</div>`).join("");
  }

  function getNextEvent() {
    return data.events.find((item) => item.spotlight) || data.events[0];
  }

  function renderHeroEvent() {
    const next = getNextEvent();
    $("nextEventTitle").textContent = next.title;
    $("nextEventMeta").textContent = `${next.dateLabel} · ${next.indiaView}`;
  }

  function renderEventFilters() {
    const filters = [
      ["all", "All"],
      ["meteor", "Meteor"],
      ["eclipse", "Eclipse"],
      ["planetary", "Planetary"],
      ["season", "Season"]
    ];
    $("eventFilters").innerHTML = filters.map(([value, label]) => `
      <button class="chip ${state.eventFilter === value ? "chip-active" : ""}" type="button" data-event-filter="${value}">
        ${label}
      </button>
    `).join("");
  }

  function renderEvents() {
    const items = state.eventFilter === "all"
      ? data.events
      : data.events.filter((item) => item.type === state.eventFilter);

    $("eventsGrid").innerHTML = items.map((item) => `
      <article class="space-card">
        <div class="card-badge ${eventColor(item.type)}">${item.type}</div>
        <h3>${item.title}</h3>
        <p class="card-date">${item.dateLabel}</p>
        <p>${item.summary}</p>
        <div class="card-foot">
          <span>${item.bestTime}</span>
          <span>${item.source}</span>
        </div>
        <p class="subtle">${item.indiaView}</p>
      </article>
    `).join("");
  }

  function renderLaunches() {
    $("launchGrid").innerHTML = data.launches.map((item) => `
      <article class="launch-card">
        <div class="launch-top">
          <div>
            <p class="eyebrow">${item.agency}</p>
            <h3>${item.mission}</h3>
          </div>
          <span class="status-tag">${item.status}</span>
        </div>
        <p class="launch-window">${item.window}</p>
        <p>${item.summary}</p>
        <p class="subtle">${item.note}</p>
        <div class="card-foot">
          <span>Source</span>
          <span>${item.source}</span>
        </div>
      </article>
    `).join("");
  }

  function renderStateOptions() {
    const states = ["All India"].concat(data.stargazing.map((item) => item.state));
    $("stateSelect").innerHTML = states.map((item) => `
      <option value="${item}" ${item === state.stateFilter ? "selected" : ""}>${item}</option>
    `).join("");
  }

  function getFilteredSpots() {
    if (state.stateFilter === "All India") return data.stargazing;
    return data.stargazing.filter((item) => item.state === state.stateFilter);
  }

  function renderStargazing() {
    const spots = getFilteredSpots();
    const spotlight = spots[0] || data.stargazing[0];

    $("spotlightCard").innerHTML = `
      <div>
        <p class="eyebrow">${spotlight.state}</p>
        <h3>${spotlight.location}</h3>
        <p>${spotlight.why}</p>
      </div>
      <div class="spotlight-side">
        <p><strong>Best months</strong></p>
        <p>${spotlight.bestMonths}</p>
        <p class="subtle">${spotlight.note}</p>
      </div>
    `;

    $("stargazingGrid").innerHTML = spots.map((item) => `
      <article class="mini-card">
        <p class="eyebrow">${item.state}</p>
        <h3>${item.location}</h3>
        <p>${item.why}</p>
        <p class="subtle">Best months: ${item.bestMonths}</p>
      </article>
    `).join("");
  }

  function renderAgencies() {
    const query = state.agencyQuery.trim().toLowerCase();
    const agencies = data.agencies.filter((item) => {
      const haystack = `${item.code} ${item.name} ${item.country} ${item.focus}`.toLowerCase();
      return !query || haystack.includes(query);
    });

    $("agencyGrid").innerHTML = agencies.map((item) => `
      <article class="mini-card agency-card">
        <div class="agency-top">
          <span class="agency-code">${item.code}</span>
          <span class="subtle">${item.country}</span>
        </div>
        <h3>${item.name}</h3>
        <p>${item.focus}</p>
        ${item.website ? `<a class="subtle agency-link" href="${item.website}" target="_blank" rel="noreferrer">Official site</a>` : `<span class="subtle">Official site list can expand later</span>`}
      </article>
    `).join("");
  }

  function renderCuriosityFilters() {
    const filters = [
      ["all", "All"],
      ["rockets", "Rockets"],
      ["moon", "Moon"],
      ["sun", "Sun"],
      ["sky", "Sky"],
      ["satellites", "Satellites"],
      ["eclipses", "Eclipses"]
    ];
    $("curiosityFilters").innerHTML = filters.map(([value, label]) => `
      <button class="chip ${state.curiosityFilter === value ? "chip-active" : ""}" type="button" data-curiosity-filter="${value}">
        ${label}
      </button>
    `).join("");
  }

  function getCuriosityPool() {
    return state.curiosityFilter === "all"
      ? data.curiosity
      : data.curiosity.filter((item) => item.tag === state.curiosityFilter);
  }

  function renderCuriosity(random = false) {
    const pool = getCuriosityPool();
    const item = random ? pool[Math.floor(Math.random() * pool.length)] : pool[0];
    $("curiosityCard").innerHTML = `
      <p class="eyebrow">${item.tag}</p>
      <h3>${item.title}</h3>
      <p class="question-line">${item.question}</p>
      <p>${item.answer}</p>
    `;
  }

  function renderContentPackStats() {
    $("contentPackStats").innerHTML = `
      <div><strong>${data.events.length}</strong><span>Sky events</span></div>
      <div><strong>${data.launches.length}</strong><span>ISRO mission watch cards</span></div>
      <div><strong>${data.stargazing.length}</strong><span>State and UT spot suggestions</span></div>
      <div><strong>${data.agencies.length}</strong><span>Agency profiles</span></div>
      <div><strong>${data.curiosity.length}</strong><span>Student curiosity explainers</span></div>
    `;
  }

  function saveReminder() {
    const value = $("reminderTime").value || "20:30";
    state.reminderTime = value;
    localStorage.setItem("as-reminder", value);
    $("reminderStatus").textContent = `Saved locally: ideal observing reminder at ${value}.`;
  }

  function hideLoader() {
    $("loadingShell").classList.add("loading-hidden");
  }

  function showLoadingAnimation() {
    let index = 0;
    $("loadingMessage").textContent = loadingMessages[index];
    setInterval(() => {
      index = (index + 1) % loadingMessages.length;
      $("loadingMessage").textContent = loadingMessages[index];
    }, 1200);
  }

  function openDrawer() {
    $("drawer").classList.add("drawer-open");
    $("drawer").setAttribute("aria-hidden", "false");
  }

  function closeDrawer() {
    $("drawer").classList.remove("drawer-open");
    $("drawer").setAttribute("aria-hidden", "true");
  }

  function bindEvents() {
    document.addEventListener("click", (event) => {
      const eventFilter = event.target.getAttribute("data-event-filter");
      const curiosityFilter = event.target.getAttribute("data-curiosity-filter");

      if (eventFilter) {
        state.eventFilter = eventFilter;
        renderEventFilters();
        renderEvents();
      }

      if (curiosityFilter) {
        state.curiosityFilter = curiosityFilter;
        renderCuriosityFilters();
        renderCuriosity();
      }
    });

    $("stateSelect").addEventListener("change", (event) => {
      state.stateFilter = event.target.value;
      renderStargazing();
    });

    $("agencySearch").addEventListener("input", (event) => {
      state.agencyQuery = event.target.value;
      renderAgencies();
    });

    $("randomCuriosityBtn").addEventListener("click", () => renderCuriosity(true));
    $("saveReminderBtn").addEventListener("click", saveReminder);

    ["themeBtn", "headerThemeBtn"].forEach((id) => {
      $(id).addEventListener("click", toggleTheme);
    });

    $("openDrawerBtn").addEventListener("click", openDrawer);
    $("closeDrawerBtn").addEventListener("click", closeDrawer);

    $("drawer").addEventListener("click", (event) => {
      if (event.target.id === "drawer") closeDrawer();
    });

    ["installBtn", "headerInstallBtn"].forEach((id) => {
      $(id).addEventListener("click", async () => {
        if (!state.deferredPrompt) {
          alert("Install prompt abhi available nahi hai. Browser menu se 'Install app' try karo.");
          return;
        }
        state.deferredPrompt.prompt();
        await state.deferredPrompt.userChoice;
        state.deferredPrompt = null;
      });
    });
  }

  function registerInstallPrompt() {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      state.deferredPrompt = event;
    });
  }

  function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js").catch(() => {});
      });
    }
  }

  function renderAll() {
    setTheme(state.theme);
    $("reminderTime").value = state.reminderTime;
    createStatusStrip();
    renderHeroEvent();
    renderEventFilters();
    renderEvents();
    renderLaunches();
    renderStateOptions();
    renderStargazing();
    renderAgencies();
    renderCuriosityFilters();
    renderCuriosity();
    renderContentPackStats();
  }

  document.addEventListener("DOMContentLoaded", () => {
    showLoadingAnimation();
    renderAll();
    bindEvents();
    registerInstallPrompt();
    registerServiceWorker();
    setTimeout(hideLoader, 900);
  });
})();
