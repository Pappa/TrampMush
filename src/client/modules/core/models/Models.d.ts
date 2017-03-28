
export interface Tweet {
	text: string
	id?: number
	user?: {
		name?: string
	}
}

export interface Sentiment {
	sentiment: string
	confidence: number
}

export interface Error {
	code?: number
	message: string
}

export interface Response<T> {
	data: T
}

export interface GiphyImage {
	url: string
	width: string
	height: string
}

interface GiphyImages {
	fixed_height: GiphyImage
	fixed_width: GiphyImage
}

export interface Giphy {
	type: string
	id: string
	url: string
	images: GiphyImages
}