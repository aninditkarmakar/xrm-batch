export abstract class Exception {
    public Message: string;
    public InnerException: Exception | null = null;

    constructor(message: string, ex? : Exception) {
        this.Message = message;
        if(ex) {
            this.InnerException = ex;
        }
    }
}

export class InvalidParameterException extends Exception {
    constructor(message: string, ex?: Exception) {
        super(message, ex);
    }
}