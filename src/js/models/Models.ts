namespace Models {

	export interface Tweet {
		text: string
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

}