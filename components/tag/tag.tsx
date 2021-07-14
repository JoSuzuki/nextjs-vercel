import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'

export const TagName = () => {
  const { tag } = useRouter().query

  return (
    <span>
      {tag}
      <style jsx>{`
        span {
          padding-right: var(--spaces-xs);
          padding-left: var(--spaces-xs);
          color: var(--colors-accent);
          border: solid 1px var(--colors-accent);
          line-height: 1.2;
          background-color: var(--colors-accent-background);
          box-shadow: 3px 3px 0 0 var(--colors-accent);
          font-size: var(--font-sizes-lg);
          font-variation-settings: var(--font-weights-bold);
          margin-right: var(--spaces-xs);
        }
      `}</style>
    </span>
  )
}

const Tag = ({ children }: { children: string }) => {
  return (
    <Link href="/tags/[tag]" as={`/tags/${children}`}>
      <a>
        {children}
        <style jsx>{`
          a {
            display: flex;
            padding-right: var(--spaces-xs);
            padding-left: var(--spaces-xs);
            color: var(--colors-accent);
            border: solid 1px var(--colors-accent);
            line-height: 1.2;
            background-color: var(--colors-accent-background);
            box-shadow: 1px 1px 0 0 var(--colors-accent);
          }
          a:hover {
            margin-top: 1px;
            margin-left: 1px;
            box-shadow: 0px 0px 0 0 var(--colors-accent);
          }
        `}</style>
      </a>
    </Link>
  )
}

export default Tag
