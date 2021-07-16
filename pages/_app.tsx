import type { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/reset.css'
import '../styles/main.css'

export default function Nextra({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script>{`
        alert('stop');
        (function(){
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme)
  } else if (window.matchMedia) {
    const osTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    document.body.setAttribute('data-theme', osTheme)
    localStorage.setItem('theme', osTheme)
  } else {
    document.body.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  }
})()`}</script>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />
        <link
          rel="preload"
          href="/fonts/Inter-roman.latin.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/space-grotesk.latin.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
