export interface Ad {
	title: string
}

export interface Games {
	bannerUrl: string,
	id: string, 
	title: string, 
	ads: Ad[]
}