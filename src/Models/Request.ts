import { IRenderable } from "../Renderer/IRenderable";
import { v4 as uuidv4} from 'uuid';
import { HeaderCollection }  from '../Collections/HeaderCollection'
import { IRenderer } from "../Renderer/IRenderer";
import { Header } from "./Header";

export class Request implements IRenderable {
    public RequestType: string;

    public Uri : string;

    public Body : string;

    public get Id() : string {
        return this._id;
    }

    private _id : string;

    private _headers : HeaderCollection;

    private renderer : IRenderer<Request>;

    get Headers() : HeaderCollection {
        return this._headers;
    }

    constructor(renderer: IRenderer<Request>, headerRenderer: IRenderer<Header>) {
        this._id = uuidv4();
        this.renderer = renderer;
        this._headers = new HeaderCollection(headerRenderer);
    }
    RenderContent(): string {
        return this.renderer.Render(this);
    }
}