// libs
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, HashRouter as Router, Link } from 'react-router-dom';

// compoennts
import ProductDetail from './modules/ProductDetail/main';

import { Banner } from 'banner/lib/banner';
import store from './store';

import './main.less';


interface IProps1 {
    children: any
}

console.log("Banner--->", Banner);

function App(props: IProps1) {
    return (
        <div className="app">
            {props.children}
            <Banner />
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


