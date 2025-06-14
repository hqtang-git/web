import { Banner, Button, Descriptions, Form, Select, Table as TableSemi, Toast } from '@douyinfe/semi-ui';
import { useBoolean } from 'ahooks';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

import { filterList } from '@/common/util';

import { FILTER_KEYS, FieldLabels } from './const';
import { Drawer } from './drawer';
import { columns } from './field';
import { mockData } from './mock';
import { Mode, useUserStore } from './store';


/* 是否展示mock开关，mock是开发阶段方便调试前端样式的，上线给别人使用需要设置成false */
const isShowMockButton = false;

export const Table = () => {
  const [tableData, setTableData] = useState<any>([]);
  const [tableDataActual, setTableDataActual] = useState<any>([]);
  const [options, setOptions] = useState<any>([]);
  console.log('@@@@2 ~ Table ~ options:', options)
  const [loading, setLoading] = useState(false);
  const [isStartMock, { toggle: changeMockStatus }] = useBoolean(false);
  const setMode = useUserStore(state => state.setMode);

  const getList = () => {
    setLoading(true);
    axios.get('http://192.168.1.6:5050/pinfo_manage').then(response => {
      setLoading(false);
      console.log('@@@@ ~ 人员信息原始返回数据', response.data);
      const dataSource = response.data?.info || [];
      const options = response.data?.options || [];
      setTableData(dataSource);
      setTableDataActual(dataSource);
      setOptions(options);
    }).catch(error => {
      setLoading(false);
      console.error('GET 请求失败:', error);
      Toast.error('请求出现问题')
    });
  }

  /* 获取表格数据 & 将表格数据放置在组件状态中 */
  useEffect(() => {
    if (isStartMock) {
      setTableData(mockData);
      setTableDataActual(mockData);
      return;
    }

    getList();
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

  const expandRowRender = (record, _index) => {
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

  console.log('@@@@2 ~ Table ~ rowSelection:', rowSelection)

  const handleChange = ({ values }: any) => {    
    const newData = filterList(values, tableData);

    setTableDataActual(newData);
  }


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

      {/* 筛选区 */}
      <div className='flex items-center justify-between pl-[8px]'>
        <div className='flex flex-wrap'>
          <Form 
            // @ts-ignore
            labelPosition='inset'
            layout='horizontal'
            onChange={handleChange}
          >
            {
              Object.keys(FILTER_KEYS)?.map(item => {
                return (
                  <Form.Select multiple field={item} label={FieldLabels[item]} showClear className='font-[500] font-[12px] w-[240px] mt-[10px]' placeholder={`请选择${FieldLabels[item]}`}>
                    {(options?.find(option => option?.item?.value === item)?.optionList || [])?.map(i => (<Select.Option value={i?.key}>{i?.key}</Select.Option>))}
                  </Form.Select>
                )
              })
            }
          </Form>
        </div>
        <Button type="primary" className='mt-[10px]' onClick={() => setMode(Mode.ADD)}>新增人员</Button>
      </div>

      {/* 排班表格区：Tabel */}
      <div className="m-[8px] border border-[#ddd] rounded-[12px] overflow-hidden">
        <TableSemi
          sticky
          bordered
          empty={loading ? "正在加载人员信息" : "人员信息加载失败"}
          loading={loading}
          columns={columns as any}
          dataSource={tableDataActual}
          pagination={false}
          expandedRowRender={expandRowRender}
          rowKey="id"
          // rowSelection={rowSelection}
          onRow={(record) => ({
            className: (record as any)?.isworkday ? '!bg-[#fff]' : '!bg-[#eaf5ff]',
          })}
          scroll={{ x: 1000, y: '70vh' }}
        />
      </div>

      {/* 创建编辑区：Tabel */}
      <Drawer options={options} refreshList={getList} />
    </>
  )
}