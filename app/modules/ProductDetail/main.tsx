// libs
import * as React from 'react';
import { connect } from 'react-redux';
// actions
import * as Actions from './actions';
// css

console.log('component', React.Component)
interface IProps {
    name?: any;
    getProductDetail?: Function;
}

interface IState {
}

function mapStateToProps(state, ownerProps) {
    let { productDetail } = state;
    return productDetail;
}

function mapDispatchToProps(dispatch, ownerProps) {
    return {
        getProductDetail: () => {
            dispatch(Actions.getProductDetail());
        }
    }
}

class ProductDetail extends React.Component<IProps, IState>{
    static defaultProps = {
        name: "monkey-default"
    };
    constructor(props) {
        super(props);

        this.state = {
            name: 123
        }
    }
    componentDidMount() {
        let { getProductDetail } = this.props;
        // getProductDetail();
    }

    render() {
        return (
            <div>
                {this.props.name}
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);