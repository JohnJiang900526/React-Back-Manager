import React, { Component } from 'react';
import { Table } from 'antd';
import './index.less';

class ETable extends Component {
  onSelectAll = (selected, selectedRows, changeRows) => {
    let { updateSelectedItem } = this.props;
    let selectedIds = [];
    let selectKey = [];

    selectedRows.forEach((item) => {
      selectedIds.push(item.id);
      selectKey.push(item.key);
    });

    updateSelectedItem(selectKey, selectedRows[0] || {}, selectedIds)
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    let { rowSelection, updateSelectedItem } = this.props;
    const selectedIds = [];

    if (rowSelection === 'checkbox') {
      selectedRows.forEach((item) => {
        selectedIds.push(item.id)
      });

      this.setState({
        selectedRowKeys,
        selectedIds,
        selectedItem: selectedRows[0]
      })
    }

    updateSelectedItem(selectedRowKeys,selectedRows[0],selectedIds)
  }

  onRowClick = (record) => {
    let { 
      rowSelection, 
      selectedRowKeys, 
      updateSelectedItem
    } = this.props;

    if (rowSelection !== 'checkbox') {
      let selectKey = [record.key];

      if (selectedRowKeys && selectedRowKeys[0] === record.key) {
        return false;
      }
      updateSelectedItem(selectKey, record || {});
    } else {
      let selectedIds = this.props.selectedIds;
      let selectedItem = this.props.selectedItem || [];

      if (!selectedIds) {
        const i = selectedIds.indexOf(record.id);

        if (i === -1) {
          selectedIds.push(record.id);
          selectedItem.push(record);
          selectedRowKeys.push(record.key);
        } else {
          selectedIds.splice(i, 1);
          selectedItem.splice(i, 1);
          selectedRowKeys.splice(i, 1);
        }
      } else {
        selectedIds = [record.id];
        selectedRowKeys = [record.key];
        selectedItem = [record];
      }

      updateSelectedItem(selectedRowKeys, selectedItem || [], selectedIds)
    }
  }

  getOptions = () => {
    const { selectedRowKeys } = this.props;
    let row_selection = this.props.rowSelection

    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: this.onSelectChange,
      onSelect:(record, selected, selectedRows)=>{
          console.log('...')
      },
      onSelectAll:this.onSelectAll
    };

    if (row_selection === false || row_selection === null) {
      row_selection = false;
    } else if (row_selection === 'checkbox') {
      rowSelection.type = 'checkbox';
    } else {
      rowSelection.type = 'radio';
      rowSelection.columnTitle = '选择'
    }

    return (
      <Table 
        className="card-wrap page-table"
        bordered
        {...this.props}
        rowSelection={row_selection ? rowSelection : null}
        onRow={(record,index) => ({
          onClick: () => {
            if (!row_selection) {
              return false;
            }
  
            this.onRowClick(record,index);
          }
        })}
      />
    )
  }

  render () {
    return (
      <div className="e-table">
        {
          this.getOptions()
        }
      </div>
    )
  }
}

export default ETable;
