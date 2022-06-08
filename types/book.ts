
export interface IBook {
  id: number
  createdAt: number
  updatedAt: number
  thumbnail: string
  isOutOfStock: boolean
  isDeleted: boolean
  page: number
  size: string
  publishDate: string
  finalPrice: number
  originPrice: number
  description: string
  name: string
  isHighlight: boolean
  isHighlightRef: boolean 
  authorName: string
  isRemoved: boolean
  code: string
  attribute1: string
  attribute2: string
  bookGalleries: BookGallery[];
  bookAttributes: BookAttribute[];
}



export interface BookGallery {
  id: number
  createdAt: number
  updatedAt: number
  thumbnail: string
  book: IBook;

}



export interface BookAttribute {
  id: number
  createdAt: number
  updatedAt: number
  value: string
  attribute: number
  finalPrice: number
  book: IBook;
}