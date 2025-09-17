"use client";

import Script from "next/script";

export default function Adsense() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1952235305826490"
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
}
