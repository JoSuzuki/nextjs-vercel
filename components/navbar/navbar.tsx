import JoSuzuki from '../josuzuki/josuzuki'
import NavigationLinks from '../navigation-links/navigation-links'

const Navbar = () => {
  return (
    <nav>
      <JoSuzuki />
      <NavigationLinks />
      <style jsx>{`
        nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spaces-md) 0;
          max-width: 90ch;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </nav>
  )
}

export default Navbar
