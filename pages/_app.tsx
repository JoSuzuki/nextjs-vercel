import type { AppProps } from 'next/app'
import 'nextra-theme-blog/style.css'
import Head from 'next/head'

import '../styles/main.css'

export default function Nextra({ Component, pageProps }: AppProps) {
  console.log(Component, pageProps)
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
      </Head>
      <div>something</div>
      <Component {...pageProps} />
    </>
  )
}
