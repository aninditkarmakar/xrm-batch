import { expect } from 'chai';
import 'mocha';
import { HeaderRenderer, RequestRenderer, ChangesetRenderer } from '../Renderers';
import * as TypeMoq from 'typemoq';
import { Header } from '../../Models/Header';
import { Request as BRequest, Request} from '../../Models/Request';
import { HeaderCollection } from '../../Collections/HeaderCollection';
import { Changeset } from '../../Models/Changeset';
import { RequestCollection } from '../../Collections/RequestCollection';

describe('HeaderRenderer', () => {
    it('Should render the key and value', () => {
        let headerRenderer = new HeaderRenderer();
        let headerMock = TypeMoq.Mock.ofType<Header>();
        headerMock.setup(h => h.Key).returns(() => "Content-Type");
        headerMock.setup(h => h.Value).returns(() => "application/json");
        let rendered = headerRenderer.Render(headerMock.object);

        expect(rendered).to.equal("Content-Type: application/json");
    });
});

describe('RequestRenderer', () => {
    it('Should render a request with a body', () => {
        let renderer = new RequestRenderer();
        let requestMock = TypeMoq.Mock.ofType<BRequest>();
        let headerCollection = new HeaderCollection(new HeaderRenderer());
        for(let i = 1; i <= 2; i++) {
            headerCollection.Add(`Key-${i}`, `Value-${i}`);
        }
        requestMock.setup(r => r.Body).returns(() => `{"hello": "world"}`);
        requestMock.setup(r=> r.Uri).returns(() => 'https://www.google.com/helloworld');
        requestMock.setup(r => r.RequestType).returns(() => 'POST');
        requestMock.setup(r => r.Headers).returns(() => headerCollection);

        let expected = `POSThttps://www.google.com/helloworld HTTP/1.1
Key-1: Value-1
Key-2: Value-2

{"hello": "world"}`

        let actual = renderer.Render(requestMock.object);
        expect(actual).to.equal(expected);        
    });

    it('Should render a request without a body', () => {
        let renderer = new RequestRenderer();
        let requestMock = TypeMoq.Mock.ofType<BRequest>();
        let headerCollection = new HeaderCollection(new HeaderRenderer);
        for(let i = 1; i <= 2; i++) {
            headerCollection.Add(`Key-${i}`, `Value-${i}`);
        }

        requestMock.setup(r => r.Body).returns(() => `{"hello": "world"}`);
        requestMock.setup(r=> r.Uri).returns(() => 'https://www.google.com/helloworld');
        requestMock.setup(r => r.RequestType).returns(() => 'GET');
        requestMock.setup(r => r.Headers).returns(() => headerCollection);

        let expected = `GEThttps://www.google.com/helloworld HTTP/1.1
Key-1: Value-1
Key-2: Value-2

`
        let actual = renderer.Render(requestMock.object);
        expect(actual).to.equal(expected);
    });
});

describe('ChangesetRenderer', () => {
    it('Should render all requests in the changeset.', () => {
        let renderer = new ChangesetRenderer();
        let requestCollectionMock = TypeMoq.Mock.ofType<RequestCollection>();
        let requestMock = TypeMoq.Mock.ofType<Request>();
        requestMock.setup(r => r.RenderContent()).returns(() => 'Request Mock\n');

        let requests: Request[] = [];
        requests.push(requestMock.object);
        requests.push(requestMock.object);
        requestCollectionMock.setup(r => r.GetAll()).returns(() => requests);

        let changesetMock = TypeMoq.Mock.ofType<Changeset>();
        changesetMock.setup(c => c.Id).returns(() => '12345');
        changesetMock.setup(c => c.RequestCollection).returns(() => requestCollectionMock.object);

        let expected = `--changeset_12345
Content-Type: application/http
Content-Transfer-Encoding: binary
Content-ID: 1

Request Mock
--changeset_12345
Content-Type: application/http
Content-Transfer-Encoding: binary
Content-ID: 2

Request Mock
--changeset_12345--\n\n`;

        let actual = renderer.Render(changesetMock.object);

        expect(actual).to.equal(expected);
    });
});
