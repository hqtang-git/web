import { Date } from '@/common/components/date';
import { formatNil } from '@/common/util';


/* 表头额外样式 */
const onHeaderCell = () => ({
  style: {
      backgroundColor: "#eee",
      textAlign: 'center' as const,
      padding: '4px',
  },
});

/* 表格内部单元格额外样式 */
const onCell = () => ({
  style: {
      textAlign: 'center' as const,
      padding: '8px',
  },
});

/* 表格内部单元格额外样式 */
const onCellLeader = () => ({
  style: {
      textAlign: 'center' as const,
      padding: '8px',
      color: 'red'
  },
});


export const columns = [
  {
    title: '时间',
    dataIndex: 'date',
    fixed: 'left' as const,
    width: 150,
    onCell: (record) => ({
      style: {
          backgroundColor: record?.isworkday ? '#fff' : '#eaf5ff',
          textAlign: 'center' as const,
          padding: '8px',
      },
    }),
    render: (_, { date, weekday }) => {
      return (
        <Date value={date} weekDay={weekday} isShowWeekDay />
      )
    }
  },
  {
    title: '北二领班',
    children: [
      {
        title: '白班',
        width: 100,
        onHeaderCell,
        onCell: onCellLeader,
        dataIndex: 'B2DLeader',
        render: formatNil
      },
      {
        title: '夜班',
        width: 100,
        dataIndex: 'B2NLeader',
        onHeaderCell,
        onCell: onCellLeader,
        render: formatNil
      },
    ],
  },
  {
    title: '北二系统',
    children: [
      {
        title: '白班',
        width: 100,
        dataIndex: 'B2DSystem',
        onHeaderCell,
        onCell,
        render: formatNil
      },
      {
        title: '夜班',
        width: 100,
        dataIndex: 'B2NSystem',
        onHeaderCell,
        onCell,
        render: formatNil
      },
    ],
  },
  {
    title: '北二技术',
    children: [
      {
        title: '白班',
        width: 100,
        dataIndex: 'B2DTech',
        onHeaderCell,
        onCell,
        render: formatNil
      },
      {
        title: '夜班',
        width: 100,
        dataIndex: 'B2NTech',
        onHeaderCell,
        onCell,
        render: formatNil
      },
    ],
  },
  {
    title: '北二跟学',
    width: 100,
    dataIndex: 'B2Trainee',
  },
  {
    title: '北三领班',
    dataIndex: 'B3Leader',
    onCell: onCellLeader,
  },
  {
    title: '北三系统',
    children: [
      {
        title: '白班',
        dataIndex: 'B3DSystem',
        onHeaderCell,
        onCell,
        width: 100,
        render: formatNil
      },
      {
        title: '夜班',
        dataIndex: 'B3NSystem',
        onHeaderCell,
        onCell,
        width: 100,
        render: formatNil
      },
    ],
  },
  {
    title: '北三技术',
    children: [
      {
        title: '白班',
        width: 100,
        dataIndex: 'B3DTech',
        onHeaderCell,
        onCell,
        render: formatNil
      },
      {
        title: '夜班',
        width: 100,
        dataIndex: 'B3NTech',
        onHeaderCell,
        onCell,
        render: formatNil
      },
    ],
  },
  {
    title: '北三跟学',
    width: 100,
    dataIndex: 'B3Trainee',
  },
  {
    title: '辅助值班',
    width: 100,
    dataIndex: 'Assistant',
  },
].map(item => ({
  onHeaderCell,
  onCell,
  width: 150,
  render: formatNil,
  ...item,
}));

