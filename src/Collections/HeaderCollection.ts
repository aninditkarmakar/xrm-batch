import { Header } from "../Models/Header";
import { InvalidParameterException } from "../Exceptions/Exceptions";
import { IRenderer } from "../Renderer/IRenderer";
import { IRenderable } from "../Renderer/IRenderable";

export class HeaderCollection implements IRenderable {
    RenderContent(): string {
        let rendered = '';
        this.headerObjects.forEach((header, idx) => {
            rendered += `${header.RenderContent()}\n`
        });
        return rendered;
    }
    private headers = {};

    private headerObjects : Header[] = [];

    private headerRenderer : IRenderer<Header>;

    constructor(renderer: IRenderer<Header>) {
        this.headerRenderer = renderer;
    }

    public Add(header: Header) : void;
    
    public Add(key: string, value: string) : void;

    public Add(param1: string | Header, param2?: string) {
        if(param1 instanceof Header) {
            this.headers[param1.Key] = param1.Value
            this.headerObjects.push(param1);
        }
        else if(typeof param1 === 'string' && typeof param2 === 'string') {
            let obj = new Header(this.headerRenderer);
            obj.Key = param1;
            obj.Value = param2;
            this.Add(obj);
        }
        else {
            throw new InvalidParameterException("Invalid parameter.");
        }
    }

    public Remove(header: Header) : void;
    public Remove(key: string) : void;

    public Remove(headerOrKey: Header | string) : void {
        if(headerOrKey instanceof Header) {
            delete this.headers[headerOrKey.Key];
            let idx = -1;
            for(idx = 0; idx < this.headerObjects.length; idx++) {
                if(this.headerObjects[idx].Key === headerOrKey.Key) {
                    break;
                }
            }

            this.headerObjects.splice(idx, 1);
        }
        else if(typeof headerOrKey === 'string') {
            let header: Header = new Header(this.headerRenderer);
            this.Remove(header);
        }
        else {
            throw new InvalidParameterException("Invalid parameter.");
        }
    }

    public Get(key: string) : string {
        return this.headers[key];
    }
}