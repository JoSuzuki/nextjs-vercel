import Link from 'next/link'
import usePagesContext from '../use-pages-context/use-pages-context'

interface PostsProps {
  limit: number | null
}

const Posts = ({ limit }: PostsProps) => {
  const { posts } = usePagesContext()
  console.log(posts)
  const limitedPosts = limit ? posts.slice(0, limit) : posts

  return (
    <ul>
      {limitedPosts.map((post) => {
        const postTitle = post.frontMatter?.title ?? post.name
        const postDate = post.frontMatter ? (
          <time className="" dateTime={post.frontMatter.date}>
            {post.frontMatter.date}
          </time>
        ) : null
        const postDescription =
          post.frontMatter && post.frontMatter.description ? (
            <p className="post-item-desc">
              {post.frontMatter.description}
              <Link href={post.route}>
                <a className="read-more">Read More →</a>
              </Link>
            </p>
          ) : null
        return (
          <li key={post.route}>
            <h3>
              <Link href={post.route}>
                <a className="">{postTitle}</a>
              </Link>
            </h3>
            {postDescription}
            {postDate}
          </li>
        )
      })}
      <style jsx>{`
        li {
          margin-bottom: var(--spaces-md);
        }
        time {
          color: var(--colors-accent);
          font-size: var(--font-sizes-sm);
        }
        .read-more {
          margin-left: var(--spaces-sm);
          text-decoration: underline;
          color: var(--colors-secondary);
        }
      `}</style>
    </ul>
  )
}

export default Posts
