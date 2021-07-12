import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import Meta from './meta'
import Nav from './nav'
import MDXTheme from './mdx-theme'

import traverse from './utils/traverse'
import getTitle from './utils/get-title'
import getTags from './utils/get-tags'
import sortDate from './utils/sort-date'

// type = 'post' | 'page' | 'tag' | 'customPage' | 'customPost'

const Layout = ({
  meta,
  navPages,
  postList,
  back,
  title,
  children,
}) => {
  console.log(children)
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
            <article className="container prose prose-sm md:prose">
              {titleNode}
              {type === 'post' ? (
                <Meta {...meta} back={back} />
              ) : (
                <Nav navPages={navPages} />
              )}
              <MDXTheme>
                {contentNodes}
              </MDXTheme>
              {postList}
            </article>
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
            <article className="container prose prose-sm md:prose">
              {titleNode}
              <Nav navPages={navPages} />
              <MDXTheme>{contentNodes}</MDXTheme>
              {postList}
            </article>
          </React.Fragment>
        )
    }
  }

  return getLayoutForType(type)
}

export default (opts, _config) => {
  console.log('opts', opts)

  // gather info for tag/posts pages
  let posts = null
  let navPages = []
  const type = opts.meta.type || 'post'
  const route = opts.route

  // This only renders once per page
  if (type === 'posts' || type === 'tag' || type === 'page') {
    posts = []
    // let's get all posts
    traverse(opts.pageMap, (page) => {
      if (
        page.frontMatter &&
        ['page', 'posts'].includes(page.frontMatter.type)
      ) {
        if (page.route === route) {
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
  }

  // back button
  let back = null
  if (type === 'post') {
    const parentPages = []
    traverse(opts.pageMap, (page) => {
      if (
        route !== page.route &&
        (route + '/').startsWith(page.route === '/' ? '/' : page.route + '/')
      ) {
        parentPages.push(page)
      }
    })
    const parentPage = parentPages
      .reverse()
      .find((page) => page.frontMatter && page.frontMatter.type === 'posts')
    if (parentPage) {
      back = parentPage.route
    }
  }

  return (props) => {
    console.log('render inside');
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

    const postList = posts ? (
      <ul>
        {posts.map((post) => {
          if (tagName) {
            const tags = getTags(post)
            if (!tags.includes(tagName)) {
              return null
            }
          } else if (type === 'tag') {
            return null
          }

          const postTitle =
            (post.frontMatter ? post.frontMatter.title : null) || post.name
          const postDate = post.frontMatter ? (
            <time className="post-item-date">
              {new Date(post.frontMatter.date).toDateString()}
            </time>
          ) : null
          const postDescription =
            post.frontMatter && post.frontMatter.description ? (
              <p className="post-item-desc">
                {post.frontMatter.description}
                <Link href={post.route}>
                  <a className="post-item-more">Read More →</a>
                </Link>
              </p>
            ) : null
          return (
            <div key={post.route} className="post-item">
              <h3>
                <Link href={post.route}>
                  <a className="post-item-title">{postTitle}</a>
                </Link>
              </h3>
              {postDescription}
              {postDate}
            </div>
          )
        })}
      </ul>
    ) : null

    return (
      <Layout
        postList={postList}
        navPages={navPages}
        back={back}
        title={title}
        {...opts}
        {...props}
      />
    )
  }
}
