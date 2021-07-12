import type { AppProps } from 'next/app'
import '../theme/style.css'
import Head from 'next/head'

import '../styles/main.css'

export default function Nextra({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
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
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
