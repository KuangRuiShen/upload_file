/**
 * 单一select选择器
 */

import React from 'react';
import { Select } from "antd";;
// import OwnFetch from '../../api/OwnFetch';
import { Ajax } from "yui-for-react";

export default class CommonSelectIndex extends React.Component {
    //设置可以传递参数的默认值 (name 和 code 两个要有一个)
    static defaultProps = {
        name: undefined,//请求的资源名称 
        code: undefined,//编码
        url: undefined,//请求的地址
        isSelect: undefined,//是否选择一个
        onChange: undefined,//方法
        selectValue: undefined,//key
        getText: undefined,//获取值的方法
    }

    constructor() {
        super();
        this.state = {
            loading: false,
            datas: [],//所有的数据
            selectValue: undefined,
            // code:'',
            // url:'',
            // value: "",
            // defaultValue: "",
            // style: {},
        }
    }

    componentDidMount() {
        let { code, name, isSelect, value } = this.props;

        //如果是代码
        if (code) {
            Ajax.query("/paramInfo", { code }).then(res => {
                if (res && res.code == 200 && res.data) {
                    let datas = res.data;
                    //如果没有值,则选择第一个
                    if (!value && isSelect && datas.length > 0) {
                        value = datas[0];
                        if (this.props.onChange) {
                            this.props.onChange(value);
                        }
                    }
                    this.setState({ datas, selectValue: value })

                }
            })
            return;
        }

        if (name) {
            Ajax.query("/paramInfo/parameters", { name }).then(res => {
                if (res && res.code == 200 && res.data) {
                    let datas = res.data;
                    //如果没有值,则选择第一个
                    if (!value && isSelect && datas.length > 0) {
                        value = datas[0];
                        if (this.props.onChange) {
                            this.props.onChange(value);
                        }
                    }
                    this.setState({ datas, selectValue: value })

                }
            })
        }
    }

    //修改变量
    componentWillReceiveProps(newProps) {
        // console.info(this.state.props);
        // console.info(this.props);
        // console.info(newProps);
        if (newProps.value != this.props.value) {
            this.setState({ selectValue: newProps.value })
        }
    }



    onChange = (value) => {
        if (this.props.onChange) {
            this.props.onChange(value);
        }
        this.setState({ selectValue: value }, this.getText)
    }

    getText = () => {
        if (this.props.getText) {
            let { datas, selectValue } = this.state;
            let value = '';
            if (selectValue) {
                let obj = datas.find(item => item.key == selectValue);
                value = obj.value;
            }
            console.info(value)
            this.props.getText(value)
        }
    }


    render() {
        const Option = Select.Option;
        let { style } = this.props;

        return (<Select
            allowClear
            showSearch
            style={{ width: 200, ...style }}
            // defaultValue={this.state.defaultValue}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={this.onChange}
            value={this.state.selectValue}
        >
            {this.state.datas.map((item, index) => <Option key={index} value={item.key}>{item.value}</Option>)}

        </Select>

        )
    }
}
