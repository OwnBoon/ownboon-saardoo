interface SanityBody {
    _createdAt: string
    _id: string
    _rev: string
    _updatedAt: string
}




export interface User extends SanityBody {
    _type: 'user'
    name: string
    email: string
    orders?: Items[]
    address?: string
    town?: string
}

export interface UserBody {
    name?: string
    email?: string
    orders?: Order[]
    id?: string
    address?: string
    town?: string
}

