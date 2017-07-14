import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.css';

// 图片总数
const TOTAL_NUMBER_OF_IMG = 4;
//单位秒(s)
const TIME_INTERVAL = 2;

class Banner extends Component {
    static propTypes = {
        imgSources: PropTypes.array
    };

    static defaultProps = {
        imgSources: []
    }

    constructor(props) {
        super(props);
        this.state = {
            runningOrder: 0
        };
    }

    componentDidMount() {
        this.timer = this._setTimer();
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    _renderImgs(runningOrder, imgSources = []) {
        let imgsList = [];
        for (let i = 0; i < TOTAL_NUMBER_OF_IMG; i++) {
            imgsList.push(
                <img className={classnames("sx-image-img", { "sx-image-img__active": runningOrder === i })}
                    key={`img${i}`}
                    src={imgSources[i]}
                    alt={`${i}`} />
            );
        }

        return imgsList;
    }

    _renderDots(runningOrder) {
        let dotList = [];
        for (let i = 0; i < TOTAL_NUMBER_OF_IMG; i++) {
            dotList.push(
                <span id={`${i}`}
                    key={`dot${i}`}
                    className={classnames("sx-dot-span", { "sx-dot-span__active": runningOrder === i })}>
                </span>
            );
        }

        return dotList;
    }

    _setTimer = () => {
        return setInterval(() => {
            let { runningOrder } = this.state;

            if (runningOrder >= TOTAL_NUMBER_OF_IMG - 1) {
                this.setState({
                    runningOrder: 0
                });
            }
            else {
                runningOrder++;
                this.setState({
                    runningOrder: runningOrder
                });
            }
        }, TIME_INTERVAL * 1000);
    }
    _onDot = (event) => {
        let elem = null;

        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        for (let i = 0; i < TOTAL_NUMBER_OF_IMG; i++) {
            elem = document.getElementById(`${i}`);
            if (elem === event.target) {
                this.setState({
                    runningOrder: i
                });
            }
        }
        this.timer = this._setTimer();
    }

    render() {
        let { runningOrder } = this.state;
        let { imgSources } = this.props;
        return (
            <div className="sx-banner-wrapper">
                <div className="sx-image">
                    {this._renderImgs(runningOrder, imgSources)}
                </div>
                <div className="sx-dot" onClick={this._onDot}>
                    {this._renderDots(runningOrder)}
                </div>
            </div>
        )
    }
}

export default Banner;