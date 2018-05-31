import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router,browserHistory,hashHistory } from 'react-router'
import { AppContainer } from 'react-hot-loader'
import { LocaleProvider } from 'antd';

import zh_CN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'

import css from "../assets/css/global.css"
// import theme from '../assets/themes/theme.css'

import GlobalRoute from './plugins/route/router'
import store from './redux/store/configureStore'


var FastClick = require('fastclick');
import 'lodash'

//解决移动端300毫秒延迟
FastClick.attach(document.body);


const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <LocaleProvider locale={zh_CN}>
                    <Component />
                </LocaleProvider>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
}

render(GlobalRoute)

if(module.hot) {
    module.hot.accept('./plugins/route/router', () => { render(GlobalRoute) });
}