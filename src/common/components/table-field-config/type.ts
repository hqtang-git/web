import { ColumnProps, Fixed } from '@douyinfe/semi-ui/lib/es/table';
import { ReactNode } from 'react';

type DisableConfig = {
  fixed?: boolean;
};

type DisableType = boolean | DisableConfig;

export interface ColumnsState {
  visible?: boolean;
  fixed?: Fixed;
  disable?: DisableType;
  dataIndex: string;
}

export interface ITableFieldConfig {
  className?: string;
  columns: ColumnProps<any>[];
  fields: ColumnsState[];
  onChange: (val: any[]) => void;
  filter?: boolean;
  draggable?: boolean;
  btnStyle?: React.CSSProperties;
}

export type ColumnsStateWithLabel = {
  label: ReactNode;
} & ColumnsState;
