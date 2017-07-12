// libs
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, HashRouter as Router, Link } from 'react-router-dom';

// compoennts
import ProductDetail from './modules/ProductDetail/main';

import store from './store';

interface IProps {
    children: any
}

function App(props: IProps) {
    return (
        <div>
            {props.children}
        </div>
    )
}

let elem = 
<Provider store={store}>
    <Router>
        <App>
            <Route path="/" strict component={ProductDetail}></Route>
        </App>
    </Router>
</Provider>

render(elem, document.getElementById("main"));


