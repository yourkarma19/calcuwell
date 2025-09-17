"use client";

import Script from "next/script";

export default function Adsense() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }
  if (!process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID) {
    console.warn(
      "Google Ads Client ID is not set. Ads will not be displayed.",
    );
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
}
