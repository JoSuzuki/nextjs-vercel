import NavigationLinks from '../navigation-links/navigation-links'
import JoSuzukiAnimated from './josuzuki-animated'

const HomeNavbar = () => {
  return (
    <nav>
      <JoSuzukiAnimated />
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

export default HomeNavbar
