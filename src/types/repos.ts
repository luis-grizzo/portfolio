export interface FetchReposProps {
  id: number
  name: string
  description: string
  language: string
  html_url: string
  homepage: string
  stargazers_count: number
  owner: {
    login: string
    avatar_url: string
  }
}
