import React from 'react'

export default function getTitle(children: React.ReactElement) {
  const nodes = React.Children.toArray(children)
  const titleEl = nodes.find((child) => {
    if (React.isValidElement<{ mdxType: string }>(child)) {
      child.props && child.props.mdxType === 'h1'
    }
  })
  return [titleEl || null, nodes.filter((node) => node !== titleEl)]
}
