import { expect } from 'chai';
import 'mocha';
import { HeaderRenderer, RequestRenderer } from '../Renderers';
import * as TypeMoq from 'typemoq';
import { Header } from '../../Models/Header';
import { Request as BRequest} from '../../Models/Request';
import { HeaderCollection } from '../../Collections/HeaderCollection';

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
    it('Should render the request correctly', () => {
        let renderer = new RequestRenderer();
        let headerRendererMock = TypeMoq.Mock.ofType<HeaderRenderer>();

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
});
