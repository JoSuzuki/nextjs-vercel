import formatDate from '../../utils/format-date'
import Tags from '../tags/tags'
import usePagesContext from '../use-pages-context/use-pages-context'

const PostMeta = () => {
  const { currentPage } = usePagesContext()

  if (!currentPage.meta) return null

  console.log(currentPage.meta)
  return (
    <div className="container">
      <div className="author">{currentPage.meta.author}</div>-
      <div className="date">{formatDate(currentPage.meta.date)}</div>-
      <div className="tags">
        <Tags tags={currentPage.meta.tags} />
      </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          font-size: var(--font-sizes-sm);
          margin-bottom: var(--spaces-md);
        }
        .author {
          margin-right: var(--spaces-xs);
        }
        .date {
          margin-right: var(--spaces-xs);
          margin-left: var(--spaces-xs);
        }
        .tags {
          margin-left: var(--spaces-xs);
        }
      `}</style>
    </div>
  )
}

export default PostMeta
