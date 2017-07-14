import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

function Title({
    title = "力度伸维生素C泡腾片成人一次两片，素C泡腾片儿童一次一片",
    subtitle = "血压计降压压迫红薯维护这个地方只能放两行这个地方只能放两行放两行放两行",
    priceSymbol = "￥",
    currentPrice = "6789.7",
    oldPrice = "9800.00",
    salesVolume = "销量：323"
}) {

    let priceSplitedList = (+currentPrice).toFixed(2).split(".");
    let integer = priceSplitedList[0];
    let decimal = (+priceSplitedList[1].slice(0, 2));
    return (
        <div className="sx-heading-wrapper">
            <div className="sx-heading-title">
                {title}
            </div>
            <div className="sx-heading-subtitle">
                {subtitle}
            </div>
            <div className="sx-heading-price">
                <div className="sx-heading-price-current">
                    <span className="sx-heading-price-symbol">
                        {priceSymbol}
                    </span>
                    <span>
                        {integer}
                    </span>
                    <span className="sx-heading-price-decimal">
                        {`.${decimal}`}
                    </span>
                </div>
                <span className="sx-heading-price-old">
                    <span>
                        {priceSymbol}
                    </span>
                    {oldPrice}
                </span>
                <span className="sx-heading-price-sales-volume">
                    {salesVolume}
                </span>
            </div>
        </div>
    )
}

Title.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    priceSymbol: PropTypes.string,
    currentPrice: PropTypes.string,
    oldPrice: PropTypes.string,
    salesVolume: PropTypes.string
};

export default Title;
