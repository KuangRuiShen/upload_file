import React from 'react';
import prefix from '../../../utils/routePrefix'
import { getCommonTableDataByPage } from '../../../actions'
import styles from './styles.css'
import getSize from '../../../utils/getSize'
import { Table } from 'antd'
import ParseTableHead from './ParseTableHead'

export default class CommonTable extends React.Component {
  constructor() {
    super();
    this.state = {
      columns: [],
      rowSelection: null,
      data: [],
      pagination: {},
      loading: false,
      url: '',
      rowclass:false
    };
  }

  handleTableChange = (pagination) => {
    // const pager = { ...this.state.pagination }; pager.current =
    // pagination.current;
    const { dispatch, tableData } = this.props

    if (!tableData.data) {
      dispatch(getCommonTableDataByPage(this.state.url, pagination.pageSize, pagination.current, tableData.columns))
    }

    this.setState({ pagination: pagination });
    // this.fetch({   results: pagination.pageSize,   page: pagination.current,
    // sortField: sorter.field,   sortOrder: sorter.order,   ...filters, });
  }

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      if (this.props.rowSelection) {
        this.props.rowSelection({ selectedRowKeys: selectedRowKeys, selectedRows: selectedRows })
      }
    },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
    })
  };

  componentWillMount() {
    const { dispatch, tableData, parseHeader } = this.props
   if(tableData.rowclass){
			this.setState({
				rowclass:tableData.rowclass
			})
		}
    if (tableData.rowSelection) {
      this.setState({ rowSelection: this.rowSelection })
    }
    if (parseHeader) {
      tableData.columns = ParseTableHead(parseHeader.json, parseHeader.onClickFunction, parseHeader.renderFunction)
    }
    this.setState({ url: tableData.url, columns: tableData.columns })
    if (tableData.data) {
      this.setState({ data: tableData.data, pagination: tableData.pagination })
    } else {
      // dispatch(getCommonTableDataByPage(tableData.url, tableData.pageSize, 1, tableData.columns))
    }

  }
  componentWillReceiveProps(newProps) {
    let oldData = this.props.commonTable;
    let newData = newProps.commonTable;
    let oldTableData = this.props.tableData;
    let newTableData = newProps.tableData;
    if (oldData != null && (oldData.data != newData.data)) {
      this.setState({
        ...this.state,
        ...newData
      });
    } else if (oldTableData != null && (oldTableData.data != newTableData.data)) {
      this.setState({
        data: newTableData.data
      });
    }

  }
  render() {

    // const columns = [{   title: 'Name',   dataIndex: 'name', }, {   title: 'Age',
    //   dataIndex: 'age', },{   title: 'Phone',   dataIndex: 'phone', }, {   title:
    // 'Address',   dataIndex: 'address', }];
    console.log(this.state)
    return (
      <div>
        <Table
          columns={this.state.columns}
          rowSelection={this.state.rowSelection}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange} 
          bordered
          rowClassName={
          	(record, index)=>{
          		if((this.state.rowclass==true) && ((index%2==0)==false)){
          			return styles.row_gray
          		}
          	}
          }/>
      </div>

    );
  }
}