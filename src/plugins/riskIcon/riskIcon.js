import React from 'react';

import css from './style.css';

export default class RiskIcon extends React.Component {


    leveltext = () => {
        let risk = this.props.risk;
        if (risk) {
            if (risk == 3) {
                return <div className={css.risk_high}>高</div>
            }

            if (risk == 2) {
                return <div className={css.risk_medium} >中</div>
            }
        }
        return <div className={css.risk_low}>低</div>
    }
    render() {

        return this.leveltext();
    }

}