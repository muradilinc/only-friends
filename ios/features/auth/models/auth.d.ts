export interface AuthMutation {
    email: string;
    password: string;
}

export interface AuthResponse {
    _id: string;
    email: string;
}

export interface GlobalError {
    error: string;
}