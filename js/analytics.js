/* ============================================================
   ANALYTICS — Azure Application Insights
   No-ops unless CONFIG.APPINSIGHTS_CONNECTION_STRING is set.
   Location (city/state/country) is derived server-side from the
   request IP by App Insights; device/browser/OS come from the
   user agent. Nothing here prompts the user for anything.
   ============================================================ */
const Analytics = (() => {
  const CDN = "https://js.monitor.azure.com/scripts/b/ai.3.gbl.min.js";
  let ai = null;
  const queue = []; // calls made before the SDK finishes loading

  // Extra device context beyond what App Insights infers on its own.
  function deviceProps() {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
    return {
      platform: (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || "",
      mobile: navigator.userAgentData ? navigator.userAgentData.mobile : /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent),
      screen: `${screen.width}x${screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      pixelRatio: window.devicePixelRatio || 1,
      installedPwa: standalone,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }

  function init() {
    const cs = typeof CONFIG !== "undefined" && CONFIG.APPINSIGHTS_CONNECTION_STRING;
    if (!cs) return;
    const script = document.createElement("script");
    script.src = CDN;
    script.crossOrigin = "anonymous";
    script.onload = () => {
      try {
        ai = new Microsoft.ApplicationInsights.ApplicationInsights({
          config: { connectionString: cs, disableFetchTracking: true, disableAjaxTracking: true },
        });
        ai.loadAppInsights();
        ai.addTelemetryInitializer((item) => {
          item.baseData = item.baseData || {};
          item.baseData.properties = Object.assign({}, deviceProps(), item.baseData.properties);
        });
        ai.trackPageView({ name: "session_start" });
        queue.splice(0).forEach((q) => ai.trackEvent({ name: q.name }, q.props));
      } catch (e) {
        ai = null;
      }
    };
    document.head.appendChild(script);
  }

  function track(name, props) {
    if (ai) ai.trackEvent({ name }, props);
    else if (queue.length < 50) queue.push({ name, props });
  }

  function flush() {
    if (ai) ai.flush(false); // false = send synchronously via beacon
  }
  window.addEventListener("pagehide", flush);

  init();
  return { track };
})();
