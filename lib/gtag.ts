declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Изпраща събитие за реализация към Google Ads (AW-18325005980).
export function trackConversion(label: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", {
    send_to: `AW-18325005980/${label}`,
  });
}
