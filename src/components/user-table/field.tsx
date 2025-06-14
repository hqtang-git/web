import { formatNil } from '@/common/util';
import { Button, Space, Typography } from '@douyinfe/semi-ui';

import { FieldLabels } from './const';
import { Mode, useUserStore } from './store';



const { Text } = Typography;
/* 删除能力是否禁用 */
const isDeleteDisabled = true;

interface IProps {
  record: any;
}
const Operate = ({ record }: IProps) => {
  const setCurrentOperateUser = useUserStore(state => state.setCurrentOperateUser);
  const setMode = useUserStore(state => state.setMode);


  const edit = () => {
    setCurrentOperateUser(record);
    setMode(Mode.EDIT);
  }

  const handleDelete = () => {
    // axios.post('http://192.168.1.6:5050/delete', params).then(response => {
    //   console.log('@@@@2 ~ 提交返回数据:', response);
    //   const { status, message } = response.data || {};
    //   // setLoading(false);

    //   // 成功
    //   if (status === "success") {
    //     // hideForm();
    //     Toast.success(message);
    //     // refreshList();
    //   } else {
    //     // 失败
    //     Toast.error(message || '提交失败');
    //   }

    // }).catch(error => {
    //   // setLoading(false);
    //   Toast.error(error?.message || '提交失败')
    // });
  }

  return (
    <Space>
      <Button onClick={edit}>编辑</Button>
      <Button disabled={isDeleteDisabled} onClick={handleDelete}>删除</Button>
    </Space>
  )
}


// 添加单元类型校验
// interface UnitType {
//   id: number;
//   name: string;
// }

// const UNIT_MAP: UnitType[] = [
//   { id: 0, name: '工程中心' },
//   { id: 1, name: '管控站' },
//   { id: 2, name: '测通站' },
//   { id: 3, name: '信处站' },
//   { id: 4, name: '时统站' },
//   { id: 5, name: '评估站' },
//   { id: 6, name: '检测站' }
// ];

// const QUAL_MAP: UnitType[] = [
//   { id: 0, name: '没有值班资格' },
//   { id: 1, name: '具备领班资格' },
//   { id: 2, name: '具备技术值班资格' },
//   { id: 3, name: '具备系统值班资格' },
//   { id: 4, name: '具备辅助值班资格' },
//   { id: 5, name: '具备跟学值班资格' }
// ]

// const SYSTEM_MAP: UnitType[] = [
//   { id: 0, name: '无' },
//   { id: 1, name: '北二' },
//   { id: 2, name: '北三' },
//   { id: 3, name: '北二/北三' }
// ]

// const CONS_MAP: UnitType[] = [
//   { id: 0, name: '白班+夜班' },
//   { id: 1, name: '仅白班' },
// ]

/* 表头额外样式 */
const onHeaderCell = () => ({
  style: {
    backgroundColor: "#eee",
    textAlign: 'center' as const,
    padding: '4px',
  },
});


const onCell = (record) => ({
  style: {
    backgroundColor: record?.isleader ? '#eaf5ff' : '#fff',
    textAlign: 'center' as const,
    padding: '4px',
  },
})

/* 表格内部单元格额外样式 */
const onCellLeader = () => ({
  style: {
    textAlign: 'left' as const,
    padding: '4px',
    color: 'blue'
  },
});

// const qual_Map = [
//   '没有值班资格',
//   '具备领班资格',
//   '具备技术值班资格',
//   '具备系统值班资格',
//   '具备辅助值班资格',
//   '具备跟学值班资格'
// ];
// const system_Map = [
//   "无",
//   "北二",
//   "北三",
//   "北二/北三"
// ];

const unit_Map = [
  "工程中心",
  "管控",
  "测通",
  "信处",
  "时统站",
  "评估站",
  "检测站"
];

console.log('@@@@2 ~ unit_Map:', unit_Map)

// const cons_Map = [
//   "白班+夜班",
//   "仅白班",
// ];


export const columns = [
  {
    title: FieldLabels.id,
    dataIndex: 'id',
    fixed: 'left' as const,
  },
  {
    title: FieldLabels.name,
    dataIndex: 'name',
  },
  {
    title: FieldLabels.gender,
    dataIndex: 'gender',
  },
  {
    title: FieldLabels.unit,
    dataIndex: 'unit',
  },
  {
    title: FieldLabels.qual,
    dataIndex: 'qual',
  },
  {
    title: FieldLabels.system,
    dataIndex: 'system',
  },
  {
    title: FieldLabels.cons,
    dataIndex: 'cons',
  },
  {
    title: FieldLabels.exclude,
    dataIndex: 'exclude',
    width: 40,
    render: (_, { exclude }) => (
      <>
        {typeof exclude === 'string' ? (
          <Text
            style={{ width: 150 }}
            ellipsis={{
              rows: 1,
              showTooltip: {
                type: 'popover',
                opts: {
                  content: (
                    <>
                      {
                        exclude?.split(';')?.map(info => <p>{info}</p>)
                      }
                    </>
                  )
            
                }
              }
            }}
          >
            {exclude}
          </Text>
        ) : '无'}
      </>
    )
  },
  {
    title: FieldLabels.info,
    dataIndex: 'info',
    render: (_, { info }) => { return (
      <Text 
        ellipsis={{ 
            showTooltip: {
                opts: { content: info }
            }
        }}
        style={{ width: 150 }}
      >
        {info}
      </Text>
    )
  }
  },
  {
    title: '操作',
    fixed: 'right' as const,
    dataIndex: 'operate',
    width: 70,
    render: (_, record) => <Operate record={record} />
  },
].map(item => ({
  onHeaderCell,
  onCellLeader,
  onCell,
  width: 40,
  render: formatNil,
  ...item,
}))