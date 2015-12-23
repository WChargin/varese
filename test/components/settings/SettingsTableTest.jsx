import {describe, it} from 'mocha';
import {expect} from 'chai';

import React from 'react';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';

import {
    Table,
    Row,
    Cell,
    LabelCell,
    CheckboxCell,
} from '../../../src/components/settings/SettingsTable';

describe('SettingsTable', () => {

    describe('Table', () => {
        it("should render a div with 'display: table'", () => {
            const component = renderIntoDocument(<Table>Innards</Table>);
            const divs = scryRenderedDOMComponentsWithTag(component, 'div');
            expect(divs.length).to.equal(1);
            expect(divs[0].textContent).to.equal("Innards");
            expect(divs[0].style.display).to.equal('table');
        });
    });

    describe('Row', () => {
        it("should render a div with 'display: table-row'", () => {
            const component = renderIntoDocument(<Row>Minutiae</Row>);
            const divs = scryRenderedDOMComponentsWithTag(component, 'div');
            expect(divs.length).to.equal(1);
            expect(divs[0].textContent).to.equal("Minutiae");
            expect(divs[0].style.display).to.equal('table-row');
        });
    });

    describe('Cell', () => {
        const getDivs = () =>
            scryRenderedDOMComponentsWithTag(
                renderIntoDocument(<Cell>Wonders</Cell>),
                'div');
        it("should render a div with 'display: table-cell'", () => {
            const divs = getDivs();
            expect(divs.length).to.equal(1);
            expect(divs[0].textContent).to.equal("Wonders");
            expect(divs[0].style.display).to.equal('table-cell');
        });
        it("should have 'vertical-align: middle'", () => {
            const divs = getDivs();
            expect(divs.length).to.equal(1);
            expect(divs[0].style.verticalAlign).to.equal('middle');
        });
    });

    describe('LabelCell', () => {
        const element = <LabelCell htmlFor="widget">Setting</LabelCell>;
        it("should render a label with 'display: table-cell'", () => {
            const component = renderIntoDocument(element);
            const lbls = scryRenderedDOMComponentsWithTag(component, 'label');
            expect(lbls.length).to.equal(1);
            expect(lbls[0].textContent).to.equal("Setting");
            expect(lbls[0].style.display).to.equal('table-cell');
        });
        it("forwards the htmlFor prop", () => {
            const component = renderIntoDocument(element);
            const lbls = scryRenderedDOMComponentsWithTag(component, 'label');
            expect(lbls.length).to.equal(1);
            expect(lbls[0].htmlFor).to.equal("widget");
        });
    });

    describe('CheckboxCell', () => {
        const makeCell = (value, handler) => <CheckboxCell
            id="myCheckbox"
            checked={value}
            onChange={handler}
            labelYes="Hooray"
            labelNo="Shucks"
        />;
        const noop = () => {};
        it("renders the affirmative label", () => {
            const component = renderIntoDocument(makeCell(true, noop));

            const ckbxs = scryRenderedDOMComponentsWithTag(component, 'input');
            expect(ckbxs.length).to.equal(1);
            expect(ckbxs[0].type).to.equal("checkbox");
            expect(ckbxs[0].checked).to.equal(true);

            const lbls = scryRenderedDOMComponentsWithTag(component, 'label');
            expect(lbls.length).to.equal(1);
            expect(lbls[0].textContent).to.equal("Hooray");
        });
        it("renders the negative label", () => {
            const component = renderIntoDocument(makeCell(false, noop));

            const ckbxs = scryRenderedDOMComponentsWithTag(component, 'input');
            expect(ckbxs.length).to.equal(1);
            expect(ckbxs[0].type).to.equal("checkbox");
            expect(ckbxs[0].checked).to.equal(false);

            const lbls = scryRenderedDOMComponentsWithTag(component, 'label');
            expect(lbls.length).to.equal(1);
            expect(lbls[0].textContent).to.equal("Shucks");
        });
    });

});
