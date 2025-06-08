import { Banner, Table as TableSemi, Button, Toast, Descriptions, Tag } from '@douyinfe/semi-ui';
import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';
import { useBoolean } from 'ahooks';

import { columns } from './field';
import { mockData } from './mock';


/* 是否展示mock开关，mock是开发阶段方便调试前端样式的，上线给别人使用需要设置成false */
const isShowMockButton = true;

export const Table = () => {
  const [tableData, setTableData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [isStartMock, { toggle: changeMockStatus }] = useBoolean(false);

  /* 获取表格数据 & 将表格数据放置在组件状态中 */
  useEffect(() => {
    if (isStartMock) {
      setTableData(mockData);
      return;
    }

    setLoading(true);
    axios.get('http://192.168.1.2:5050/pinfo_manage').then(response => {
      setLoading(false);
      console.log('@@@@ ~ 人员信息原始返回数据', response.data);
      const dataSource = response.data?.info || [];
      setTableData(dataSource);
    }).catch(error => {
      setLoading(false);
      console.error('GET 请求失败:', error);
      Toast.error('请求出现问题')
    });
  }, [isStartMock])

  const expandData = useMemo(() => {
    return tableData.reduce((acc, { id, info, system }) => {
      acc[id] = [
        { key: '备注信息', value: info },
        { key: '所属系统', value: system }
      ];
      return acc;
    }, {});
  }, [tableData]);

  const expandRowRender = (record, index) => {
    return <Descriptions align="left" data={expandData[record.id]} />;
  };
  const rowSelection = {
    // getCheckboxProps: record => ({
    //   disabled: record.name === '设计文档', // Column configuration not to be checked
    //   name: record.name,
    // }),
    onSelect: (record, selected) => {
      console.log(`select row: ${selected}`, record);
    },
    onSelectAll: (selected, selectedRows) => {
      console.log(`select all rows: ${selected}`, selectedRows);
    },
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };
  return (
    <>
      {/* 介绍信息区：Banner */}
      <Banner
        type="info"
        className="m-[0px] rounded-[12px] h-[30px]"
        description={
          <p className='inline'>
            人员信息表：管理员可以对人员信息进行增删改查，同时可以查看人员信息表。
            {/* 默认情况下，表格数据是从服务器获取的，可以通过开关切换为mock数据 */}
            {
              isShowMockButton ? (
                <>
                  <Button className="ml-[24px] mr-[4px]" onClick={changeMockStatus}>{`${isStartMock ? '关闭' : '开启'} Mock 模式`}</Button>
                  <span>当前模式：{isStartMock ? 'Mock模式' : '网络请求模式'}</span>
                </>
              ) : null
            }
          </p>
        }
      />

      {/* 排班表格区：Tabel */}
      <div className="m-[8px] border border-[#ddd] rounded-[12px] overflow-hidden">
        <TableSemi
          sticky
          bordered
          empty={loading ? "正在加载人员信息" : "人员信息加载失败"}
          loading={loading}
          columns={columns}
          dataSource={tableData}
          pagination={false}
          expandedRowRender={expandRowRender}
          rowKey="id"
          rowSelection={rowSelection}
          onRow={(record) => ({
            className: record?.isworkday ? '!bg-[#fff]' : '!bg-[#eaf5ff]',
          })}
          scroll={{ x: 1000, y: '70vh' }}
        />
      </div>
    </>
  )
}