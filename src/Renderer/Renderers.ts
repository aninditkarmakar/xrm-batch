import { IRenderer } from "./IRenderer";
import {Header} from '../Models/Header';
import {Request as BRequest} from '../Models/Request'
import { Changeset } from "../Models/Changeset";

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
        rendered += renderable.Headers.RenderContent() + '\n';

        //Render body
        if(['GET', 'DELETE'].indexOf(renderable.RequestType.toUpperCase()) === -1) {
            rendered += renderable.Body;
        }

        return rendered;
    }
}
// ToDo: ChangesetRenderer
export class ChangesetRenderer implements IRenderer<Changeset> {
    Render(changeset: Changeset): string {
        let requests = changeset.RequestCollection.GetAll();
        let rendered = '';

        requests.forEach((req, idx) => {
            rendered += `--changeset_${changeset.Id}\n`;
            rendered += `Content-Type: application/http
Content-Transfer-Encoding: binary
Content-ID: ${idx + 1}\n\n`;

            rendered += req.RenderContent();
        });

        rendered += `--changeset_${changeset.Id}--\n\n`

        return rendered;
    }
    
}