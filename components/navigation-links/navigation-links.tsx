import Link from 'next/link'
import usePagesContext from '../use-pages-context/use-pages-context'

const NavigationLinks = () => {
  const { navPages } = usePagesContext()

  return (
    <ul className="container">
      {navPages.map((navPage) => {
        const pageName = navPage.frontMatter?.title ?? navPage.name
        return (
          <li>
            <Link key={navPage.route} href={navPage.route}>
              <a
                className={`nav-link ${navPage.active ? 'nav-current' : ''}`}
                {...(navPage.active && { 'aria-current': 'page' })}
              >
                {pageName}
              </a>
            </Link>
          </li>
        )
      })}
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
        }
        .nav-current {
          color: var(--colors-accent);
        }
        .nav-link {
          cursor: pointer;
          margin-left: var(--spaces-md);
          font-variation-settings: var(--font-weights-semibold);
        }
      `}</style>
    </ul>
  )
}

export default NavigationLinks
