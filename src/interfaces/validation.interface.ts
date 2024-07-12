export interface signupErrors {
    password?: string[];
    username?: string[];
    email?: string[];
}

export interface articleErrors {
    title?: string[];
    category?: string[];
    tags?: string[];
    text: string[];
}