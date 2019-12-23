import { IRenderable } from "./IRenderable";

export interface IRenderer<T extends IRenderable> {
    Render(renderable : T) : string;
}