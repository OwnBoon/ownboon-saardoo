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
    notes?: string
    notes1?: string
    notes2?: string
    notes3?: string
    notes4?: string
}


export interface UserBody {
    id?: string
    name?: string
    email?: string
    focus?: number
    leaderboard?: number
    notes: string
    notes1?: string
    notes2?: string
    notes3?: string
    notes4?: string
}

export interface Habits {
    title?: string
}

export interface Goals extends SanityBody {
    _type?: 'goals'
    title: string
    progress: number
    username?: string
}
export interface GoalBody {
    _type?: 'goals'
    title: string
    progress: number
    username?: string
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

export interface Message extends SanityBody {
    text: string
    username: string
    socketId: string
    pfp: string
    time: string
    day: string
}
