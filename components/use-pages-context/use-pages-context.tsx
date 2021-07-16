import React from 'react'

interface CurrentPost {
  filename: string
  route: string
  meta?: Record<string, any>
}

interface Post {
  name: string
  route: string
  frontMatter?: Record<string, any>
}

interface NavPage {
  name: string
  route: string
  active?: boolean
  frontMatter?: Record<string, any>
}

export const PagesContext = React.createContext<{
  posts: Post[]
  navPages: NavPage[]
  currentPage: CurrentPost
}>({
  posts: [],
  navPages: [],
  currentPage: { filename: '', route: '' },
})

const usePagesContext = () => React.useContext(PagesContext)

export default usePagesContext
