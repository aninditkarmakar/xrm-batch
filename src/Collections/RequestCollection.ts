import { IRenderable } from "../Renderer/IRenderable";
import { ICollection } from "./ICollection";
import { Request } from "../Models/Request";

export class RequestCollection implements ICollection<Request, string> {
    GetAll(): Request[] {
        return this._requests;
    }
    public get Length(): number {
        return this._requests.length;
    }
    private _requests: Request[] = [];

    public get Requests(): Request[] {
        return this._requests;
    }

    public Add(item: Request) {
        this._requests.push(item);
    }

    public Remove(item: Request) {
        let idx: number = this._requests.indexOf(item);
        this._requests.splice(idx, 1);
    }

    public Get(id: string): Request | null {
        for (let i = 0; i < this._requests.length; i++) {
            if (this._requests[i].Id === id) {
                return this._requests[i];
            }
        }

        return null;
    }


}