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
    secret?: string
    chatid?: string
    focus: string
    leaderboard?: number
    categories?: string
    verified?: boolean
    follow?: User[]
    about?: string
    profileImage?: string
    slug?: {
        current: string
    }

}


export interface UserBody {
    id?: string
    name?: string
    email?: string
    focus?: string
    secret?: string
    chatid?: string
    profileImage?: string
    leaderboard?: number
    categories?: string
    follow?: any
    about?: string
    slug?: {
        current: string
    }
    verified?: boolean

}

export interface Habits {
    title?: string
}

export interface Notes extends SanityBody {
    _type?: 'notes'
    note: string
    email: string
    topic: string
    category?: string

}

export interface LofiTodo extends SanityBody {
    _type?: 'lofi-todo'
    note: string
    email: string
    completed?: boolean
}

export interface Goals extends SanityBody {
    _type?: 'goals'
    title?: string
    progress?: number
    username?: string
    completed?: boolean
    name?: string
    category?: string
    linkedToCalendar?: boolean
    startDate?: string
    due?: string
    duration?: string
    delete?: boolean
    todoIndex?: number
}
export interface GoalBody {
    _type?: 'goals'
    title?: string
    progress?: number
    username?: string
    name?: string
    category?: string
    linkedToCalendar?: boolean
    startDate?: string
    due?: string
    duration?: string
    completed?: boolean
    delete?: boolean,
    todoIndex?: number
}

export interface Comment extends SanityBody {
    _type: "comment"
    comment: string
    tweetId: string
    username: string
    profileImg: string
    tweet: {
        _ref: string
        _type: 'reference'
    }
}

export interface CommentBody {
    _type: "comment"
    comment: string
    tweetId: string
    username: string
    profileImg: string
}
export interface FeedComment extends SanityBody {
    _type: "feedcomment"
    comment: string
    tweetId: string
    username: string
    profileImg: string
    tweet: {
        _ref: string
        _type: 'reference'
    }
}

export interface FeedCommentBody {
    _type: "feedcomment"
    comment: string
    tweetId: string
    username: string
    profileImg: string
}

export interface Posts extends SanityBody {
    title?: string
    slug: {
        current: string
    }
    author: string
    rating?: string
    profileImage: string
    mainImage: string
    categories: string
    email: string
    body: string

}
export interface Videos extends SanityBody {
    title?: string

    author: string
    profileImage: string
    image: string
    video: string
    categories: string
    desc: string

}

export interface Category extends SanityBody {
    title?: string
}

export interface Message extends SanityBody {
    _type: "messages"
    text: string
    username: string
    socketId: string
    pfp: string
    time: string
    day: string
    image?: string
    replyuser?: string
    replymessage?: string
}

interface Roadmaps extends SanityBody {
    _type?: "roadmap"
    content?: string
    email?: string
    progress?: string
    goal?: string
    completed?: boolean
    slug?: {
        current: string
    }
}
interface RoadBody {
    _type?: "roadmap"
    content?: {

    }
    email?: string
    completed?: boolean
    progress?: string
    goal?: string
    slug?: {
        current: string
    }
}