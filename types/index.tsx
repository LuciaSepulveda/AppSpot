export interface Artist {
  name: string
  genres: string[]
  href: string
  images: { height: number; url: string; width: number }[]
  uri: string
}
