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
    focus: string
    leaderboard?: number
    categories?: string
 
}


export interface UserBody {
    id?: string
    name?: string
    email?: string
    focus?: string
    leaderboard?: number
    categories?: string

}

export interface Habits {
    title?: string
}

export interface Notes extends SanityBody {
    _type?: 'notes'
    note: string
    email: string
}

export interface Goals extends SanityBody {
    _type?: 'goals'
    title?: string
    progress?: number
    username?: string
    completed: boolean
}
export interface GoalBody {
    _type?: 'goals'
    title: string
    progress: number
    username?: string
    completed?: boolean
}

export interface Posts extends SanityBody {
    title?: string
    slug: {
        current: string
    }
    author: string
    profileImage: string
    mainImage: string
    categories: string
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
