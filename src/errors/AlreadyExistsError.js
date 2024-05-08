export class AlreadyExistsError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
        this.name = "AlreadyExistsError";
    }
}
