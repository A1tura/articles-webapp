export interface signupErrors {
    password?: string[];
    username?: string[];
    email?: string[];
}

interface tagErrors {
    tag: string;
    errors: string[]
}

export interface articleErrors {
    title?: string[];
    category?: string[];
    tags?: any;
    text?: string[];
}