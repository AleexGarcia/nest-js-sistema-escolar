export class CreateUserDto {
    email: string
    password: string
    role: 'student' | 'teacher' | 'admin'
}
