/**
 * 弹出的table的参数
 */
import React from 'react';
// import OwnFetch from '../../api/OwnFetch';
// import PropTypes from 'prop-types';
import { Ajax } from "yui-for-react";
import { Table, Input, Button, Modal } from 'antd';

export default class CommonTableModal extends React.Component {

    // static propTypes = {
    //     children: PropTypes.element.isRequired
    // };
    //设置可以传递参数的默认值 (name 和 code 两个要有一个)
    static defaultProps = {
        url: undefined,//请求的资源url
        name: undefined,//请求的资源名称 
        multiple: undefined,//如果是true代表可以选择多个
        title: undefined,//标题
        rowKey: undefined,//主键id
        param: undefined,//请求的参数
        selectKey: undefined, //已经选择的键
        width: undefined, //表格长度
        visible: undefined,//表格是否显示
        onCancel: undefined,//关闭方法
        onOk: undefined,//成功后调用
        getRows: undefined,//获取数据
        code: undefined,//编码
        columns: undefined,//字段[{isSearch: true }]表示需要搜索
        // searchColum: undefined,//需要查询的字段主键
    }

    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            baseSource: [],
            loading: false,
            selectedRowKeys: [],
            selectedRows: [],
            rowKey: 'key',
            width: 700,
            visible: false,
            searchValue: '',//搜索的值
            columns: [{
                title: '主键',
                dataIndex: 'key',
            }, {
                title: '名称',
                dataIndex: 'value',
                isSearch: true
            }],
            multiple: false,
        }
    }

    //初始化
    componentDidMount() {
        let { visible, width, rowKey, multiple, title, url, name, param, dataSource, selectKey, columns } = this.props;
        //判断参数
        if (rowKey) {
            this.setState({ rowKey })
        }
        if (multiple) {
            this.setState({ multiple })
        }
        if (title) {
            this.setState({ title })
        }
        if (width) {
            this.setState({ width });
        }
        if (visible) {
            this.setState({ visible })
        }


        if (columns) {
            this.setState({ columns });
        }

        if (selectKey) {
            this.setState({ selectedRowKeys: selectKey })
        }

        //加载默认数据
        if (dataSource) {
            this.setState({ baseSource: dataSource, dataSource });
            return;
        }

        //url请求
        if (url) {
            // Ajax.query(url,param).then(res=>{
            //     if(res && res.cdoe ==200 && res.data){
            //         this.setState({baseSource:res.data})
            //     }
            // })
        }

        if (name) {
            Ajax.query("/paramInfo/parameters", { name }).then(res => {
                if (res && res.code == 200 && res.data) {
                    let datas = res.data;
                    //如果没有值,则选择第一个
                    // if (!value && isSelect && datas.length > 0) {
                    //     value = datas[0];
                    //     if (this.props.onChange) {
                    //         this.props.onChange(value);
                    //     }
                    // }
                    this.setState({ baseSource: datas, dataSource: datas })

                }
            })
            return;
        }

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
    }

    onCancel = () => {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
        // this.setState({ visible: false })
    }

    onOk = () => {
        if (this.props.onOk) {
            this.props.onOk();
        }

        let { selectedRowKeys } = this.state;
        if (this.props.getRows) {
            this.props.getRows(selectedRowKeys)
        }
        this.onCancel();
    }

    //修改变量
    componentWillReceiveProps(newProps) {
        if (newProps.visible != this.props.visible) {
            this.setState({ visible: newProps.visible })
        }

        if (newProps.dataSource != this.props.dataSource) {
            this.setState({ dataSource: newProps.dataSource, baseSource: newProps.dataSource })
        }

    }

    //查询
    search = () => {
        let { baseSource, columns, searchValue } = this.state;
        if (searchValue) {
            let colum = []
            columns.map(item => { if (item.isSearch == true) colum.push(item.dataIndex) });
            let dataSource = baseSource.filter(record => {
                for (let name of colum) {
                    if (record[name].toLowerCase().includes(searchValue.toLowerCase())) {
                        return true;
                    }
                }
                return false
            })
            this.setState({ dataSource, selectedRowKeys: [], selectedRows: [] })
        }
    }
    //重置
    onReset = () => {
        let { baseSource } = this.state;
        this.setState({ dataSource: baseSource, searchValue:"" })
    }




    render() {
        //表格栏

        const Pagination = {
            showTotal: (total, range) => `当前${range[0]}-${range[1]}条 总数${total}条`,
            // showQuickJumper: true,
            showSizeChanger: true,
        };

        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            selectedRows: this.state.selectedRows,
            onChange: (selectedRowKeys, selectedRows) => {
                if (!this.state.multiple && selectedRowKeys.length > 1) {
                    Modal.warn({ title: '只能选择一条数据!' })
                } else {
                    this.setState({ selectedRows, selectedRowKeys });
                }
            },
        };

        return <Modal
            width={this.state.width}
            maskClosable={false}
            visible={this.state.visible}
            title={"选择数据"}
            onCancel={this.onCancel}
            confirmLoading={this.state.loading}
            onOk={this.onOk}
        >
            <Input.Search
                style={{ width: 200, marginRight: 20 }}
                placeholder="名称"
                value={this.state.searchValue}
                onChange={e => this.setState({ searchValue: e.target.value })}
                onSearch={this.search}
                enterButton
            />
            <Button type="primary" onClick={this.onReset}>重置</Button>
            <div style={{ maxHeight: 700, overflow: 'auto' }} >
                <Table
                    size="small"
                    border
                    rowKey={this.state.rowKey}
                    columns={this.state.columns}
                    dataSource={this.state.dataSource}
                    pagination={Pagination}
                    rowSelection={rowSelection}
                />
            </div>

        </Modal>
    }

}