import { expect } from 'chai';
import 'mocha';
import { HeaderRenderer } from '../../Renderer/Renderers';
import { HeaderCollection } from '../HeaderCollection';

describe('HeaderCollection', () => {
    it('Should be able to render all its headers', () => {
        let headerCollection = new HeaderCollection(new HeaderRenderer());
        for(let i = 1; i <= 2; i++) {
            headerCollection.Add(`Key-${i}`, `Value-${i}`);
        }

        let rendered = headerCollection.RenderContent();
        let expected = `Key-1: Value-1
Key-2: Value-2\n`;

        expect(rendered).to.equal(expected);
    });
});


