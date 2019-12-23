import { IRenderer } from "./IRenderer";
import {Header} from '../Models/Header';
import {Request as BRequest} from '../Models/Request'

export class HeaderRenderer implements IRenderer<Header> {
    Render(header: Header): string {
        return `${header.Key}: ${header.Value}`;
    }

}

// ToDo: RequestRenderer
export class RequestRenderer implements IRenderer<BRequest> {
    Render(renderable: BRequest): string {
        let rendered: string = '';

        //Render Request Type
        rendered += renderable.RequestType.toUpperCase();

        //Render Uri
        rendered += renderable.Uri + ' HTTP/1.1\n';

        //Render headers
        rendered += renderable.Headers.RenderContent();

        //Render body
        if(['GET', 'DELETE'].indexOf(renderable.RequestType.toUpperCase()) === -1) {
            rendered += '\n' + renderable.Body;
        }

        return rendered;
    }
}
// ToDo: ChangesetRenderer