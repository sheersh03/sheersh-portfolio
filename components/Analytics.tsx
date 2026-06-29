"use client";

import Script from "next/script";

/**
 * GoatCounter analytics — privacy-friendly, no cookies, no consent banner.
 * Set GOATCOUNTER_CODE to your site code (the subdomain you register at
 * goatcounter.com, e.g. "sheersh" → sheersh.goatcounter.com). Until it's set,
 * nothing renders. GoatCounter's script automatically ignores localhost, so
 * dev visits don't pollute the stats — only the live site is counted.
 */
const GOATCOUNTER_CODE = "sheersh";

export function Analytics() {
  if (!GOATCOUNTER_CODE) return null;
  return (
    <Script
      strategy="afterInteractive"
      src="https://gc.zgo.at/count.js"
      data-goatcounter={`https://${GOATCOUNTER_CODE}.goatcounter.com/count`}
    />
  );
}
