import { IRenderable } from "../Renderer/IRenderable";
import { IRenderer } from "../Renderer/IRenderer";

export class Header implements IRenderable{
    private renderer : IRenderer<Header>;
    public constructor(renderer : IRenderer<Header>) {
        this.renderer = renderer;
    }

    RenderContent(): string {
        return this.renderer.Render(this);
    }
    public Key: string = '';
    public Value: string = '';
}