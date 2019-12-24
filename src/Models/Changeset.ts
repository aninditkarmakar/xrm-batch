import { IRenderable } from "../Renderer/IRenderable";
import { RequestCollection } from "../Collections/RequestCollection";
import { v4 as uuidv4 } from 'uuid';
import { ICollection } from "../Collections/ICollection";
import { Request } from "./Request";
import { Header } from "./Header";
import { HeaderCollection } from "../Collections/HeaderCollection";
import { IRenderer } from "../Renderer/IRenderer";
import { timingSafeEqual } from "crypto";
import { ChangesetRenderer } from "../Renderer/Renderers";

export class Changeset implements IRenderable {
    private _requestCollection : ICollection<Request, string>;

    private _id: string;

    private renderer : IRenderer<Changeset>;

    constructor(changesetRenderer: IRenderer<Changeset>) {
        this._id = uuidv4();
        this._requestCollection = new RequestCollection();
        this.renderer = changesetRenderer;
    }

    public get RequestCollection() : ICollection<Request, string> {
        return this._requestCollection;
    }

    public get Id() : string {
        return this._id;
    }

    RenderContent(): string {
        return this.renderer.Render(this);
    }

}