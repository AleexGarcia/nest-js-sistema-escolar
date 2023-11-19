export abstract class User {
    id: string
    name: string
    email: string
    password: string
    role: 'student' | 'teacher' | 'admin';
}
