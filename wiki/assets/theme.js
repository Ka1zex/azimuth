/* Apply before styles are loaded, so a saved Dark theme does not flash Screen. */
(function () {
  'use strict';
  var theme = 'screen';
  try {
    if (localStorage.getItem('azimuth-theme') === 'dark') theme = 'dark';
  } catch (error) { /* Storage can be unavailable for local files or private browsing. */ }
  document.documentElement.dataset.theme = theme;
})();
