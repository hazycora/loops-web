export interface Paginated<Type> {
	data: Type[]
	links: {
		first: unknown
		last: unknown
		prev: unknown
		next: string
	}
	meta: {
		path: string
		per_page: number
		next_cursor: string
		prev_cursor: string
	}
}

export type Feed = Paginated<Video>

export interface Video {
	id: string
	account: Account
	caption?: string
	url: string
	is_owner: boolean
	is_sensitive: boolean
	media: Media
	likes: number
	shares: number
	comments: number
	has_liked: boolean
}

export interface Actor {
	id: string
	username: string
	avatar: string
}

export interface Account {
	id: string
	name: string
	avatar: string
	username: string
	is_owner: boolean
	bio?: string
	post_count: number
	follower_count: number
	following_count: number
	url: string
	is_blocking: boolean
	created_at: string
}

export interface BaseNotification {
	id: string
	actor: Actor
	created_at: string
}

export interface FollowNotification extends BaseNotification {
	type: 'new_follower'
}

export interface VideoLikeNotification extends BaseNotification {
	type: 'video.like'
	video_id: string
	video_thumbnail: string
}

export type Notification = FollowNotification | VideoLikeNotification

export interface Media {
	width: number
	height: number
	thumbnail: string
	src_url: string
}

export interface Comment {
	account: Account
	caption: string
	children: Comment[]
	created_at: string
	id: string
	liked: boolean
	likes: number
	replies: number
	url: string
}

export interface FollowState {
	followed_by: boolean
	following: boolean
}
