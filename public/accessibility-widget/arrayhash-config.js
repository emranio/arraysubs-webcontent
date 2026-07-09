(function () {
  var MOBILE_WIDGET_QUERY = "(max-width: 39.999rem)";

  function cleanText(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function isMobileWidgetViewport() {
    return (
      typeof window.matchMedia === "function" &&
      window.matchMedia(MOBILE_WIDGET_QUERY).matches
    );
  }

  function simplifySelection(text) {
    var clean = cleanText(text).slice(0, 1500);

    if (!clean) {
      return Promise.resolve("Select a sentence or paragraph to simplify it.");
    }

    var simpler = clean
      .replace(/\butilize\b/gi, "use")
      .replace(/\bfacilitate\b/gi, "help")
      .replace(/\bapproximately\b/gi, "about")
      .replace(/\bprior to\b/gi, "before")
      .replace(/\bsubsequent to\b/gi, "after")
      .replace(/\bin order to\b/gi, "to")
      .replace(/\bcommence\b/gi, "start")
      .replace(/\bterminate\b/gi, "end")
      .replace(/\btherefore\b/gi, "so")
      .replace(/\bhowever\b/gi, "but");

    var sentences = simpler.match(/[^.!?]+[.!?]?/g) || [simpler];
    var summary = sentences.slice(0, 2).join(" ").trim();

    if (sentences.length > 2) {
      summary += " This keeps the main point and removes extra detail.";
    }

    return Promise.resolve("Plain-language version: " + summary);
  }

  function setInert(element, isInert) {
    if (!element) return;

    if ("inert" in element) {
      element.inert = isInert;
    }

    if (isInert) {
      element.setAttribute("aria-hidden", "true");
    } else {
      element.removeAttribute("aria-hidden");
    }
  }

  function dedupeAccessibilityWidgetRoots() {
    var roots = Array.prototype.slice.call(
      document.querySelectorAll(".accessibility-widget-root"),
    );

    if (roots.length <= 1) return roots[0] || null;

    var rootToKeep = roots[roots.length - 1];

    roots.slice(0, -1).forEach(function (root) {
      root.remove();
    });

    return rootToKeep;
  }

  function syncPanelAccessibility() {
    var root = dedupeAccessibilityWidgetRoots();
    var trigger = root
      ? root.querySelector(".accessibility-widget-trigger")
      : document.querySelector(".accessibility-widget-trigger");
    var panel = root
      ? root.querySelector(".accessibility-widget-panel")
      : document.querySelector(".accessibility-widget-panel");
    var overlay = root
      ? root.querySelector(".accessibility-widget-overlay")
      : document.querySelector(".accessibility-widget-overlay");
    var isOpen = trigger && trigger.getAttribute("aria-expanded") === "true";

    setInert(panel, !isOpen);
    setInert(overlay, !isOpen);
  }

  function installPanelAccessibilitySync() {
    var observer = new MutationObserver(syncPanelAccessibility);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["aria-expanded"],
    });

    syncPanelAccessibility();
  }

  function isTextEntryElement(element) {
    if (!element) return false;

    var tagName = element.tagName ? element.tagName.toLowerCase() : "";

    return (
      element.isContentEditable ||
      tagName === "input" ||
      tagName === "textarea" ||
      tagName === "select"
    );
  }

  function toggleWidget() {
    if (isMobileWidgetViewport()) return;

    var root = dedupeAccessibilityWidgetRoots();
    var trigger = root
      ? root.querySelector(".accessibility-widget-trigger")
      : document.querySelector(".accessibility-widget-trigger");

    if (trigger) {
      trigger.click();
      window.setTimeout(syncPanelAccessibility, 0);
    }
  }

  function handleMacSafeShortcut(event) {
    if (isMobileWidgetViewport()) return;

    if (
      !event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      isTextEntryElement(document.activeElement)
    ) {
      return;
    }

    var key = String(event.key || "").toLowerCase();
    var isPhysicalA = event.code === "KeyA";
    var isAltA = key === "a" || key === "å";

    if (!isPhysicalA && !isAltA) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (typeof event.stopImmediatePropagation === "function") {
      event.stopImmediatePropagation();
    }

    toggleWidget();
  }

  document.addEventListener("keydown", handleMacSafeShortcut, true);

  function setMobileHiddenFallback(isHidden) {
    [
      ".accessibility-widget-root",
      ".accessibility-widget-trigger",
      ".accessibility-widget-panel",
      ".accessibility-widget-overlay",
      ".accessibility-widget-structure-dialog",
    ].forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (element) {
        if (isHidden) {
          element.dataset.arrayhashMobileHidden = "true";
          element.style.display = "none";
          return;
        }

        if (element.dataset.arrayhashMobileHidden === "true") {
          delete element.dataset.arrayhashMobileHidden;
          element.style.removeProperty("display");
        }
      });
    });
  }

  function syncMobileWidgetState() {
    var isMobile = isMobileWidgetViewport();
    var api = window.AccessibilityWidget;

    dedupeAccessibilityWidgetRoots();

    document.documentElement.toggleAttribute(
      "data-accessibility-widget-mobile-disabled",
      isMobile,
    );

    if (isMobile && api && typeof api.destroy === "function") {
      api.destroy();
    } else if (
      !isMobile &&
      api &&
      typeof api.init === "function" &&
      !document.querySelector(".accessibility-widget-root")
    ) {
      api.init(window.AccessibilityWidgetConfig);
      window.setTimeout(syncPanelAccessibility, 0);
    }

    setMobileHiddenFallback(isMobile);
  }

  function installMobileWidgetSync() {
    var media =
      typeof window.matchMedia === "function"
        ? window.matchMedia(MOBILE_WIDGET_QUERY)
        : null;
    var observer = new MutationObserver(syncMobileWidgetState);

    observer.observe(document.body, {
      childList: true,
    });

    if (media) {
      if (typeof media.addEventListener === "function") {
        media.addEventListener("change", syncMobileWidgetState);
      } else if (typeof media.addListener === "function") {
        media.addListener(syncMobileWidgetState);
      }
    }

    syncMobileWidgetState();
    window.addEventListener("load", syncMobileWidgetState, { once: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      function () {
        installPanelAccessibilitySync();
        installMobileWidgetSync();
      },
      {
        once: true,
      },
    );
  } else {
    installPanelAccessibilitySync();
    installMobileWidgetSync();
  }

  window.AccessibilityWidgetConfig = {
    title: "Accessibility Tools",
    accentColor: "#873EFF",
    position: "right",
    size: "L",
    offsetX: 20,
    offsetY: 20,
    persistence: true,
    respectOsPreferences: true,
    shortcut: { key: "a", altKey: true },
    onSimplify: simplifySelection,
    onOpen: syncPanelAccessibility,
    onClose: syncPanelAccessibility,
    onEvent: function (event) {
      window.dispatchEvent(
        new CustomEvent("arrayhash:accessibility-widget", { detail: event }),
      );
    },
  };
})();
