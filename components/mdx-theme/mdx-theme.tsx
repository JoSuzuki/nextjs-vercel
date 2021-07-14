import ReactDOMServer from 'react-dom/server'
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from 'react'
import { MDXProvider, MDXProviderComponentsProp } from '@mdx-js/react'
import Slugger from 'github-slugger'
import Link from 'next/link'
import React from 'react'
import Highlight, {
  defaultProps,
  Language,
  PrismTheme,
} from 'prism-react-renderer'
import styles from './mdx-theme.module.css'

const THEME: PrismTheme = {
  plain: {
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  styles: [
    {
      types: ['keyword'],
      style: {
        color: '#ff0078',
        fontWeight: 'bold',
      },
    },
    {
      types: ['comment'],
      style: {
        color: '#999',
        fontStyle: 'italic',
      },
    },
    {
      types: ['string', 'url', 'attr-value'],
      style: {
        color: '#028265',
      },
    },
    {
      types: ['variable', 'language-javascript'],
      style: {
        color: '#c6c5fe',
      },
    },
    {
      types: ['builtin', 'char', 'constant'],
      style: {
        color: '#ffffff',
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: '#d9931e',
        fontStyle: 'normal',
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: '#999',
      },
    },
    {
      types: ['number', 'function', 'tag'],
      style: {
        color: '#0076ff',
      },
    },
    {
      types: ['boolean', 'regex'],
      style: {
        color: '#d9931e',
      },
    },
  ],
}

// Anchor links

const SluggerContext = createContext<Slugger>(null as unknown as Slugger)

const HeaderLink = ({
  tag: Tag,
  children,
  ...props
}: {
  tag: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: ReactElement
}) => {
  const slugger = useContext(SluggerContext)
  const slug = slugger.slug(ReactDOMServer.renderToStaticMarkup(children) || '')
  return (
    <Tag {...props}>
      <span id={slug} />
      <a href={'#' + slug} className="subheading">
        {children}
        <span className="anchor-icon" aria-hidden>
          #
        </span>
      </a>
      <style jsx>{`
        .anchor-icon {
          opacity: 0;
          margin-left: var(--spaces-sm);
          color: var(--colors-secondary);
        }
        .subheading:hover .anchor-icon {
          opacity: 1;
        }
        h2 {
          margin-top: var(--spaces-lg);
          margin-bottom: var(--spaces-md);
        }
      `}</style>
    </Tag>
  )
}

const H2 = ({ children, ...props }: { children: ReactElement }) => {
  return (
    <HeaderLink tag="h2" {...props}>
      {children}
    </HeaderLink>
  )
}

const H3 = ({ children, ...props }: { children: ReactElement }) => {
  return (
    <HeaderLink tag="h3" {...props}>
      {children}
    </HeaderLink>
  )
}

const H4 = ({ children, ...props }: { children: ReactElement }) => {
  return (
    <HeaderLink tag="h4" {...props}>
      {children}
    </HeaderLink>
  )
}

const H5 = ({ children, ...props }: { children: ReactElement }) => {
  return (
    <HeaderLink tag="h5" {...props}>
      {children}
    </HeaderLink>
  )
}

const H6 = ({ children, ...props }: { children: ReactElement }) => {
  return (
    <HeaderLink tag="h6" {...props}>
      {children}
    </HeaderLink>
  )
}

const A = ({
  children,
  ...props
}: {
  children: ReactElement
  href: string
}) => {
  const isExternal = props.href && props.href.startsWith('https://')
  if (isExternal) {
    return (
      <a target="_blank" rel="noopener" {...props}>
        {children}
        <style jsx>{`
          a {
            text-decoration: underline;
            color: var(--colors-secondary);
          }
        `}</style>
      </a>
    )
  }
  return (
    <Link href={props.href}>
      <a {...props}>
        {children}
        <style jsx>{`
          a {
            text-decoration: underline;
            color: var(--colors-secondary);
          }
        `}</style>
      </a>
    </Link>
  )
}

const Pre = ({ children, ...rest }: { children: ReactElement }) => (
  <pre {...rest}>
    {children}
    <style jsx>{`
      pre {
        color: #e2e8f0;
        background-color: #2d3748;
        overflow-x: auto;
        font-size: 0.875em;
        margin-top: var(--spaces-md);
        margin-bottom: var(--spaces-md);
        padding: var(--spaces-md);
        box-shadow: 5px 5px 0px 0px #002dc2;
      }
    `}</style>
  </pre>
)

const Code = ({
  children,
  className,
  highlight,
  ...props
}: {
  children: string
  className: string
  highlight: string
}) => {
  const highlightedRanges = useMemo(() => {
    return highlight
      ? highlight.split(',').map((r) => {
          if (r.includes('-')) {
            return r.split('-').map((row) => Number(row))
          }
          return Number(r)
        })
      : []
  }, [highlight])

  if (!className) return <code {...props}>{children}</code>

  // https://mdxjs.com/guides/syntax-highlighting#all-together
  const language = className.replace(/language-/, '') as Language
  console.log(className)
  return (
    <Highlight
      {...defaultProps}
      code={children.trim()}
      language={language}
      theme={THEME}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <code className={className} style={{ ...style }}>
          {tokens.map((line, i) => (
            <div
              key={i}
              {...getLineProps({ line, key: i })}
              style={
                highlightedRanges.some((r) =>
                  Array.isArray(r)
                    ? r[0] <= i + 1 && i + 1 <= r[1]
                    : r === i + 1,
                )
                  ? {
                      background: 'rgb(29 10 53)',
                      margin: '0 -1rem',
                      padding: '0 1rem',
                    }
                  : undefined
              }
            >
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
          <style jsx>{`
            code {
              background-color: transparent;
              border-width: 0;
              border-radius: 0;
              padding: 0;
              font-weight: 400;
              color: inherit;
              font-size: inherit;
              font-family: inherit;
              line-height: inherit;
            }
          `}</style>
        </code>
      )}
    </Highlight>
  )
}

const P = ({ children, ...rest }: { children: ReactElement }) => (
  <p {...rest}>
    {children}
    <style jsx>{`
      p {
        margin-top: var(--spaces-md);
        margin-bottom: var(--spaces-md);
      }
    `}</style>
  </p>
)

const Blockquote = ({ children, ...rest }: { children: ReactElement }) => (
  <blockquote {...rest}>
    {children}
    <style jsx>{`
      blockquote {
        border-left: solid var(--spaces-xs) var(--colors-secondary);
        padding-left: var(--spaces-md);
      }
    `}</style>
  </blockquote>
)

const HR = ({ ...props }) => (
  <>
    <hr {...props}></hr>
    <style jsx>{`
      hr {
        margin-top: var(--spaces-xl);
        margin-bottom: var(--spaces-lg);
        border-color: var(--colors-accent);
      }
    `}</style>
  </>
)

const UL = ({ children, ...rest }: { children: ReactElement }) => (
  <ul className={styles.ul} {...rest}>
    {children}
  </ul>
)

const OL = ({ children, ...rest }: { children: ReactElement }) => (
  <ol className={styles.ol} {...rest}>
    {children}
  </ol>
)

const LI = ({ children, ...rest }: { children: ReactElement }) => (
  <li className={styles.li} {...rest}>
    {children}
  </li>
)

const Table = ({ children, ...rest }: { children: ReactElement }) => (
  <table {...rest}>
    {children}
    <style jsx>{`
      table {
        width: 100%;
        table-layout: auto;
        text-align: left;
        margin-top: 2em;
        margin-bottom: 2em;
        font-size: 0.875em;
      }
    `}</style>
  </table>
)

const Th = ({ children, ...rest }: { children: ReactElement }) => (
  <th {...rest}>
    {children}
    <style jsx>{`
      th {
        font-weight: 600;
        border-bottom-width: 1px;
        border-bottom-color: var(--colors-accent);
        vertical-align: bottom;
        padding-bottom: var(--spaces-sm);
        padding-right: var(--spaces-sm);
      }
    `}</style>
  </th>
)

const Tr = ({ children, ...rest }: { children: ReactElement }) => (
  <tr {...rest}>
    {children}
    <style jsx>{`
      tr {
        border-bottom-width: 1px;
        border-bottom-color: var(--colors-secondary);
      }
      tr:last-child {
        border-bottom-width: 0px;
      }
    `}</style>
  </tr>
)

const Td = ({ children, ...rest }: { children: ReactElement }) => (
  <td {...rest}>
    {children}
    <style jsx>{`
      td {
        vertical-align: top;
        padding-top: var(--spaces-sm);
        padding-bottom: var(--spaces-sm);
        padding-left: 0px;
        padding-right: var(--spaces-md);
      }
    `}</style>
  </td>
)

const components: MDXProviderComponentsProp = {
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  a: A,
  code: Code,
  p: P,
  blockquote: Blockquote,
  hr: HR,
  ul: UL,
  ol: OL,
  li: LI,
  pre: Pre,
  table: Table,
  th: Th,
  tr: Tr,
  td: Td,
}

const MDXThemeWithSlugger = ({ children }: { children: ReactNode }) => {
  const slugger = new Slugger()
  return (
    <SluggerContext.Provider value={slugger}>
      <MDXProvider components={components}>{children}</MDXProvider>
    </SluggerContext.Provider>
  )
}

export default MDXThemeWithSlugger
