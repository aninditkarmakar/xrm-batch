import { expect } from 'chai';
import 'mocha';
import { HeaderRenderer } from '../../Renderer/Renderers';
import { HeaderCollection } from '../HeaderCollection';
import { RequestCollection } from '../RequestCollection';
import * as TypeMoq from 'typemoq';
import { Request } from '../../Models/Request';

describe('RequestCollection', () => {
    it('Should be able to add remove, and get requests.', () => {
        let requestCollection = new RequestCollection();
        let requestMock = TypeMoq.Mock.ofType<Request>();
        requestMock.setup(r => r.Id).returns(() => '12345');
        expect(requestCollection.Requests.length).to.equal(0);

        requestCollection.Add(requestMock.object);
        
        expect(requestCollection.Requests.length).to.equal(1);
        expect(requestCollection.Requests[0].Id).to.equal('12345');

        let r = requestCollection.Get('12345');

        expect(r).to.not.be.null;
        if(r !== null) {
            expect(r.Id).to.equal('12345');
        }
        
        requestCollection.Remove(requestMock.object);

        expect(requestCollection.Requests.length).to.equal(0);
    });
});


