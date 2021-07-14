import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { PagesContext } from '../components/use-pages-context/use-pages-context'
import Article from '../components/article/article'

import MDXTheme from '../components/mdx-theme/mdx-theme'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'

import traverse from './utils/traverse'
import getTitle from './utils/get-title'
import sortDate from './utils/sort-date'

// type = 'post' | 'page' | 'tag' | 'customPage' | 'customPost'

const Layout = ({ meta, title, children }) => {
  const [titleNode, contentNodes] = getTitle(children)
  const type = meta.type || 'post'

  const getLayoutForType = (type) => {
    switch (type) {
      case 'post':
        return (
          <React.Fragment>
            <Head>
              <title>{title}</title>
            </Head>
            <Navbar />
            <Article>
              {titleNode}
              <MDXTheme>{contentNodes}</MDXTheme>
              <Footer />
            </Article>
          </React.Fragment>
        )
      case 'customPage':
        return (
          <React.Fragment>
            <Head>
              <title>{title}</title>
            </Head>
            <MDXTheme>{contentNodes}</MDXTheme>
          </React.Fragment>
        )
      case 'customPost': // TODO: not being used yet, you can change as you want
        return (
          <React.Fragment>
            <Head>
              <title>{title}</title>
            </Head>
            <MDXTheme>{contentNodes}</MDXTheme>
          </React.Fragment>
        )
      case 'tag':
      case 'page':
      default:
        return (
          <React.Fragment>
            <Head>
              <title>{title}</title>
            </Head>
            <Navbar />
            <Article>
              {titleNode}
              <MDXTheme>{contentNodes}</MDXTheme>
            </Article>
          </React.Fragment>
        )
    }
  }

  return getLayoutForType(type)
}

const withLayout = (opts, _config) => {
  // gather info for tag/posts pages
  let posts = []
  let navPages = []
  const type = opts.meta.type || 'post'
  const route = opts.route

  // This only renders once per page
  // let's get all posts
  traverse(opts.pageMap, (page) => {
    if (
      page.frontMatter &&
      ['page', 'posts', 'customPage'].includes(page.frontMatter.type)
    ) {
      if (
        (route.includes(page.route) && page.route !== '/') ||
        (route === page.route && page.route === '/')
      ) {
        navPages.push({ ...page, active: true })
      } else {
        navPages.push(page)
      }
    }
    if (page.children) return
    if (page.name.startsWith('_')) return
    if (
      type === 'posts' &&
      !page.route.startsWith(route === '/' ? route : route + '/')
    )
      return
    if (
      type !== 'page' &&
      (!page.frontMatter ||
        !page.frontMatter.type ||
        page.frontMatter.type === 'post')
    ) {
      posts.push(page)
    }
  })
  posts = posts.sort(sortDate)
  navPages = navPages.sort(sortDate)

  return (props) => {
    const router = useRouter()
    const { query } = router

    const type = opts.meta.type || 'post'
    const tagName = type === 'tag' ? query.tag : null

    const [titleNode] = getTitle(props.children)
    const title =
      opts.meta.title ||
      (typeof tagName === 'undefined'
        ? null
        : titleNode
        ? ReactDOMServer.renderToStaticMarkup(titleNode.props.children)
        : null) ||
      ''

    return (
      <PagesContext.Provider value={{ posts, navPages }}>
        <Layout title={title} {...opts} {...props} />
      </PagesContext.Provider>
    )
  }
}

export default withLayout
