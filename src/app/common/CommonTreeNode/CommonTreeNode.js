import React from 'react';
import prefix from '../../../utils/routePrefix'
import { getCommonTableDataByPage } from '../../../actions'
import styles from './styles.css'
import getSize from '../../../utils/getSize'
import { Tree, Modal, Button, Input } from 'antd'

const TreeNode = Tree.TreeNode

export default class CommonTreeNode extends React.Component {
	constructor() {
		super();
		this.state = {
			expandedKeys: [],
			autoExpandParent: true,
			checkedKeys: [],
			selectedKeys: [],
			treeData: [],
			arrayData: [],
			divDisplay: 'none',
			modalVisible: false,
			defaultExpandAll: true,
		}
	}

	componentWillMount() {
		const {
			dispatch,
			tree
		} = this.props
		if(tree.autoExpandParent) {
			this.setState({
				autoExpandParent: tree.autoExpandParent
			})
		}
		if(tree.expandedKeys) {
			this.setState({
				expandedKeys: tree.expandedKeys
			})
		}
		if(tree.selectedKeys) {
			this.setState({
				selectedKeys: tree.selectedKeys
			})
		}
		if(tree.checkedKeys) {
			this.setState({
				checkedKeys: tree.checkedKeys
			})
		}
		if(tree.data) {
			let arrayData = tree.data.concat()
			this.setState({
				arrayData: arrayData,
				treeData: this.getTreeData(tree.data, 'react')
			})
		} else if(tree.url) {
			fetch(tree.url)
				.then(response => response.json())
				.then(json => this.setState({
					treeData: json
				}))
		}

	}
	componentWillReceiveProps(newProps) {
		// let oldData = this.props.commonTable;
		// let newData = newProps.commonTable;
		// if(oldData.data != newData.data){
		//   this.setState({...this.state,...newData});
		// }

	}
	onExpand = (expandedKeys) => {
		console.log('onExpand', arguments);
		// if not set autoExpandParent to false, if children expanded, parent can not collapse.
		// or, you can remove all expanded children keys.
		this.setState({
			expandedKeys,
			autoExpandParent: false,
		});
		if(this.props.tree.onExpand) {
			this.props.tree.onExpand(expandedKeys)
		}
	}
	onCheck = (checkedKeys) => {
		this.setState({
			checkedKeys
		});
		if(this.props.tree.onCheck) {
			this.props.tree.onCheck(checkedKeys)
		}
	}
	onSelect = (selectedKeys, info) => {
		this.setState({
			selectedKeys
		});
		if(this.props.tree.onSelect) {
			this.props.tree.onSelect(info.node.props)
		}
	}
	//右击事件
	onRightClick = ({
		event,
		node
	}) => {
		let offsetTop = getTop(event.target)
		let offsetLeft = getLeft(event.target)
		let offsetWidth = event.target.offsetWidth
		let offsetHeight = event.target.offsetHeight
		new Promise((resolve) => {
			this.setState({
				divDisplay: 'none'
			})
			resolve()
		}).then(() => {

			this.setState({
				divDisplay: 'block',
				top: offsetTop,
				left: offsetLeft + offsetWidth,
				currentKey: node.props.eventKey,
				inputValue: node.props.title, //设置输入框的值
			})
		})

		/*获取元素的纵坐标*/
		function getTop(e) {
			var offset = e.offsetTop;
			if(e.offsetParent != null) {
				offset += getTop(e.offsetParent);
			}
			return offset;
		}
		/*获取元素的横坐标*/
		function getLeft(e) {
			var offset = e.offsetLeft;
			if(e.offsetParent != null) {
				offset += getLeft(e.offsetParent);
			}
			return offset;
		}

	}

	getTreeData(arrayList, parentKey) {
		let arrayData = arrayList.concat();
		let treeData = []
		for(let i = 0; i < arrayData.length; i++) {
			if(arrayData[i].parentKey == parentKey) {
				let node = arrayData[i]
				treeData = treeData.concat(node)
				arrayData.splice(i, 1)
				i--
				if(node.isParent) {
					node.children = this.getTreeData(arrayData, node.key)
				}
			}
		}
		return treeData
	}

	showModal = () => {
		this.setState({
			modalVisible: true,
		});
	}
	//确定按钮
	handleOk = () => {
		let node = {
			title: this.state.inputValue,
			key: this.state.inputValue,
			isParent: false,
			parentKey: this.state.currentKey,
			value: {}
		}
		for(let i in this.state.arrayData) {
			if(this.state.arrayData[i].key == this.state.currentKey) {
				this.state.arrayData[i].isParent = true
			}
		}
		console.log(this.state.arrayData)
		this.setState({
			modalVisible: false,
			arrayData: this.state.arrayData.concat(node),
			treeData: this.getTreeData(this.state.arrayData.concat(node), 'react')
		});

	}
	//取消按钮，关闭对话窗
	handleCancel = () => {
		this.setState({
			modalVisible: false
		});
	}
	basicData = {
		topKey: 'react',
		rightButton: ['新增子类型', '修改该类型', '删除该类型']
	}
	render() {
		console.log(this.state)
		const loop = data => data.map((item) => {
			if(item.children) {
				return(
					<TreeNode key={item.key} title={item.title} value={item.value}>
            {loop(item.children)}
          </TreeNode>
				);
			}
			return <TreeNode key={item.key} title={item.title} value={item.value} />;
		});
		return(
			<div style={{ width: '100%', height: '100%' }} onClick={(e) => {
				this.setState({ divDisplay: 'none' })
			}}>
      {console.log(this.state.autoExpandParent)}
        <Tree
          showLine={this.props.tree.showLine}
          checkable={this.props.tree.checkable}
          onRightClick={this.onRightClick}
          onExpand={this.onExpand}
          expandedKeys={this.state.expandedKeys}
          autoExpandParent={this.state.autoExpandParent}
          onCheck={this.onCheck}
          checkedKeys={this.state.checkedKeys}
          onSelect={this.onSelect}
          selectedKeys={this.state.selectedKeys}
        >

          {loop(this.state.treeData)}
        </Tree>
        {this.state.divDisplay == 'block'&&
        <div className={styles.rightButtonList} style={{ top: this.state.top, left: this.state.left }}>
					{this.basicData.rightButton.map((title, index) =>
						<p className={styles.rightButtonListItem} key={index} onClick={() => {
								 console.info("this.basicData.rightButton:",this.basicData.rightButton[0],"点击菜单:",title)
								let rightButtonIndex = 0
								for (let i in this.state.arrayData) {
									if (this.state.arrayData[i].key == this.state.currentKey) {
										console.info("this.state.arrayData[i].key" + this.state.arrayData[i].key)
										rightButtonIndex = i
										break
									}
								}
								this.setState({
									divDisplay: 'none',
									modalVisible: true,
									modalTitle: title,
									rightButtonIndex
								})
								//新增子类型，设置输入框为空
							if(title=='新增子类型'){
								this.setState({inputValue:''})
							}
						}}>{title}</p>)
					}
				</div>
       }
        <Modal
          visible={this.state.modalVisible}
          title={this.state.modalTitle}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
            <Button key="submit" type="primary" size="large" onClick={this.handleOk}>
              确认
            </Button>
          ]}
        >
        {this.state.modalTitle != '删除该类型' && 
          <Input onChange={(e) => { this.setState({ inputValue: e.target.value }) }} 
          value={this.state.inputValue}/>}
        {this.state.modalTitle == '删除该类型' &&
							<h3>
							{(this.state.arrayData[this.state.rightButtonIndex] 
								&& this.state.arrayData[this.state.rightButtonIndex].isParent) ? '对不起，该节点下面有子节点，请先删除子节点' : '删除操作不可撤销，确定删除？'}
							</h3>}
        </Modal>
      </div>

		);
	}
}