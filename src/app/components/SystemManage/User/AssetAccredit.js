import React, {
	Component
} from 'react'
import { Modal, Form, Input, Tree } from 'antd'
import OwnFetch from '../../../api/OwnFetch'; //封装请求
const TreeNode = Tree.TreeNode;
let objbig = [];
class AllocationFrom extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			expandedKeys: ['all'],
			autoExpandParent: true,
			checkedKeys: ['0-0-0'],
			selectedKeys: [],
			accreditData: [],
			treeData:[]
		}
	}
	componentWillMount() {
		this.findAccredited();
	}
	//查询已授权资产
	findAccredited = () => {
		let params = "userId=" + this.props.userId + "&typeId=1"
		OwnFetch("SYSTEM_USER_FINDASSET", params)
			.then(res => {
				if(res.code == "200") {
					const {all,selected} = res.data;
					let treeData=[{
						key :'all',
						title : '全部资产',
						children : all,
					}]
					this.setState({treeData,checkedKeys:selected})
				}
			})
	}

	onExpand = (expandedKeys) => {
		//console.log('onExpand', arguments);
		this.setState({
			expandedKeys,
			autoExpandParent: false,
		});
	}
	onCheck = (checkedKeys) => {
		//console.log('复选框onCheck', checkedKeys);
		this.setState({
			checkedKeys
		});
	}
	onSelect = (selectedKeys, info) => {
		console.log('onSelect', info);
		this.setState({
			selectedKeys
		});
	}
	renderTreeNodes = (data) => {
		return data.map((item) => {
			if(item.children) {
				return(
					<TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
				);
			}
			return <TreeNode {...item} />;
		});
	}
	handleAccredit = () => {
		let userId = this.props.userId;
		let typeId = '1';
		let assetId = this.state.checkedKeys; //已授权资产
		let params = {};
		params.userId = userId;
		params.typeId = typeId;
		params.assetId = assetId;
		OwnFetch("SYSTEM_USER_ASSETACCREDIT", params).then(res => {
			if(res.code == '200') {
				Modal.success({
					title: '操作成功',
					content: "资产授权成功"
				});
			}
		})
		this.props.close();
	}
	handleClose = () => {

		this.props.close();
	}
	render() {
		const {
			close,
			userId,
			treeData
		} = this.props;

		return(
			<Modal
                maskClosable={false}
                width={450}
                visible={true}
                title={"资产授权"}
                onCancel={this.handleClose}
                onOk={this.handleAccredit}
            >	
            <div style={{height:'350px',overflowY:'scroll',padding:'10px'}}>
            	<Tree
			        checkable
			        onExpand={this.onExpand}
			        expandedKeys={this.state.expandedKeys}
			        //autoExpandParent={this.state.autoExpandParent}
			        onCheck={this.onCheck}
			        checkedKeys={this.state.checkedKeys}
			        onSelect={this.onSelect}
			        selectedKeys={this.state.selectedKeys}
			    >
			        {this.renderTreeNodes(this.state.treeData)}
			    </Tree>
            </div>
            </Modal>

		)

	}

}

const AssetAccredit = Form.create()(AllocationFrom);

export default AssetAccredit;