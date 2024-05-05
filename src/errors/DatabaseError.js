export class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.status = 500;
        this.name = "DatabaseError";
    }
}
