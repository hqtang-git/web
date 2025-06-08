import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { usePrevious } from 'ahooks';
import { keyBy, xorBy } from 'lodash';
import { useMemo } from 'react';

import { useStorage } from '@/common/hooks/use-storage';

import { ColumnsState } from './type';
import { formatColumnData } from './utils';

interface IProps {
  columns: ColumnProps<any>[];
  config: {
    cacheKey: string;
    cacheType: 'localStorage' | 'sessionStorage';
  };
}

// 字段配置
export const useFieldConfig = ({ columns, config }: IProps) => {
  const { cacheKey, cacheType } = config || {};
  const cacheConfig = `${cacheKey}_${cacheType}`;
  const preCacheConfig = usePrevious(cacheConfig);

  const defaultValue: ColumnsState[] = useMemo(() => {
    return (columns || []).map(item => formatColumnData(item));
  }, [columns]);

  const [fields = [], setFields] = useStorage(cacheKey, {
    type: cacheType,
    defaultValue,
  });

  if (xorBy(defaultValue, fields, 'dataIndex').length) {
    if (!preCacheConfig || preCacheConfig === cacheConfig) {
      setFields(
        defaultValue.map(val => {
          const { dataIndex = '', fixed } = val;
          const visibleVal = (fields as any)?.find(itm => itm.dataIndex === dataIndex)?.visible ?? true;

          return {
            dataIndex,
            visible: visibleVal,
            fixed,
            disable: {
              fixed: Boolean(fixed || false),
            },
          };
        })
      );
    }
  }

  const result = useMemo(() => {
    const tColumnsMap = keyBy(columns, 'dataIndex');

    return fields
      ?.filter(item => item.visible)
      .map(item => {
        return { ...tColumnsMap[item.dataIndex], fixed: item.fixed };
      })
      .filter(item => Boolean(item)); // 如果缓存的字段多余当前的字段，则这里会有多余的undefined需要过滤
  }, [columns, fields]);

  return {
    result,
    fields,
    setFields,
  };
};
