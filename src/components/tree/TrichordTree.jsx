import React, {Component, PropTypes} from 'react';

import HarmonicSeries from '../../HarmonicSeries';
import Folding from '../../Folding';

import TreeView from './TreeView';
import TrichordView from './TrichordView';

export default class TrichordTree extends Component {

    constructor() {
        super();
        this.state = {
            levels: 4,
            showRoots: true,
            showOctaves: true,
        };
    }

    render() {
        const {rootChord, onClickChord} = this.props;
        const {levels} = this.state;
        const size = levels <= 4 ? 3 :
            levels <= 5 ? 2 :
            1;

        const chords = this._generateTree(rootChord, levels);
        const nodes = chords.map(row => row.map(chord =>
            <TrichordView
                notes={chord}
                onClick={() => onClickChord(chord)}
                size={size}
                showRoot={this.state.showRoots}
                showOctave={this.state.showOctaves}
            />));

        const canFindRoots = chords.map(row => row.map(chord => {
            try {
                // TODO(william): use the user's existing rationalizer
                HarmonicSeries.findChordRootOffset(
                    HarmonicSeries.canonicalRationalizer, chord);
                return true;
            } catch (e) {
                return false;
            }
        }));
        const defective = canFindRoots.some(row => row.some(x => !x));
        const defectiveNotice = defective && this.state.showRoots ?
            <div className="alert alert-warning" style={{ marginTop: 20 }}>
                <strong>Note:</strong>
                {" "}
                Some of these chords are too complicated to analyze,
                so we can't find their roots.
                In particular, the acoustic ratios are
                such complicated fractions that
                your browser gives up on the math.
                These chords are indicated with a question mark
                in the place where the root should be.
            </div> :
            null;

        return <div>
            <ViewOptions
                {...this.state}
                onSetLevels={levels => this.setState({ levels })}
                onSetShowRoots={showRoots => this.setState({ showRoots })}
                onSetShowOctaves={showOctaves =>
                    this.setState({ showOctaves })}
            />
            {defectiveNotice}
            <TreeView
                elements={nodes}
                spacing={2 * size}
            />;
        </div>;
    }
    _iterateRow(previousRow) {
        const branch = c => [Folding.outfoldDown(c), Folding.outfoldUp(c)];
        const branches = previousRow.map(branch);
        const flattened = [].concat.apply([], branches);
        return flattened;
    }
    _generateTree(root, depth) {
        const result = [[root]];
        for (let i = 1; i < depth; i++) {
            result.push(this._iterateRow(result[result.length - 1]));
        }
        return result;
    }
}
TrichordTree.propTypes = {
    rootChord: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    size: PropTypes.oneOf([1, 2, 3]),
    onClickChord: PropTypes.func.isRequired,
};

class ViewOptions extends Component {

    render() {
        // Bootstrap's inline forms don't work really well with checkboxes.
        // So we'll use our own table layout instead; no big deal.
        const row = {style: {display: "table-row"}};
        const cell = {
            style: {
                display: "table-cell",
                //
                // marginRight doesn't work on table cells,
                // and we only want horizontal spacing
                // so we can't use borderSpacing on the table div.
                // This should do.
                paddingRight: 20,
            },
        };

        const makeCheckboxCell = (id, checked, onChange, labelYes, labelNo) =>
            <div {...cell} className="checkbox">
                <input
                    ref={id}
                    type="checkbox"
                    id={id}
                    checked={checked}
                    onChange={() => onChange(this.refs[id].checked)}
                    style={{ marginLeft: 0, marginRight: 20 }}
                />
                <label
                    htmlFor={id}
                    style={{
                        userSelect: "none",
                        WebkitUserSelect: "none",
                        color: "#737373",  // Bootstrap's .help-block color
                    }}
                >
                    {checked ? labelYes : labelNo}
                </label>
            </div>;

        return <div style={{ display: "table", cellSpacing: 10, borderCollapse:"separate" }}>
            <div {...row}>
                <label {...cell} htmlFor="depth">Tree depth</label>
                <label {...cell} htmlFor="showRoots">Show roots?</label>
                <label {...cell} htmlFor="showOctaves">Show octaves?</label>
            </div>
            <div {...row}>
                <div {...cell}>
                    <input
                        ref="levels"
                        type="range"
                        id="depth"
                        min={1}
                        max={6}
                        value={this.props.levels}
                        onChange={() => this.props.onSetLevels(
                            parseInt(this.refs.levels.value, 10))}
                    />
                </div>
                {makeCheckboxCell(
                    "showRoots",
                    this.props.showRoots,
                    this.props.onSetShowRoots,
                    "Shown", "Hidden")}
                {makeCheckboxCell(
                    "showOctaves",
                    this.props.showOctaves,
                    this.props.onSetShowOctaves,
                    "Shown", "Hidden")}
            </div>
        </div>;
    }

}
