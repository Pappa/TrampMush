
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

export interface Image {
	url: string
}