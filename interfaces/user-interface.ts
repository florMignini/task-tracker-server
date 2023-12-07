export interface user extends Document{
    name: String,
    email: String,
    token: String | null,
    password: String,
    confirm: Boolean,
    comparePassword(candidatePassword: string): Promise<boolean>;
}