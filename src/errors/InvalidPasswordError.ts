export default class InvalidPasswordError extends Error {
    constructor(public code: number, public message: string) {
        super(message);
    }
}