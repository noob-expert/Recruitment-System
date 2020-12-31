import React, { Component, useState } from 'react'

// 引入axios请求函数
import {ModifyRole} from "../../../network/index"

// 引入css样式
import "./modifyRole.less"

// 引入antd
import { message, Tree } from "antd"

// 引入props
import PropTypes from "prop-types"

// 引入左侧数据
import menuList from "../../../utils/menuConfig"

const treeData = menuList

export default class modifyRole extends Component {
    static propTypes = {
        selectedRows: PropTypes.array.isRequired
    }

    state = {
        expandedKeys: [],
        checkedKeys: [],
        selectedKeys: [],
        autoExpandParent: true,
        isModifyRole: this.props.isModifyRole
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isModifyRole: nextProps.isModifyRole
        })
    }

    // 定义树节点函数
    onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        // setExpandedKeys(expandedKeys);
        this.setState({ expandedKeys })
        // setAutoExpandParent(false);
        this.setState({ autoExpandParent: false })
    };

    onCheck = (checkedKeys) => {
        console.log('onCheck', checkedKeys);
        // setCheckedKeys(checkedKeys);
        this.setState({ checkedKeys })
    };

    onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        // setSelectedKeys(selectedKeys);
        this.setState({ selectedKeys })
    };

    // 定义修改权限提交按钮
    handleModifyRoleTypeSubmit= ()=>{
        const _id=this.props.selectedRows[0].key
        const menu =this.state.checkedKeys
        console.log(_id,menu);
        ModifyRole(_id,menu).then((result)=>{
            message.success("修改角色权限成功")
            this.setState({
                isModifyRole:"none"
            })
        })
        // console.log(result);
    }

        // 定义修改权限取消按钮
        handleModifyRoleTypeCancel= ()=>{
            this.setState({
                isModifyRole: "none"
            })
            // console.log(result);
        }

    render() {
        // const有局部作用域
        if (this.props.selectedRows.length !== 0) {
            // const { roleType } = this.props.selectedRows[0]
            var { roleType } = this.props.selectedRows[0]
            console.log(roleType);
        } else {
            var roleType = ''
        }

        const { expandedKeys,
            checkedKeys,
            selectedKeys,
            autoExpandParent,
            isModifyRole } = this.state
        // console.log(this.props.selectedRows);
        return (
            <div className="modifyRole" style={{ display: isModifyRole }}>
                <span>角色：</span><input type="text" placeholder={roleType} disabled />
                <button onClick={this.handleModifyRoleTypeCancel}>取消</button>
                <button onClick={this.handleModifyRoleTypeSubmit}>确认</button>
                <Tree
                    checkable
                    onExpand={this.onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onCheck={this.onCheck}
                    checkedKeys={checkedKeys}
                    onSelect={this.onSelect}
                    selectedKeys={selectedKeys}
                    treeData={treeData}
                />
            </div>
        )
    }
}


// export default modifyRole
