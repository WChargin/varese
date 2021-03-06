import React, {Component, PropTypes} from 'react';

import CustomPropTypes from '../CustomPropTypes';
import InfiniteCanvas from './InfiniteCanvas';

export default class InfiniteTrichordTree extends Component {

    render() {
        const widePadding = 20;
        const wideStyle = this.props.viewOptions.wide ? {
            position: "relative",
            width: `calc(100vw - ${2 * widePadding}px)`,
            left: `calc(-50vw + ${widePadding}px + 50%)`,
        } : {};

        return <div style={{...wideStyle, marginBottom: 20}}>
            <InfiniteCanvas
                height={800}
                viewOptions={this.props.viewOptions}
                rationalizer={this.props.rationalizer}
            />
        </div>;
    }

}
InfiniteTrichordTree.propTypes = {
    viewOptions: CustomPropTypes.viewOptions.isRequired,
    rationalizer: PropTypes.func.isRequired,
};
