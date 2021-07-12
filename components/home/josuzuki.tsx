import React from 'react'

const JoSuzuki = () => {
  return (
    <div className="container">
      <span className="jo">Jo</span>
      <span className="suzuki">Suzuki</span>
      <style jsx>{`
        .container {
          line-height: 1.15;
        }
        .jo {
          font-size: var(--font-sizes-lg);
          font-variation-settings: var(--font-weights-bold);
        }
        .suzuki {
          font-size: var(--font-sizes-lg);
          font-variation-settings: var(--font-weights-bold);
          color: var(--colors-accent);
        }
      `}</style>
    </div>
  )
}

export default JoSuzuki
