import { Table, Button, Form, DatePicker, Select } from 'antd';
import React from 'react'
import OwnFetch from '../../api/OwnFetch'; //封装请求

import moment from 'moment';

export default class UserInfo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            totalData: {},
            name: '', //用户名称
            page: 1,
            total:0,
            pageSize: 15,
            loading: false,
            time: [],
            way: "all",//支付方式
            userId:props.userId,
        }
    }


    //重置
    onRest = () => {
        this.setState({
            way: "all",
            time: [],
            page:1,
        }, this.initLoadData)
    }

    payChange = (value) => {
        this.setState({ way: value })
    }

    componentWillMount() { 
        this.initLoadData();
    }

    //默认加载
    initLoadData = () => {
        this.setState({ loading: true })
        let { time, way, page, pageSize,userId } = this.state;
        let param = { page, pageSize,userId };
        if (time.length == 2) {
            let bTime = time[0].format("YYYY-MM-DD");
            let eTime = time[1].format("YYYY-MM-DD");
            param.bTime = bTime;
            param.eTime = eTime;
        }
        if (way != 'all') {
            param.way = way;
        }
        OwnFetch("/buckle/list", param)
            .then(res => {
                if (res && res.code == "200") {
                    let { datas, count } = res.data;
                    this.setState({ dataSource: datas, totalData: count,total:res.total })
                }
                this.setState({ loading: false })
            })
    }

    //搜索
    onSearch = () => {
        this.initLoadData();
    }



    timeonChange = (dates, dateStrings) => {
        this.setState({ time: dates });
    }

    getChangeDate = (key) => {
        let time = [];
        if (key == 1) {
            time.push(moment());
            time.push(moment());
        } else if (key == 2) {
            time.push(moment().subtract(1, 'd'));
            time.push(moment());
        } else if (key == 3) {
            time.push(moment().startOf('month'));
            time.push(moment());
        } else if (key == 4) {
            // let mont = moment().subtract(1, 'M')
            time.push(moment().subtract(1, 'M').startOf('month'));
            time.push(moment().subtract(1, 'M').endOf('month'));
        }
        this.setState({ time }, this.initLoadData)
    }


    columns = [{
        title: '用户id',
        dataIndex: 'id',
    }, {
        title: '交费日期',
        dataIndex: 'recharge_time',
    }, {
        title: '到期日期',
        dataIndex: 'valid_time',
    }, {
        title: '用户等级',
        dataIndex: 'roleText',
    }, {
        title: '推广人id',
        dataIndex: 'invite_id',
    }, {
        title: '支付方式',
        dataIndex: 'trade_type',
        render: (text, record, index) => text == "WX" ? '微信支付' : '支付宝支付'
    }, {
        title: '总充值金额(元)',
        dataIndex: 'total',
        render: (text, record, index) => Number(text / 100)
    }]

    //获取当前统计数
    getTotal = (value) => {
        let style = { color: 'red', marginLeft: '5px' }
        if (!value) {
            return <span style={style}>0 元</span>;
        }
        return <span style={style}>{Number(value / 100) + '元'}</span>;
    }

    render() {
        //表单数据操作
        const FormItem = Form.Item;
        const { RangePicker } = DatePicker;
        const Option = Select.Option;
        let totalData = this.state.totalData;


        return (
            <div style={{overflow: 'auto', height: '600px'}} >
                <div style={{ padding: "10px" }}>
                    <Button style={{ marginRight: 15 }} onClick={() => this.getChangeDate(1)}>今天</Button>
                    <Button style={{ marginRight: 15 }} onClick={() => this.getChangeDate(2)}>昨天</Button>
                    <Button style={{ marginRight: 15 }} onClick={() => this.getChangeDate(3)}>本月至今</Button>
                    <Button style={{ marginRight: 15 }} onClick={() => this.getChangeDate(4)}>上个月</Button>
                </div>
                <Form layout="inline" style={{ marginLeft: 10 }} >

                    <FormItem label="交费时间">
                        <RangePicker
                            // showTime={{ format: 'HH:mm:ss' }}
                            value={this.state.time}
                            onChange={this.timeonChange}
                            format="YYYY-MM-DD"
                        />
                    </FormItem>

                    <FormItem label="支付方式">
                        <Select
                            style={{ width: 200 }}
                            value={this.state.way}
                            onChange={this.payChange} >
                            <Option key="all">所有</Option>
                            <Option key="WX">微信</Option>
                            <Option key="ALI">支付宝</Option>
                        </Select>
                    </FormItem>

                    <FormItem >
                        <Button type="primary" icon="search" onClick={this.onSearch}>查询</Button>
                        <Button type="Default" icon="reload" onClick={this.onRest} style={{ marginLeft: '10px' }}  >重置</Button>
                    </FormItem>

                    <FormItem style={{ float: 'right', marginLeft: '20px' }}>
                    </FormItem>
                </Form>

                <div >
                    <div style={{ fontSize: '18px', margin: '15px 0px' }}>
                        <span style={{ margin: '18px' }}>总金额:{this.getTotal(totalData.total)}</span>
                        <span style={{ margin: '18px' }}>包周:{this.getTotal(totalData.r1)}</span>
                        <span style={{ margin: '18px' }}>包月:{this.getTotal(totalData.r2)}</span>
                        <span style={{ margin: '18px' }}>包季:{this.getTotal(totalData.r3)}</span>
                        <span style={{ margin: '18px' }}>包年:{this.getTotal(totalData.r4)}</span>
                        <span style={{ margin: '18px' }}>永久:{this.getTotal(totalData.r5)}</span>
                    </div>
                    <Table
                        size="small"
                        rowKey={(record, index) => index}
                        dataSource={this.state.dataSource}
                        columns={this.columns}
                        loading={this.state.loading}
                        pagination={{      
                            current:this.state.page,                   
                            total:this.state.total,
                            pageSize: this.state.pageSize,
                            showTotal: (total, range) => `当前${range[0]}-${range[1]}条 总数${total}条`,
                        }}
                    />
                </div>
            </div>
        )
    }

}