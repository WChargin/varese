import React, {Component} from 'react';

import Page from './../Page';
import TrichordTree from './TrichordTree';
import ChordInput from '../ChordInput';

export default class TreeExplorer extends Component {

    constructor() {
        super();
        this.state = {
            rootChord: [0, 4, 7],
            settings: {
            },
        };
    }

    render() {
        const levels = this.state.settings.levels;
        return <Page path="tree">
            <h1>Chord tree explorer</h1>
            <p>
            Explore the outfoldings of a particular trichord.
            Branches to the left are outfoldings down,
            and branches to the right are outfoldings up.
            </p>
            <p>
            Click on any chord to set it as the root,
            or enter a root chord manually in the text box below.
            </p>
            <ChordInput
                value={this.state.rootChord}
                message="Enter a trichord: "
                onChange={rootChord => this.setState({ rootChord })}
                exactly={3}
            />
            <TrichordTree
                rootChord={this.state.rootChord}
                onClickChord={rootChord => this.setState({ rootChord })}
            />
        </Page>;
    }

}
