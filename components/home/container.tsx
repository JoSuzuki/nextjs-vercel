import { ReactNode } from 'react'

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container">
      {children}
      <style jsx>{`
        .container {
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          padding-bottom: var(--spaces-xl);
        }
        @media screen and (min-width: 768px) {
          .container {
            max-width: 65ch;
            line-height: 1.75;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Container
