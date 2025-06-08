import { Banner, Table as TableSemi, Button, Toast } from '@douyinfe/semi-ui';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useBoolean } from 'ahooks';

import { columns } from './field';
import { mockData } from './mock';

import styles from './index.module.less';

/* 是否展示mock开关，mock是开发阶段方便调试前端样式的，上线给别人使用需要设置成false */
const isShowMockButton = true;


export const Table = () => {
  const [tableDate, setTableData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [isStartMock, { toggle: changeMockStatus }] = useBoolean(false);

  /* 获取表格数据 & 将表格数据放置在组件状态中 */
  useEffect(() => {
    if (isStartMock) {
      setTableData(mockData);

      return;
    }

    setLoading(true);
    axios.get('http://192.168.1.2:5050/schedule')
      .then(response => {
        setLoading(false);
        console.log('@@@@2 ~ 原始返回数据', response.data);

        const dataSource = response.data?.schedule || [];

        setTableData(dataSource);
      })
      .catch(error => {
        setLoading(false);
        console.error('GET 请求失败:', error);
        Toast.error('请求出现问题')
      });
  }, [isStartMock])


  return (
    <>
      {/* 介绍信息区：Banner */}
      <Banner
        type="info"
        className="m-[0px] rounded-[12px] h-[30px]"
        description={
          <p className='inline'>
            值班表：可查看当前月排班情况
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
          className={styles['component-table-demo-cell-hover-custom']}
          sticky
          bordered
          empty={loading ? "正在加载值班数据" : "暂无排班数据"}
          loading={loading}
          columns={columns}
          dataSource={tableDate}
          pagination={false}
          onRow={(record) => ({
            className: record?.isworkday ? '!bg-[#fff]' : '!bg-[#eaf5ff]',
          })}
          scroll={{ x: 1000, y: '70vh' }}
        />
      </div>
    </>
  )
}
