import { formatNil } from '@/common/util';
import { Dropdown } from '@douyinfe/semi-ui';

// 添加单元类型校验
interface UnitType {
  id: number;
  name: string;
}

const UNIT_MAP: UnitType[] = [
  { id: 0, name: '工程中心' },
  { id: 1, name: '管控站' },
  { id: 2, name: '测通站' },
  { id: 3, name: '信处站' },
  { id: 4, name: '时统站' },
  { id: 5, name: '评估站' },
  { id: 6, name: '检测站' }
];

const QUAL_MAP: UnitType[] = [
  { id: 0, name: '没有值班资格' },
  { id: 1, name: '具备领班资格' },
  { id: 2, name: '具备技术值班资格' },
  { id: 3, name: '具备系统值班资格' },
  { id: 4, name: '具备辅助值班资格' },
  { id: 5, name: '具备跟学值班资格' }
]

const SYSTEM_MAP: UnitType[] = [
  { id: 0, name: '无' },
  { id: 1, name: '北二' },
  { id: 2, name: '北三' },
  { id: 3, name: '北二/北三' }
]

const CONS_MAP: UnitType[] = [
  { id: 0, name: '白班+夜班' },
  { id: 1, name: '仅白班' },
]
/* 表头额外样式 */
const onHeaderCell = () => ({
  style: {
    backgroundColor: "#eee",
    textAlign: 'left' as const,
    padding: '4px',
  },
});


const onCell = (record) => ({
  style: {
    backgroundColor: record?.isleader ? '#eaf5ff' : '#fff',
    textAlign: 'left' as const,
    padding: '4px',
  },
})

/* 表格内部单元格额外样式 */
const onCellLeader = () => ({
  style: {
    textAlign: 'left' as const,
    padding: '4px',
    color: 'red'
  },
});




const qual_Map = [
  '没有值班资格',
  '具备领班资格',
  '具备技术值班资格',
  '具备系统值班资格',
  '具备辅助值班资格',
  '具备跟学值班资格'
];
const system_Map = [
  "无",
  "北二",
  "北三",
  "北二/北三"
];

const unit_Map = [
  "工程中心",
  "管控站",
  "测通站",
  "信处站",
  "时统站",
  "评估站",
  "检测站"
];

const cons_Map = [
  "白班+夜班",
  "仅白班",
];


export const columns = [
  {
    title: 'ID编号',
    dataIndex: 'id',
    fixed: 'left' as const,
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '单位',
    dataIndex: 'unit',
    onFilter: (value, record) => (unit_Map[record.unit] == value),
    render: (_, { unit }) => { return (<span className='text-green-500'>{unit_Map[unit]}</span>) },
    filters: unit_Map.map(item => ({ text: item, value: item })),
    renderFilterDropdownItem: ({ text, checked, onChange }) => (<Dropdown.Item onClick={onChange} active={checked}> {text} </Dropdown.Item>),
    filterDropdownProps: { showTick: true,},
  },
  {
    title: '值班资格',
    dataIndex: 'qual',
    render: (_, { qual }) => { return (<span className='text-green-500'>{qual_Map[qual]}</span>) }
  },
  {
    title: '所属系统',
    dataIndex: 'system',
    render: (_, { system }) => { return (<span className='text-green-500'>{system_Map[system]}</span>) }
  },
  {
    title: '值班时间',
    dataIndex: 'cons',
    render: (_, { cons }) => { return (<span className='text-green-500'>{cons_Map[cons]}</span>) }
  },
].map(item => ({
  onHeaderCell,
  onCellLeader,
  onCell,
  width: 40,
  render: formatNil,
  ...item,
}));

