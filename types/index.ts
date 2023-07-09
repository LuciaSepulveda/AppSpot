interface Image {
  height: number
  width: number
  url: string
}

export interface Artist {
  name: string
  genres?: string[]
  href: string
  images?: Image[]
  uri: string
  id: string
}

export interface Album {
  images: Image[]
  name: string
}

export interface Track {
  artists: Artist[]
  id: string
  name: string
  album: Album
  popularity: number
}
