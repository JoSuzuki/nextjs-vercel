import React from 'react'

interface Post {
  name: string
  route: string
  frontMatter?: Record<string, string>
}

interface NavPage {
  name: string
  route: string
  active?: boolean
  frontMatter?: Record<string, string>
}

export const PagesContext = React.createContext<{
  posts: Post[]
  navPages: NavPage[]
}>({
  posts: [],
  navPages: [],
})

const usePagesContext = () => React.useContext(PagesContext)

export default usePagesContext
