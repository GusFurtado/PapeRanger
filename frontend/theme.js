// Loaded in <head> so the saved theme is applied before the first paint. A theme is
// one of six classes from the RPG icon set plus a mode (auto, light or dark); the
// colors live in style.css. `accent` and `dark` here only draw the swatches in the
// picker and the browser's theme-color.
var THEMES = [
  { id: 'wizard', accent: '#6a2b8f', darkAccent: '#ce79f5', dark: '#110d18' },
  { id: 'dragoon', accent: '#c62828', darkAccent: '#ee7b72', dark: '#110d18' },
  { id: 'ranger', accent: '#2e7d32', darkAccent: '#9ccc65', dark: '#09120e' },
  { id: 'paladin', accent: '#1565c0', darkAccent: '#42a5f5', dark: '#091018' },
  { id: 'monk', accent: '#b54f00', darkAccent: '#ffa726', dark: '#130f09' },
  { id: 'necromancer', accent: '#047c6f', darkAccent: '#26c6da', dark: '#091115' }
];
var DEFAULT_THEME = 'ranger';
var MODES = ['auto', 'light', 'dark'];
var LIGHT_BG = '#f9f9f7';
// Themes from earlier versions, and the class and mode that took each one's place.
var RENAMED_THEMES = {
  auto: ['ranger', 'auto'], light: ['ranger', 'light'], dark: ['ranger', 'dark'],
  forest: ['ranger', 'dark'], midnight: ['paladin', 'dark'], plum: ['wizard', 'dark'],
  sky: ['paladin', 'light'], paper: ['monk', 'light'], rose: ['dragoon', 'light']
};

// The app was called Papelada, and kept its preferences under that prefix:
// carry them over once, so a rename doesn't reset the theme or the open section.
(function () {
  try {
    ['theme', 'activeSection'].forEach(function (name) {
      var old = localStorage.getItem('papelada.' + name);
      if (old === null) return;
      if (localStorage.getItem('paperanger.' + name) === null) localStorage.setItem('paperanger.' + name, old);
      localStorage.removeItem('papelada.' + name);
    });
  } catch (e) { /* storage unavailable */ }
})();

var THEME = (function () {
  var KEY = 'paperanger.theme';
  var MODE_KEY = 'paperanger.mode';
  var systemDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function find(id) {
    for (var i = 0; i < THEMES.length; i++) {
      if (THEMES[i].id === id) return THEMES[i];
    }
    return null;
  }

  function load(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; /* storage unavailable */ }
  }

  function save(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* storage unavailable: just don't remember */ }
  }

  // An old theme name becomes its class and mode, once.
  (function migrate() {
    var old = RENAMED_THEMES[load(KEY)];
    if (!old) return;
    save(KEY, old[0]);
    if (load(MODE_KEY) === null) save(MODE_KEY, old[1]);
  })();

  function current() {
    return find(load(KEY)) || find(DEFAULT_THEME);
  }

  function mode() {
    var saved = load(MODE_KEY);
    return MODES.indexOf(saved) !== -1 ? saved : 'auto';
  }

  function isDark() {
    var m = mode();
    return m === 'dark' || (m === 'auto' && !!systemDark && systemDark.matches);
  }

  function apply() {
    var theme = current();
    var dark = isDark();
    var root = document.documentElement;
    root.setAttribute('data-theme', theme.id);
    root.setAttribute('data-mode', dark ? 'dark' : 'light');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? theme.dark : LIGHT_BG);
    return theme;
  }

  function set(id) {
    if (find(id)) save(KEY, id);
    return apply();
  }

  function setMode(m) {
    if (MODES.indexOf(m) !== -1) save(MODE_KEY, m);
    return apply();
  }

  // While the mode is "auto", follow the system when it switches.
  if (systemDark && systemDark.addEventListener) {
    systemDark.addEventListener('change', apply);
  }

  return { current: current, mode: mode, isDark: isDark, apply: apply, set: set, setMode: setMode };
})();

THEME.apply();
