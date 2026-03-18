"use strict";

(function initAntarikshSathi() {
  const fallbackData = window.ANTARIKSH_DATA || {
    meta: { lastUpdated: "2026-03-19", sources: [] },
    events: [],
    launches: [],
    stargazing: [],
    agencies: [],
    curiosity: []
  };

  const STORAGE = {
    lang: "as-lang",
    theme: "as-theme",
    reminder: "as-reminder",
    notifEnabled: "as-notif-enabled",
    notifLastShown: "as-notif-last-shown",
    liveFetched: "as-live-last-fetched"
  };

  const DEFAULT_LOCATION = {
    labelHi: "Bharat default estimate",
    labelEn: "India default estimate",
    lat: 23.5937,
    lon: 78.9629
  };

  const PLANETS = [
    { id: "mercury", en: "Mercury", hi: "Budh", period: 87.969, offset: 75, color: "#cfd7db" },
    { id: "venus", en: "Venus", hi: "Shukra", period: 224.701, offset: 182, color: "#f7d17a" },
    { id: "earth", en: "Earth", hi: "Prithvi", period: 365.256, offset: 100, color: "#55b8ff" },
    { id: "mars", en: "Mars", hi: "Mangal", period: 686.98, offset: 355, color: "#ff7d65" },
    { id: "jupiter", en: "Jupiter", hi: "Brihaspati", period: 4332.59, offset: 34, color: "#ffd3a8" },
    { id: "saturn", en: "Saturn", hi: "Shani", period: 10759.22, offset: 50, color: "#f0df94" }
  ];

  const UI_COPY = {
    hi: {
      menuLabel: "Quick Controls",
      menuTitle: "Antariksh menu",
      languageLabel: "Language",
      languageTitle: "Hindi aur English",
      themeLabel: "Theme",
      themeTitle: "Alive sky mode",
      themeAction: "Theme badlo",
      installLabel: "Install",
      installTitle: "App ko phone par rakho",
      installAction: "Install app",
      reminderLabel: "Reminder",
      reminderTitle: "Night sky yaad dilao",
      reminderField: "Preferred reminder time",
      reminderSave: "Reminder save karo",
      pagesLabel: "Pages",
      pagesTitle: "Family links aur info",
      pageAbout: "About",
      pageResources: "Resources",
      pageContact: "Contact",
      pagePrivacy: "Privacy Policy",
      pageTerms: "Terms & Conditions",
      pageFamily: "Aapka-Sathi Family",
      brandTag: "Bharat ka daily sky desk",
      familyChip: "Aapka-Sathi family ka hissa",
      heroHeadline: "Aaj ka sky scene, ISRO watch aur space learning ek jagah.",
      heroText: "App khulte hi aaj ke din ka Moon, Sun aur planetary scene dikhega. Online hone par latest official space headlines bhi refresh hoti rahengi, aur offline mode me bhi core pack ready rahega.",
      liveDeskLabel: "Live desk",
      todaySkyLabel: "Aaj ka sky snapshot",
      moonLabel: "Chand",
      sunLabel: "Suraj",
      planetLabel: "Grah board",
      planetTitle: "Aaj ki grah sthiti",
      planetNote: "Yeh ek educational orbit view hai jo date ke saath daily update hota hai.",
      eventLabel: "Sky calendar",
      eventTitle: "Agla important sky event",
      launchLabel: "ISRO watch",
      launchTitle: "Missions aur programme pulse",
      curiosityLabel: "Student lab",
      curiosityTitle: "Space curiosity tool",
      curiosityButton: "Kuch naya dikhao",
      stargazeLabel: "India spots",
      stargazeTitle: "Rajya ke hisaab se stargazing spots",
      agencyLabel: "World agencies",
      agencyTitle: "Major space agencies directory",
      footerNote: "Daily sky aur space curiosity ko simple banane ke liye.",
      loadingLabel: "Space pack",
      loadingStart: "Orbit align ho raha hai...",
      loadingNext: "Aaj ke sky cards ready kiye ja rahe hain...",
      all: "Sab",
      meteor: "Meteor",
      eclipse: "Eclipse",
      planetary: "Planets",
      season: "Season",
      reminderSaved: (time) => `Roz ka local reminder ${time} par save ho gaya.`,
      reminderBlocked: "Browser notification permission off hai, isliye sirf time save hua hai.",
      installUnavailable: "Install prompt abhi available nahi hai. Browser menu se install try karo.",
      liveUpdated: (text) => `Aakhri online refresh: ${text}`,
      liveFallback: "Offline pack active hai",
      liveEmpty: "Filhal koi naya live headline nahi mila, lekin built-in pack ready hai.",
      skyForToday: (text) => `${text} ka visual`,
      skyMeta: (label) => `${label} | local date ke saath auto refresh`,
      sunriseMeta: (rise, set) => `Sunrise ${rise} · Sunset ${set}`,
      bestTime: "Sabse achha waqt",
      indiaView: "India view",
      eventSource: "Srot",
      nextEventTag: "Sabse paas wala event",
      launchSource: "Srot",
      spotlightMonths: "Best months",
      spotlightTip: "Practical tip",
      stateAll: "All India",
      searchPlaceholder: "ISRO, NASA, ESA...",
      officialSite: "Official site",
      officialSiteLater: "Official site baad me add ho sakti hai",
      agencyOrbitAngle: (value) => `Orbit angle ${value}°`,
      moonIllumination: (value, trend) => `Illumination ${value}% · ${trend}`,
      moonWaxing: "waxing",
      moonWaning: "waning",
      moonPhaseNew: "Amavasya ke paas",
      moonPhaseCrescent: "Patla crescent",
      moonPhaseQuarter: "Half moon zone",
      moonPhaseGibbous: "Gibbous phase",
      moonPhaseFull: "Purnima ke aas-paas",
      sunDay: "Din ka safar",
      sunNight: "Raat ka phase",
      sunLocalNote: "Ye estimate Bharat ke default latitude-longitude se nikala gaya hai.",
      curiosityTagAll: "Sab",
      curiosityTagRockets: "Rockets",
      curiosityTagMoon: "Moon",
      curiosityTagSun: "Sun",
      curiosityTagSky: "Sky",
      curiosityTagSatellites: "Satellites",
      curiosityTagEclipses: "Eclipses",
      curiosityTagPlanets: "Planets",
      curiosityTagMeteors: "Meteors",
      curiosityTagGravity: "Gravity",
      curiosityTagStars: "Stars",
      curiosityTagNavigation: "Navigation",
      curiosityTagLife: "Life"
    },
    en: {
      menuLabel: "Quick Controls",
      menuTitle: "Antariksh menu",
      languageLabel: "Language",
      languageTitle: "Hindi and English",
      themeLabel: "Theme",
      themeTitle: "Alive sky mode",
      themeAction: "Change theme",
      installLabel: "Install",
      installTitle: "Keep the app on your phone",
      installAction: "Install app",
      reminderLabel: "Reminder",
      reminderTitle: "Night sky reminder",
      reminderField: "Preferred reminder time",
      reminderSave: "Save reminder",
      pagesLabel: "Pages",
      pagesTitle: "Family links and info",
      pageAbout: "About",
      pageResources: "Resources",
      pageContact: "Contact",
      pagePrivacy: "Privacy Policy",
      pageTerms: "Terms & Conditions",
      pageFamily: "Aapka-Sathi Family",
      brandTag: "India's daily sky desk",
      familyChip: "Part of Aapka-Sathi family",
      heroHeadline: "Today’s sky scene, ISRO watch, and space learning in one place.",
      heroText: "As soon as the app opens, it shows the Moon, Sun, and planetary scene for the current day. When you are online it also refreshes official space headlines, while the core pack stays ready offline.",
      liveDeskLabel: "Live desk",
      todaySkyLabel: "Today's sky snapshot",
      moonLabel: "Moon",
      sunLabel: "Sun",
      planetLabel: "Planet board",
      planetTitle: "Today's planetary positioning",
      planetNote: "This is an educational orbit view that updates with the date every day.",
      eventLabel: "Sky calendar",
      eventTitle: "Next important sky event",
      launchLabel: "ISRO watch",
      launchTitle: "Mission and programme pulse",
      curiosityLabel: "Student lab",
      curiosityTitle: "Space curiosity tool",
      curiosityButton: "Show something new",
      stargazeLabel: "India spots",
      stargazeTitle: "Stargazing spots by state",
      agencyLabel: "World agencies",
      agencyTitle: "Major space agencies directory",
      footerNote: "Built to keep daily sky and space curiosity simple.",
      loadingLabel: "Space pack",
      loadingStart: "Aligning the orbit...",
      loadingNext: "Preparing today's sky cards...",
      all: "All",
      meteor: "Meteor",
      eclipse: "Eclipse",
      planetary: "Planets",
      season: "Season",
      reminderSaved: (time) => `A local daily reminder has been saved for ${time}.`,
      reminderBlocked: "Notification permission is off, so only the time was saved locally.",
      installUnavailable: "The install prompt is not available yet. Try the browser install option.",
      liveUpdated: (text) => `Last online refresh: ${text}`,
      liveFallback: "Offline pack active",
      liveEmpty: "No fresh live headline was found right now, but the built-in pack is ready.",
      skyForToday: (text) => `${text} visual`,
      skyMeta: (label) => `${label} | auto refreshes with the local date`,
      sunriseMeta: (rise, set) => `Sunrise ${rise} · Sunset ${set}`,
      bestTime: "Best time",
      indiaView: "India view",
      eventSource: "Source",
      nextEventTag: "Closest event",
      launchSource: "Official source",
      spotlightMonths: "Best months",
      spotlightTip: "Practical tip",
      stateAll: "All India",
      searchPlaceholder: "ISRO, NASA, ESA...",
      officialSite: "Official site",
      officialSiteLater: "Official site can be added later",
      agencyOrbitAngle: (value) => `Orbit angle ${value}°`,
      moonIllumination: (value, trend) => `Illumination ${value}% · ${trend}`,
      moonWaxing: "waxing",
      moonWaning: "waning",
      moonPhaseNew: "Near new moon",
      moonPhaseCrescent: "Thin crescent",
      moonPhaseQuarter: "Half-moon zone",
      moonPhaseGibbous: "Gibbous phase",
      moonPhaseFull: "Near full moon",
      sunDay: "Day arc",
      sunNight: "Night arc",
      sunLocalNote: "This estimate is calculated from India's default latitude and longitude.",
      curiosityTagAll: "All",
      curiosityTagRockets: "Rockets",
      curiosityTagMoon: "Moon",
      curiosityTagSun: "Sun",
      curiosityTagSky: "Sky",
      curiosityTagSatellites: "Satellites",
      curiosityTagEclipses: "Eclipses",
      curiosityTagPlanets: "Planets",
      curiosityTagMeteors: "Meteors",
      curiosityTagGravity: "Gravity",
      curiosityTagStars: "Stars",
      curiosityTagNavigation: "Navigation",
      curiosityTagLife: "Life"
    }
  };

  const EVENT_COPY = {
    "lunar-eclipse-mar": { hi: { title: "Total Lunar Eclipse", summary: "Yeh ek laal Moon type event hai jise dekhne se pehle local moonset aur sky clarity dekh lena best rahega.", indiaView: "India me visibility location aur moonset timing par depend karegi.", bestTime: "Subah se pehle ka waqt" } },
    "venus-saturn": { hi: { title: "Venus + Saturn close pairing", summary: "Subah ke aas-paas horizon clear ho to yeh simple naked-eye conjunction kaafi dramatic lag sakta hai.", indiaView: "Clear dawn horizon ho to low sky me dikh sakta hai.", bestTime: "Bahut early dawn" } },
    "march-equinox": { hi: { title: "March Equinox", summary: "Season change ka yeh marker evening sky observation aur classroom demos dono ke liye useful hai.", indiaView: "India me changing evening sky ko samajhne ka strong seasonal marker.", bestTime: "Equinox ke aas-paas pura week" } },
    lyrids: { hi: { title: "Lyrid Meteor Shower", summary: "Purane recorded meteor showers me se ek. Dark sky aur after-midnight window isko beginners ke liye strong pick banati hai.", indiaView: "Dark sky ho to midnight ke baad best lagega.", bestTime: "Late night se dawn" } },
    "eta-aquarids": { hi: { title: "Eta Aquariids", summary: "Halley’s Comet se juda fast meteor shower, jo sunrise se pehle zyada rewarding lagta hai.", indiaView: "South aur west side se pre-dawn view better ho sakta hai.", bestTime: "Pre-dawn" } },
    "southern-delta-aquariids": { hi: { title: "Southern Delta Aquariids", summary: "Yeh softer shower hai lekin dark location aur wide southern horizon ke saath achha experience deta hai.", indiaView: "Dark location aur broad southern horizon best rahenge.", bestTime: "Midnight ke baad" } },
    perseids: { hi: { title: "Perseid Meteor Shower", summary: "Clear sky ho to yeh saal ke easiest aur most-loved meteor showers me se ek rehta hai.", indiaView: "Beginners ke liye bhi easy aur rewarding shower.", bestTime: "Late night se dawn" } },
    "solar-eclipse-aug": { hi: { title: "Total Solar Eclipse elsewhere", summary: "India headline eclipse nahi hoga, lekin eclipse geometry aur classroom explanation ke liye yeh strong remote-view event hai.", indiaView: "India ke liye direct highlight nahi, par global follow karne layak.", bestTime: "Remote viewing" } },
    orionids: { hi: { title: "Orionid Meteor Shower", summary: "Post-monsoon sky ke saath yeh shower India me kaafi comfortable observation window deta hai.", indiaView: "Comfortable autumn skies isko rewarding banate hain.", bestTime: "Midnight se dawn" } },
    leonids: { hi: { title: "Leonid Meteor Shower", summary: "Fast meteors aur famous storm history ki wajah se yeh calm years me bhi interesting rehta hai.", indiaView: "Moon conditions achhi ho to India me watch karna worth it rahega.", bestTime: "Late night" } },
    geminids: { hi: { title: "Geminid Meteor Shower", summary: "Bright aur reliable meteors ke saath yeh December ka sabse easy recommendation ban jata hai.", indiaView: "Strong aur beginner-friendly year-end shower.", bestTime: "Night se dawn" } },
    ursids: { hi: { title: "Ursid Meteor Shower", summary: "Rates kam hote hain, lekin patient observer aur dark sky ke saath yeh bhi achha quiet winter watch ban sakta hai.", indiaView: "Dedicated observers ke liye better.", bestTime: "Late night" } }
  };

  const LAUNCH_COPY = {
    "Gaganyaan G1": { hi: { mission: "Gaganyaan G1", window: "Official ISRO update dekhte raho", status: "Watch", summary: "HLVM3-G1 / OM-1 uncrewed flight chain ka yeh key watch item hai jise public window shift ke saath follow karna chahiye.", note: "Fixed date ki jagah isse live watchlist milestone ki tarah treat karo." } },
    "Gaganyaan crewed mission": { hi: { mission: "Gaganyaan crewed mission", window: "Uncrewed validation flights ke baad", status: "Roadmap", summary: "Human-rating, abort readiness aur validation flights ka full sequence complete hone par crewed mission readiness strong hogi.", note: "Isse fixed launch date ki tarah nahi, programme roadmap ki tarah follow karo." } },
    "Aditya-L1 science operations": { hi: { mission: "Aditya-L1 science operations", window: "Abhi active", status: "Operational", summary: "India ka solar observatory L1 halo orbit se science operations aur solar study ko support kar raha hai.", note: "Classroom aur student curiosity ke liye yeh live mission bahut achha anchor hai." } },
    "Venus Orbiter Mission": { hi: { mission: "Venus Orbiter Mission", window: "Target 2028", status: "Planned", summary: "Yeh Indian planetary science ko long-term follow karne walon ke liye strong future mission story hai.", note: "Students ke liye future India mission tracking ka achha start point." } },
    "Chandrayaan legacy track": { hi: { mission: "Chandrayaan legacy track", window: "Abhi explore karo", status: "Study", summary: "Chandrayaan stories abhi bhi India-focused lunar learning aur student curiosity ka best gateway hain.", note: "New mission windows ke beech yeh strongest study track hai." } }
  };

  const CURIOSITY_COPY = {
    rockets: {
      hi: { title: "Rocket pehle seedha upar kyu jaata hai?", question: "Rocket launch ke baad turant tilt kyu nahi karta?", answer: "Rocket pehle dense atmosphere aur local obstacles se safely nikalta hai. Thoda upar jaane ke baad woh tilt karta hai taaki orbit ke liye horizontal speed build ho sake." },
      en: { title: "Why do rockets rise straight up first?", question: "Why does a rocket not tilt immediately after launch?", answer: "A rocket first climbs through the densest part of the atmosphere safely. After that it gradually tilts so it can build the horizontal speed needed for orbit." }
    },
    moon: {
      hi: { title: "Moon ka ek hi side kyu dikhta hai?", question: "Hum Moon ka far side seedha kyu nahi dekh paate?", answer: "Moon tidally locked hai. Woh apni axis par utni hi speed se ghoomta hai jitni speed se Earth ke around chakkar lagata hai, isliye lagbhag wahi face humein dikhai deta rehta hai." },
      en: { title: "Why do we keep seeing the same side of the Moon?", question: "Why can't we directly see the far side of the Moon?", answer: "The Moon is tidally locked. It rotates on its axis at almost the same rate at which it orbits Earth, so nearly the same face stays turned toward us." }
    },
    sun: {
      hi: { title: "Aditya-L1 special kyu hai?", question: "Aditya-L1 ko L1 point par hi kyu bheja gaya?", answer: "L1 se spacecraft ko Sun ka almost uninterrupted view milta hai. Earth aur Moon baar-baar beech me nahi aate, isliye solar activity ko lagatar observe karna possible hota hai." },
      en: { title: "Why is Aditya-L1 special?", question: "Why was Aditya-L1 sent to the L1 point?", answer: "From L1 the spacecraft gets a near-continuous view of the Sun. Earth and the Moon do not keep blocking it, so solar activity can be observed steadily." }
    },
    sky: {
      hi: { title: "Space me sky black kyu dikhta hai?", question: "Sunlight hone ke baad bhi background dark kyu lagta hai?", answer: "Earth par atmosphere sunlight ko scatter karta hai, isliye sky blue dikhta hai. Space me scattering medium nahi hota, isliye background black lagta hai." },
      en: { title: "Why is the sky dark in space?", question: "Why does the background stay dark even when sunlight exists?", answer: "On Earth, the atmosphere scatters sunlight and makes the sky look blue. In space there is no such scattering medium, so the background appears black." }
    },
    satellites: {
      hi: { title: "Satellite girta kyu nahi?", question: "Woh hawa me tike kaise rehte hain?", answer: "Satellite lagatar Earth ki taraf fall kar raha hota hai, lekin uski sideways speed itni high hoti hai ki woh Earth ki curve ko follow karta rehta hai. Isi balance ko orbit kehte hain." },
      en: { title: "Why doesn’t a satellite just fall down?", question: "How does it stay up there?", answer: "A satellite is constantly falling toward Earth, but its sideways speed is so high that it keeps missing the ground along Earth’s curved surface. That balance is orbit." }
    },
    planets: {
      hi: { title: "Mars laal kyu dikhta hai?", question: "Red Planet ka rang kahan se aata hai?", answer: "Mars ki surface par iron oxide, yani rust jaisa material, bahut hai. Sunlight jab us dusty surface se reflect hoti hai to red tone strong lagti hai." },
      en: { title: "Why does Mars look red?", question: "Where does the Red Planet colour come from?", answer: "Mars has a lot of iron oxide, basically rust-like material, on its surface. Sunlight reflecting from that dusty surface gives it the strong reddish tone." }
    },
    meteors: {
      hi: { title: "Meteor aur meteorite me farq", question: "Shooting star aur zameen tak pahunchne wale tukde me kya difference hai?", answer: "Jab chhota pathar atmosphere me jalta dikhe to woh meteor hai. Agar uska koi hissa zameen tak pahunch jaye to usse meteorite kehte hain." },
      en: { title: "Meteor vs meteorite", question: "What is the difference between a shooting star and a piece that reaches the ground?", answer: "When a small rock burns up in the atmosphere, we see a meteor. If any part of it reaches the ground, that piece is called a meteorite." }
    },
    gravity: {
      hi: { title: "ISS me gravity hoti hai ya nahi?", question: "Astronaut float karte hain to kya wahan gravity gayab hoti hai?", answer: "Gravity wahan hoti hai, aur kaafi strong hoti hai. ISS aur astronauts dono Earth ke around free-fall me hote hain, isliye unhe microgravity jaisa feel hota hai." },
      en: { title: "Is there gravity on the ISS?", question: "If astronauts float, does that mean gravity is gone there?", answer: "Gravity is very much present there. The ISS and the astronauts are both in continuous free-fall around Earth, which creates the microgravity feeling." }
    },
    eclipses: {
      hi: { title: "Lunar eclipse me Moon laal kyu hota hai?", question: "Blood Moon effect kahan se aata hai?", answer: "Earth ki atmosphere sunlight ko bend aur filter karke mostly red light ko Moon tak pahunchne deti hai. Isi liye lunar eclipse me Moon copper-red lag sakta hai." },
      en: { title: "Why does the Moon turn red during a lunar eclipse?", question: "Where does the Blood Moon effect come from?", answer: "Earth’s atmosphere bends and filters sunlight so that mostly red light reaches the Moon. That is why the eclipsed Moon can look copper-red." }
    },
    stars: {
      hi: { title: "Stars twinkle kyu karte hain?", question: "Kya space se bhi stars same tarah twinkle karte hain?", answer: "Twinkling Earth ke atmosphere ki wajah se hoti hai. Space se stars zyada stable dikhenge, kyunki hawa ki turbulent layers unki light ko distort nahi karti." },
      en: { title: "Why do stars twinkle?", question: "Do stars twinkle the same way from space?", answer: "Twinkling happens because of Earth’s atmosphere. From space, stars look steadier because turbulent air is not distorting their light." }
    },
    navigation: {
      hi: { title: "NavIC ka real use kya hai?", question: "India-focused navigation system daily life me kaise help karta hai?", answer: "NavIC positioning, timing, transport, marine navigation, disaster response aur strategic applications me help karta hai. Yeh India-focused system hai." },
      en: { title: "What is the real use of NavIC?", question: "How does an India-focused navigation system help in real life?", answer: "NavIC supports positioning, timing, transport, marine navigation, disaster response, and strategic applications. It is built with India-focused coverage in mind." }
    },
    life: {
      hi: { title: "Kya space me paudhe ug sakte hain?", question: "Long missions ke liye space farming possible hai kya?", answer: "Haan, lekin controlled light, water, nutrients aur airflow chahiye hota hai. Space farming future long-duration missions ke liye important area hai." },
      en: { title: "Can plants grow in space?", question: "Is space farming possible for long missions?", answer: "Yes, but it needs controlled light, water, nutrients, and airflow. Space farming is an important area for future long-duration missions." }
    }
  };

  const STATE_HI = { "All India": "All India", "Andhra Pradesh": "Andhra Pradesh", "Arunachal Pradesh": "Arunachal Pradesh", Assam: "Assam", Bihar: "Bihar", Chhattisgarh: "Chhattisgarh", Goa: "Goa", Gujarat: "Gujarat", Haryana: "Haryana", "Himachal Pradesh": "Himachal Pradesh", Jharkhand: "Jharkhand", Karnataka: "Karnataka", Kerala: "Kerala", "Madhya Pradesh": "Madhya Pradesh", Maharashtra: "Maharashtra", Manipur: "Manipur", Meghalaya: "Meghalaya", Mizoram: "Mizoram", Nagaland: "Nagaland", Odisha: "Odisha", Punjab: "Punjab", Rajasthan: "Rajasthan", Sikkim: "Sikkim", "Tamil Nadu": "Tamil Nadu", Telangana: "Telangana", Tripura: "Tripura", "Uttar Pradesh": "Uttar Pradesh", Uttarakhand: "Uttarakhand", "West Bengal": "West Bengal", "Andaman and Nicobar Islands": "Andaman and Nicobar Islands", Chandigarh: "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu": "Dadra and Nagar Haveli and Daman and Diu", Delhi: "Delhi", "Jammu and Kashmir": "Jammu and Kashmir", Ladakh: "Ladakh", Lakshadweep: "Lakshadweep", Puducherry: "Puducherry" };

  const COUNTRY_HI = { India: "India", "United States": "United States", Europe: "Europe", Japan: "Japan", China: "China", Russia: "Russia", Canada: "Canada", France: "France", Germany: "Germany", Italy: "Italy", "United Kingdom": "United Kingdom", "South Korea": "South Korea", "United Arab Emirates": "United Arab Emirates", Israel: "Israel", Australia: "Australia", Argentina: "Argentina", Brazil: "Brazil", "South Africa": "South Africa", Pakistan: "Pakistan", Nigeria: "Nigeria", Philippines: "Philippines", Egypt: "Egypt", "Saudi Arabia": "Saudi Arabia", Turkiye: "Turkiye", Mexico: "Mexico", Taiwan: "Taiwan", Ukraine: "Ukraine" };

  const state = {
    lang: localStorage.getItem(STORAGE.lang) || "hi",
    theme: localStorage.getItem(STORAGE.theme) || "night",
    eventFilter: "all",
    curiosityFilter: "all",
    stateFilter: UI_COPY.hi.stateAll,
    agencyQuery: "",
    reminderTime: localStorage.getItem(STORAGE.reminder) || "20:30",
    deferredPrompt: null,
    livePack: null,
    activeDate: new Date(),
    location: { ...DEFAULT_LOCATION }
  };

  let midnightTimer = null;
  let loadingTimer = null;

  const tagLabelMap = {
    all: { hi: UI_COPY.hi.curiosityTagAll, en: UI_COPY.en.curiosityTagAll },
    rockets: { hi: UI_COPY.hi.curiosityTagRockets, en: UI_COPY.en.curiosityTagRockets },
    moon: { hi: UI_COPY.hi.curiosityTagMoon, en: UI_COPY.en.curiosityTagMoon },
    sun: { hi: UI_COPY.hi.curiosityTagSun, en: UI_COPY.en.curiosityTagSun },
    sky: { hi: UI_COPY.hi.curiosityTagSky, en: UI_COPY.en.curiosityTagSky },
    satellites: { hi: UI_COPY.hi.curiosityTagSatellites, en: UI_COPY.en.curiosityTagSatellites },
    eclipses: { hi: UI_COPY.hi.curiosityTagEclipses, en: UI_COPY.en.curiosityTagEclipses },
    planets: { hi: UI_COPY.hi.curiosityTagPlanets, en: UI_COPY.en.curiosityTagPlanets },
    meteors: { hi: UI_COPY.hi.curiosityTagMeteors, en: UI_COPY.en.curiosityTagMeteors },
    gravity: { hi: UI_COPY.hi.curiosityTagGravity, en: UI_COPY.en.curiosityTagGravity },
    stars: { hi: UI_COPY.hi.curiosityTagStars, en: UI_COPY.en.curiosityTagStars },
    navigation: { hi: UI_COPY.hi.curiosityTagNavigation, en: UI_COPY.en.curiosityTagNavigation },
    life: { hi: UI_COPY.hi.curiosityTagLife, en: UI_COPY.en.curiosityTagLife }
  };

  const loadingMessages = {
    hi: [UI_COPY.hi.loadingStart, UI_COPY.hi.loadingNext],
    en: [UI_COPY.en.loadingStart, UI_COPY.en.loadingNext]
  };

  function $(id) {
    return document.getElementById(id);
  }

  function t(key) {
    return UI_COPY[state.lang][key];
  }

  function safeText(value) {
    return String(value ?? "");
  }

  function setTheme(theme) {
    state.theme = theme;
    document.body.dataset.theme = theme;
    localStorage.setItem(STORAGE.theme, theme);
  }

  function toggleTheme() {
    setTheme(state.theme === "night" ? "dawn" : "night");
  }

  function setLanguage(lang) {
    state.lang = lang;
    localStorage.setItem(STORAGE.lang, lang);
    document.documentElement.lang = lang === "hi" ? "hi" : "en";
    state.stateFilter = state.stateFilter === UI_COPY.hi.stateAll || state.stateFilter === UI_COPY.en.stateAll
      ? t("stateAll")
      : state.stateFilter;
    applyTextContent();
    renderAll();
  }

  function applyTextContent() {
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      const value = UI_COPY[state.lang][key];
      if (typeof value === "string") node.textContent = value;
    });

    $("agencySearch").placeholder = t("searchPlaceholder");
    $("langHiBtn").classList.toggle("active", state.lang === "hi");
    $("langEnBtn").classList.toggle("active", state.lang === "en");
  }

  function formatDate(date, options) {
    return new Intl.DateTimeFormat(state.lang === "hi" ? "hi-IN" : "en-IN", options).format(date);
  }

  function formatClock(minutes) {
    const hrs = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    const date = new Date();
    date.setHours(hrs, mins, 0, 0);
    return new Intl.DateTimeFormat(state.lang === "hi" ? "hi-IN" : "en-IN", {
      hour: "numeric",
      minute: "2-digit"
    }).format(date);
  }

  function normalizeEventDate(label) {
    const cleaned = label.replace(/^Peak:\s*/i, "");
    const parsed = new Date(cleaned);
    if (Number.isNaN(parsed.getTime())) return new Date("2100-01-01");
    parsed.setHours(12, 0, 0, 0);
    return parsed;
  }

  function daysSinceJ2000(date) {
    return (date.getTime() - Date.UTC(2000, 0, 1, 12, 0, 0)) / 86400000;
  }

  function getMoonData(date) {
    const synodicMonth = 29.53058867;
    const knownNewMoon = Date.UTC(2000, 0, 6, 18, 14, 0);
    const days = (date.getTime() - knownNewMoon) / 86400000;
    const phase = ((days % synodicMonth) + synodicMonth) % synodicMonth / synodicMonth;
    const illumination = (1 - Math.cos(phase * 2 * Math.PI)) / 2;
    const waxing = phase < 0.5;
    let phaseNameKey = "moonPhaseNew";
    if (phase > 0.08 && phase <= 0.25) phaseNameKey = "moonPhaseCrescent";
    if (phase > 0.25 && phase <= 0.5) phaseNameKey = "moonPhaseQuarter";
    if (phase > 0.5 && phase <= 0.92) phaseNameKey = "moonPhaseGibbous";
    if (phase > 0.92 || phase <= 0.08) phaseNameKey = "moonPhaseNew";
    if (illumination > 0.96) phaseNameKey = "moonPhaseFull";
    return { phase, illumination, waxing, phaseName: t(phaseNameKey) };
  }

  function getSolarTimes(date, lat, lon) {
    const start = new Date(date);
    start.setHours(12, 0, 0, 0);
    const startOfYear = new Date(start.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((start - startOfYear) / 86400000);
    const gamma = 2 * Math.PI / 365 * (dayOfYear - 1);
    const eqtime = 229.18 * (
      0.000075
      + 0.001868 * Math.cos(gamma)
      - 0.032077 * Math.sin(gamma)
      - 0.014615 * Math.cos(2 * gamma)
      - 0.040849 * Math.sin(2 * gamma)
    );
    const decl = 0.006918
      - 0.399912 * Math.cos(gamma)
      + 0.070257 * Math.sin(gamma)
      - 0.006758 * Math.cos(2 * gamma)
      + 0.000907 * Math.sin(2 * gamma)
      - 0.002697 * Math.cos(3 * gamma)
      + 0.00148 * Math.sin(3 * gamma);
    const latRad = lat * Math.PI / 180;
    const hourAngle = Math.acos(
      Math.min(1, Math.max(-1,
        (Math.cos(90.833 * Math.PI / 180) / (Math.cos(latRad) * Math.cos(decl))) - Math.tan(latRad) * Math.tan(decl)
      ))
    ) * 180 / Math.PI;
    const timezoneOffsetHours = -date.getTimezoneOffset() / 60;
    const solarNoon = 720 - 4 * lon - eqtime + timezoneOffsetHours * 60;
    const sunrise = solarNoon - hourAngle * 4;
    const sunset = solarNoon + hourAngle * 4;
    return { sunrise, sunset, solarNoon };
  }

  function getCurrentMinutes(date) {
    return date.getHours() * 60 + date.getMinutes();
  }

  function getPlanetPositions(date) {
    const days = daysSinceJ2000(date);
    return PLANETS.map((planet) => {
      const angle = ((days / planet.period) * 360 + planet.offset) % 360;
      return { ...planet, angle: angle < 0 ? angle + 360 : angle };
    });
  }

  function translateFocus(focus) {
    if (state.lang === "en") return focus;
    return focus
      .replace("Launches", "launches")
      .replace("space science", "space science")
      .replace("navigation", "navigation")
      .replace("Earth observation", "Earth observation")
      .replace("Human spaceflight", "human spaceflight")
      .replace("science", "science")
      .replace("planetary exploration", "planetary exploration")
      .replace("Robotics", "robotics")
      .replace("applications", "applications");
  }

  function eventAccent(type) {
    return ({ meteor: "#6ce4ff", eclipse: "#ff6f5b", planetary: "#ffd36c", season: "#6ff2b1" })[type] || "#6ce4ff";
  }

  function localizeEvent(item) {
    const translated = EVENT_COPY[item.id]?.[state.lang];
    const date = normalizeEventDate(item.dateLabel);
    return {
      ...item,
      title: translated?.title || item.title,
      summary: translated?.summary || item.summary,
      indiaView: translated?.indiaView || item.indiaView,
      bestTime: translated?.bestTime || item.bestTime,
      parsedDate: date,
      formattedDate: formatDate(date, { day: "numeric", month: "long", year: "numeric" })
    };
  }

  function localizeLaunch(item) {
    const translated = LAUNCH_COPY[item.mission]?.[state.lang];
    return {
      ...item,
      mission: translated?.mission || item.mission,
      window: translated?.window || item.window,
      status: translated?.status || item.status,
      summary: translated?.summary || item.summary,
      note: translated?.note || item.note
    };
  }

  function localizeCuriosity(item) {
    const translated = CURIOSITY_COPY[item.tag]?.[state.lang];
    return {
      tag: tagLabelMap[item.tag]?.[state.lang] || item.tag,
      title: translated?.title || item.title,
      question: translated?.question || item.question,
      answer: translated?.answer || item.answer
    };
  }

  function localizeCountry(name) {
    return state.lang === "hi" ? (COUNTRY_HI[name] || name) : name;
  }

  function localizeState(name) {
    return state.lang === "hi" ? (STATE_HI[name] || name) : name;
  }

  function getUpcomingEvent() {
    const today = new Date(state.activeDate);
    today.setHours(0, 0, 0, 0);
    const sorted = fallbackData.events.map(localizeEvent).sort((a, b) => a.parsedDate - b.parsedDate);
    return sorted.find((item) => item.parsedDate >= today) || sorted[0];
  }

  function createStatusStrip() {
    const liveTime = state.livePack?.generatedAt
      ? formatDate(new Date(state.livePack.generatedAt), { day: "numeric", month: "short" })
      : (fallbackData.meta.lastUpdated || "n/a");

    $("statusStrip").innerHTML = [
      `${formatDate(state.activeDate, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`,
      state.lang === "hi" ? `${fallbackData.stargazing.length} India spots` : `${fallbackData.stargazing.length} India spots`,
      state.lang === "hi" ? `${fallbackData.agencies.length} agency profiles` : `${fallbackData.agencies.length} agency profiles`,
      state.lang === "hi" ? `live pack ${liveTime}` : `live pack ${liveTime}`
    ].map((item) => `<span class="status-pill">${safeText(item)}</span>`).join("");

    $("todaySkyTitle").textContent = t("skyForToday")(formatDate(state.activeDate, {
      day: "numeric",
      month: "long",
      year: "numeric"
    }));
    $("todaySkyMeta").textContent = t("skyMeta")(state.lang === "hi" ? state.location.labelHi : state.location.labelEn);
  }

  function renderLiveFeed() {
    const container = $("liveFeedList");
    const updated = $("liveFeedUpdated");
    const items = state.livePack?.headlines || [];

    if (items.length) {
      container.innerHTML = items.slice(0, 3).map((item) => `
        <article class="live-item">
          <span class="live-source">${safeText(item.source)}</span>
          <strong>${safeText(item.title)}</strong>
          <span class="muted">${safeText(item.summary)}</span>
        </article>
      `).join("");
      updated.textContent = t("liveUpdated")(formatDate(new Date(state.livePack.generatedAt), {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit"
      }));
      return;
    }

    container.innerHTML = `<article class="live-item"><strong>${t("liveFallback")}</strong><span class="muted">${t("liveEmpty")}</span></article>`;
    updated.textContent = t("liveFallback");
  }

  function renderSkySnapshot() {
    const moon = getMoonData(state.activeDate);
    const solar = getSolarTimes(state.activeDate, state.location.lat, state.location.lon);
    const currentMinutes = getCurrentMinutes(state.activeDate);
    const span = Math.max(1, solar.sunset - solar.sunrise);
    const progress = Math.min(1, Math.max(0, (currentMinutes - solar.sunrise) / span));
    const moonShadow = $("moonShadow");
    const sunDot = $("sunDot");

    const moonShift = (moon.waxing ? 1 : -1) * (1 - moon.illumination) * 52;
    moonShadow.style.transform = `translateX(${moonShift}px)`;
    moonShadow.style.opacity = String(Math.min(1, 0.08 + (1 - moon.illumination) * 1.2));

    $("moonTitle").textContent = moon.phaseName;
    $("moonMeta").textContent = t("moonIllumination")(Math.round(moon.illumination * 100), moon.waxing ? t("moonWaxing") : t("moonWaning"));

    sunDot.style.left = `${10 + progress * 80}%`;
    sunDot.style.bottom = `${16 + Math.sin(progress * Math.PI) * 78}px`;
    $("sunTitle").textContent = currentMinutes >= solar.sunrise && currentMinutes <= solar.sunset ? t("sunDay") : t("sunNight");
    $("sunMeta").textContent = `${t("sunriseMeta")(formatClock(solar.sunrise), formatClock(solar.sunset))} · ${t("sunLocalNote")}`;
  }

  function renderPlanetBoard() {
    const board = $("planetBoard");
    const legend = $("planetLegend");
    const positions = getPlanetPositions(state.activeDate);
    const width = board.clientWidth || 520;
    const height = board.clientHeight || 368;
    const cx = width / 2;
    const cy = height / 2;
    const maxRadius = Math.min(width, height) / 2 - 26;
    const step = maxRadius / (positions.length + 1);

    board.innerHTML = `<div class="sun-core"></div>`;

    positions.forEach((planet, index) => {
      const radius = step * (index + 1);
      const angleRad = (planet.angle - 90) * Math.PI / 180;
      const x = cx + Math.cos(angleRad) * radius;
      const y = cy + Math.sin(angleRad) * radius;

      const ring = document.createElement("div");
      ring.className = "orbit-ring";
      ring.style.width = `${radius * 2}px`;
      ring.style.height = `${radius * 2}px`;
      board.appendChild(ring);

      const dot = document.createElement("div");
      dot.className = "planet-dot";
      dot.style.background = planet.color;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      board.appendChild(dot);

      const label = document.createElement("span");
      label.className = "planet-label";
      label.style.left = `${x}px`;
      label.style.top = `${y}px`;
      label.textContent = state.lang === "hi" ? planet.hi : planet.en;
      board.appendChild(label);
    });

    legend.innerHTML = positions.map((planet) => `
      <article class="planet-legend-item">
        <div class="planet-legend-top">
          <strong><span class="planet-pill" style="background:${planet.color}"></span>${state.lang === "hi" ? planet.hi : planet.en}</strong>
          <span class="muted">${t("agencyOrbitAngle")(Math.round(planet.angle))}</span>
        </div>
        <p>${state.lang === "hi" ? "Date badalte hi orbit angle bhi automatically update hota hai." : "The orbit angle updates automatically with the date."}</p>
      </article>
    `).join("");
  }

  function renderEventFilters() {
    const filters = [["all", t("all")], ["meteor", t("meteor")], ["eclipse", t("eclipse")], ["planetary", t("planetary")], ["season", t("season")]];
    $("eventFilters").innerHTML = filters.map(([value, label]) => `
      <button class="chip ${state.eventFilter === value ? "chip-active" : ""}" type="button" data-event-filter="${value}">${label}</button>
    `).join("");
  }

  function renderEvents() {
    const upcoming = getUpcomingEvent();
    $("eventSpotlight").innerHTML = `
      <div>
        <p class="eyebrow">${t("nextEventTag")}</p>
        <h3>${safeText(upcoming.title)}</h3>
        <p>${safeText(upcoming.summary)}</p>
      </div>
      <div class="event-meta">
        <span><strong>${t("bestTime")}:</strong> ${safeText(upcoming.bestTime)}</span>
        <span><strong>${t("indiaView")}:</strong> ${safeText(upcoming.indiaView)}</span>
        <span><strong>${t("eventSource")}:</strong> ${safeText(upcoming.source)}</span>
      </div>
    `;

    const items = fallbackData.events.map(localizeEvent).filter((item) => state.eventFilter === "all" || item.type === state.eventFilter).sort((a, b) => a.parsedDate - b.parsedDate);
    $("eventsGrid").innerHTML = items.map((item) => `
      <article class="space-card">
        <span class="status-pill" style="border-color:${eventAccent(item.type)}33;color:${eventAccent(item.type)}">${safeText(item.type)}</span>
        <h3>${safeText(item.title)}</h3>
        <p class="card-date">${safeText(item.formattedDate)}</p>
        <p>${safeText(item.summary)}</p>
        <p class="muted">${safeText(item.indiaView)}</p>
      </article>
    `).join("");
  }

  function renderLaunches() {
    $("launchGrid").innerHTML = fallbackData.launches.map((item) => {
      const launch = localizeLaunch(item);
      return `
        <article class="launch-card">
          <p class="eyebrow">${safeText(launch.agency)}</p>
          <h3>${safeText(launch.mission)}</h3>
          <p class="card-date">${safeText(launch.status)} · ${safeText(launch.window)}</p>
          <p>${safeText(launch.summary)}</p>
          <p class="muted">${safeText(launch.note)}</p>
          <p class="muted">${t("launchSource")}: ${safeText(launch.source)}</p>
        </article>
      `;
    }).join("");
  }

  function renderCuriosityFilters() {
    const tags = ["all", ...new Set(fallbackData.curiosity.map((item) => item.tag))];
    $("curiosityFilters").innerHTML = tags.map((tag) => `
      <button class="chip ${state.curiosityFilter === tag ? "chip-active" : ""}" type="button" data-curiosity-filter="${tag}">
        ${tagLabelMap[tag]?.[state.lang] || tag}
      </button>
    `).join("");
  }

  function getCuriosityPool() {
    const pool = state.curiosityFilter === "all"
      ? fallbackData.curiosity
      : fallbackData.curiosity.filter((item) => item.tag === state.curiosityFilter);
    return pool.length ? pool : fallbackData.curiosity;
  }

  function renderCuriosity(random) {
    const pool = getCuriosityPool();
    const item = random ? pool[Math.floor(Math.random() * pool.length)] : pool[0];
    const copy = localizeCuriosity(item);
    $("curiosityCard").innerHTML = `
      <p class="eyebrow">${safeText(copy.tag)}</p>
      <h3>${safeText(copy.title)}</h3>
      <p><strong>${safeText(copy.question)}</strong></p>
      <p>${safeText(copy.answer)}</p>
    `;
  }

  function renderStateOptions() {
    const states = [t("stateAll"), ...fallbackData.stargazing.map((item) => localizeState(item.state))];
    if (!states.includes(state.stateFilter)) state.stateFilter = t("stateAll");
    $("stateSelect").innerHTML = states.map((item) => `
      <option value="${safeText(item)}" ${item === state.stateFilter ? "selected" : ""}>${safeText(item)}</option>
    `).join("");
  }

  function getFilteredSpots() {
    if (state.stateFilter === t("stateAll")) return fallbackData.stargazing;
    return fallbackData.stargazing.filter((item) => localizeState(item.state) === state.stateFilter);
  }

  function renderStargazing() {
    const spots = getFilteredSpots();
    const lead = spots[0] || fallbackData.stargazing[0];

    $("spotlightCard").innerHTML = `
      <div>
        <p class="eyebrow">${safeText(localizeState(lead.state))}</p>
        <h3>${safeText(lead.location)}</h3>
        <p>${state.lang === "hi" ? "Yeh spot wide horizon aur relatively calmer sky experience ke liye useful maana jata hai." : safeText(lead.why)}</p>
      </div>
      <div>
        <p><strong>${t("spotlightMonths")}:</strong> ${safeText(lead.bestMonths)}</p>
        <p class="muted"><strong>${t("spotlightTip")}:</strong> ${state.lang === "hi" ? "Moonless ya clearer night choose karo, aur local weather check karke niklo." : safeText(lead.note)}</p>
      </div>
    `;

    $("stargazingGrid").innerHTML = spots.map((item) => `
      <article class="mini-card">
        <p class="eyebrow">${safeText(localizeState(item.state))}</p>
        <h3>${safeText(item.location)}</h3>
        <p>${state.lang === "hi" ? "Beginner-friendly sky break ke liye useful location." : safeText(item.why)}</p>
        <p class="muted">${t("spotlightMonths")}: ${safeText(item.bestMonths)}</p>
      </article>
    `).join("");
  }

  function renderAgencies() {
    const query = state.agencyQuery.trim().toLowerCase();
    const agencies = fallbackData.agencies.filter((item) => {
      const haystack = `${item.code} ${item.name} ${item.country} ${item.focus}`.toLowerCase();
      return !query || haystack.includes(query);
    });

    $("agencyGrid").innerHTML = agencies.map((item) => `
      <article class="mini-card agency-card">
        <p class="eyebrow">${safeText(item.code)}</p>
        <h3>${safeText(item.name)}</h3>
        <p class="agency-meta">${safeText(localizeCountry(item.country))}</p>
        <p>${safeText(state.lang === "hi"
          ? `${localizeCountry(item.country)} ki yeh agency missions, science, satellites aur space programme par kaam karti hai.`
          : translateFocus(item.focus))}</p>
        ${item.website ? `<a class="agency-link" href="${item.website}" target="_blank" rel="noreferrer">${t("officialSite")}</a>` : `<span class="muted">${t("officialSiteLater")}</span>`}
      </article>
    `).join("");
  }

  async function saveReminder() {
    const value = $("reminderTime").value || "20:30";
    state.reminderTime = value;
    localStorage.setItem(STORAGE.reminder, value);
    let message = t("reminderSaved")(value);

    if ("Notification" in window && Notification.permission === "default") {
      const permission = await Notification.requestPermission();
      localStorage.setItem(STORAGE.notifEnabled, permission === "granted" ? "true" : "false");
      if (permission !== "granted") message = t("reminderBlocked");
    } else if ("Notification" in window && Notification.permission === "granted") {
      localStorage.setItem(STORAGE.notifEnabled, "true");
    }

    $("reminderStatus").textContent = message;
  }

  function maybeSendReminder() {
    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") return;
    if (localStorage.getItem(STORAGE.notifEnabled) !== "true") return;

    const now = new Date();
    const [hours, minutes] = state.reminderTime.split(":").map(Number);
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const targetMinutes = hours * 60 + minutes;
    if (Math.abs(currentMinutes - targetMinutes) > 60) return;

    const lastShown = Number(localStorage.getItem(STORAGE.notifLastShown) || "0");
    if (Date.now() - lastShown < 24 * 60 * 60 * 1000) return;

    new Notification("Antariksh Sathi", {
      body: state.lang === "hi" ? "Aaj ka sky snapshot aur next event dekh lo." : "Check today's sky snapshot and the next key event.",
      icon: "logo.svg",
      tag: "antariksh-daily-reminder"
    });
    localStorage.setItem(STORAGE.notifLastShown, String(Date.now()));
  }

  function openDrawer() {
    $("drawer").classList.add("drawer-open");
    $("drawer").setAttribute("aria-hidden", "false");
  }

  function closeDrawer() {
    $("drawer").classList.remove("drawer-open");
    $("drawer").setAttribute("aria-hidden", "true");
  }

  async function fetchLivePack(force) {
    const lastFetched = Number(localStorage.getItem(STORAGE.liveFetched) || "0");
    if (!force && Date.now() - lastFetched < 30 * 60 * 1000) {
      renderLiveFeed();
      return;
    }

    try {
      const response = await fetch(`./live-pack.json?ts=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) throw new Error(`live-pack ${response.status}`);
      state.livePack = await response.json();
      localStorage.setItem(STORAGE.liveFetched, String(Date.now()));
    } catch (error) {
      console.error(error);
      if (!state.livePack) state.livePack = { generatedAt: fallbackData.meta.lastUpdated, headlines: [] };
    }

    renderLiveFeed();
    createStatusStrip();
  }

  function startLoadingLoop() {
    const messages = loadingMessages[state.lang];
    let index = 0;
    $("loadingMessage").textContent = messages[index];
    clearInterval(loadingTimer);
    loadingTimer = setInterval(() => {
      index = (index + 1) % messages.length;
      $("loadingMessage").textContent = messages[index];
    }, 1200);
  }

  function stopLoadingLoop() {
    clearInterval(loadingTimer);
    $("loadingShell").classList.add("loading-hidden");
  }

  function scheduleMidnightRefresh() {
    clearTimeout(midnightTimer);
    const now = new Date();
    const next = new Date(now);
    next.setHours(24, 1, 0, 0);
    midnightTimer = setTimeout(() => {
      state.activeDate = new Date();
      renderAll();
      fetchLivePack(true);
      scheduleMidnightRefresh();
    }, next.getTime() - now.getTime());
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
        renderCuriosity(false);
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
    $("themeBtn").addEventListener("click", () => {
      toggleTheme();
      applyTextContent();
    });
    $("openDrawerBtn").addEventListener("click", openDrawer);
    $("closeDrawerBtn").addEventListener("click", closeDrawer);
    $("drawer").addEventListener("click", (event) => {
      if (event.target.id === "drawer") closeDrawer();
    });

    $("langHiBtn").addEventListener("click", () => setLanguage("hi"));
    $("langEnBtn").addEventListener("click", () => setLanguage("en"));

    $("installBtn").addEventListener("click", async () => {
      if (!state.deferredPrompt) {
        alert(t("installUnavailable"));
        return;
      }
      state.deferredPrompt.prompt();
      await state.deferredPrompt.userChoice;
      state.deferredPrompt = null;
    });

    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      state.deferredPrompt = event;
    });

    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js").catch(() => {});
      });
    }

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        state.activeDate = new Date();
        renderSkySnapshot();
        renderPlanetBoard();
        maybeSendReminder();
        fetchLivePack(false);
      }
    });

    window.addEventListener("resize", () => renderPlanetBoard());
  }

  function renderAll() {
    $("reminderTime").value = state.reminderTime;
    applyTextContent();
    createStatusStrip();
    renderLiveFeed();
    renderSkySnapshot();
    renderPlanetBoard();
    renderEventFilters();
    renderEvents();
    renderLaunches();
    renderCuriosityFilters();
    renderCuriosity(false);
    renderStateOptions();
    renderStargazing();
    renderAgencies();
  }

  document.addEventListener("DOMContentLoaded", async () => {
    document.documentElement.lang = state.lang === "hi" ? "hi" : "en";
    setTheme(state.theme);
    startLoadingLoop();
    bindEvents();
    renderAll();
    await fetchLivePack(true);
    maybeSendReminder();
    scheduleMidnightRefresh();
    stopLoadingLoop();
  });
})();
