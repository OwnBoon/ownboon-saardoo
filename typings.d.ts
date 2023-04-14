interface SanityBody {
    _createdAt?: string
    _id?: string
    _rev?: string
    _updatedAt?: string
}




export interface User extends SanityBody {
    _type?: 'user'
    name?: string
    email?: string
    focus?: number
    leaderboard?: number
    habits?: Habits[]
    goals: Goals[]
}


export interface UserBody {
    name?: string
    email?: string
    focus?: number
    leaderboard?: number
    habits?: Habits[]
    goals: Goals[]
}

export interface Habits {
    title?: string
}

export interface Goals {
    title: string
    progress: number
}

export interface Posts extends SanityBody {
    title: string
    slug: {
        current: string
    }
    author: UserBody[]
    mainImage: string
    categories: Category[]
    body: string

}

export interface Category extends SanityBody {
    title?: string
}


