import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';

import { ColumnsState } from './type';

export const formatColumnData = (data: ColumnProps<any>): ColumnsState => {
  const { dataIndex = '', fixed } = data;

  return {
    dataIndex,
    visible: true,
    fixed,
    disable: {
      fixed: Boolean(fixed),
    },
  };
};
