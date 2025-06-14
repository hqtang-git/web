/* eslint-disable max-lines-per-function */
import { IconAlignCenter, IconAlignLeft, IconAlignRight, IconSearch } from '@douyinfe/semi-icons';
import { Button, Checkbox, CheckboxGroup, Input, Popover, Row, Space, Tooltip, Typography } from '@douyinfe/semi-ui';
import { useDebounceFn, useMemoizedFn } from 'ahooks';
import cx from 'classnames';
import { difference, isNil, keyBy, uniqueId } from 'lodash';
import { FC, useEffect, useMemo, useRef, useState } from 'react';

import { DragHandler, SortItem, SortList } from '../draggable-sort-list';

import styles from './index.module.less';
import { ColumnsState, ColumnsStateWithLabel, ITableFieldConfig } from './type';
import { formatColumnData } from './utils';

export { useFieldConfig } from './use-field-config';

const { Text } = Typography;


export const TableFieldConfig: FC<ITableFieldConfig> = ({
  className,
  columns = [],
  fields: defaultFields = [] as ColumnsState[],
  onChange,
  filter = false,
  draggable = true,
  btnStyle,
}) => {
  const ref = useRef(uniqueId('table-field-config-'));
  const [visible, setVisible] = useState(false);

  const [fields, setFields] = useState(defaultFields);

  const [optionFilter, setOptionFilter] = useState<string>('');

  const { run: handleFilter } = useDebounceFn(setOptionFilter, { wait: 500 });

  const allValue = useMemo(() => columns.map(item => item.dataIndex as string), [columns]);

  const checkedValue = useMemo(() => fields.filter(item => item.visible).map(item => item.dataIndex), [fields]);

  const checkAll = useMemo(
    () => allValue.length !== 0 && difference(allValue, checkedValue).length === 0,
    [checkedValue, allValue]
  );

  useEffect(() => {
    if (!visible) {
      setOptionFilter('');
    }
  }, [visible]);

  const handlePopoverVisible = useMemoizedFn(() => {
    if (visible) {
      setVisible(false);
    } else {
      setFields(defaultFields);
      setVisible(true);
    }
  });

  const apply = useMemoizedFn(() => {
    onChange(fields);
    setVisible(false);
    setOptionFilter('');
  });

  const options: ColumnsStateWithLabel[] = useMemo(() => {
    const columnsMap = keyBy(columns, 'dataIndex');
    const priorities = { left: -1, true: -1, right: 2 };

    return fields
      .sort((a, b) => {
        const aPriority = priorities[`${a.fixed}`] || 1;
        const bPriority = priorities[`${b.fixed}`] || 1;

        return aPriority - bPriority;
      })
      .map(
        item =>
          ({
            label: columnsMap[item.dataIndex]?.title,
            ...item,
          } as ColumnsStateWithLabel)
      );
  }, [columns, fields]);

  const toggleCheckAll = useMemoizedFn(evt => {
    const all = evt.target.checked;

    if (all) {
      setFields(fields.map(item => ({ ...item, visible: true })));
    } else {
      setFields(fields.map(item => ({ ...item, visible: false })));
    }
  });

  // checkbox点击的回调
  const handleCheck = useMemoizedFn(targetValues => {
    const result = fields.map(item => ({
      ...item,
      visible: targetValues.includes(item.dataIndex),
    }));

    setFields(result);
  });

  // 重置预设
  const reset = useMemoizedFn(() => {
    setFields(columns.map(item => formatColumnData(item)));
  });

  const onCancel = useMemoizedFn(() => {
    setFields(defaultFields);
    setVisible(false);
  });

  const validateFields = useMemoizedFn(() => {
    const checkedFields = fields.filter(i => Boolean(i.visible));

    return checkedFields.length;
  });

  const fixedChange = (item, fixed) => {
    const result = fields.map(i => {
      if (i.dataIndex === item.dataIndex) {
        return {
          ...i,
          fixed,
        };
      }

      return i;
    });

    setFields(result);
  };

  const SortCheckboxList = ({
    list,
    title,
    collection,
  }: {
    list: ColumnsStateWithLabel[];
    title: string;
    collection: string;
  }) => {
    if (!list.length) {
      return null;
    }

    return (
      <div>
        <div role="fixed" aria-label={collection}>
          {title}
        </div>
        <div>
          {list
            .filter(item => (item.label as any)?.includes(optionFilter || ''))
            .map((item, index) => {
              const { dataIndex, fixed, disable } = item;

              const isLeft = fixed === 'left' || fixed === true;
              const isRight = fixed === 'right';

              const isCommon = isNil(fixed);
              const fixedDisable = typeof disable === 'boolean' ? disable : disable?.fixed;

              return (
                // @ts-ignore
                <SortItem
                  key={dataIndex}
                  index={index}
                  Component={Checkbox}
                  props={{
                    value: dataIndex,
                  }}
                  collection={collection}
                >
                  <div className={styles.checkLabel} role="checkboxArea" aria-label={dataIndex}>
                    {draggable && !optionFilter && <DragHandler />}
                    <div className={styles.main}>
                      <span className={styles.label}>{item.label}</span>
                      <div
                        className={styles.opt}
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        {!fixedDisable && !optionFilter && (
                          <>
                            {!isLeft && (
                              <Tooltip content="固定在左边">
                                <IconAlignLeft
                                  onClick={() => {
                                    fixedChange(item, true);
                                  }}
                                />
                              </Tooltip>
                            )}
                            {!isCommon && (
                              <Tooltip content="不固定">
                                <IconAlignCenter
                                  onClick={() => {
                                    fixedChange(item, undefined);
                                  }}
                                />
                              </Tooltip>
                            )}
                            {!isRight && (
                              <Tooltip content="固定在右边">
                                <IconAlignRight
                                  onClick={() => {
                                    fixedChange(item, 'right');
                                  }}
                                />
                              </Tooltip>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </SortItem>
              );
            })}
        </div>
      </div>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const renderGroupList = (columns: ColumnsStateWithLabel[]) => {
    const leftList: ColumnsStateWithLabel[] = [];
    const rightList: ColumnsStateWithLabel[] = [];
    const list: ColumnsStateWithLabel[] = [];

    columns.forEach(item => {
      const { fixed } = item;

      if (fixed === 'left' || fixed === true) {
        leftList.push(item);

        return;
      }

      if (fixed === 'right') {
        rightList.push(item);

        return;
      }

      list.push(item);
    });

    const startIdxMap = {
      left: 0,
      right: leftList.length + list.length,
      common: leftList.length,
    };

    const handleSortEnd = ({ oldIndex: from, newIndex: to, collection }, _e) => {
      const startIdx = startIdxMap[collection] || 0;
      const result = [...fields];

      const startIndex = (to < 0 ? result.length + to : to) + startIdx;

      if (startIndex >= 0 && startIndex < result.length) {
        const [item] = result.splice(from + startIdx, 1);

        result.splice(startIndex, 0, item);
      }

      setFields(result);
    };

    return (
      // @ts-ignore
      <SortList
        className={cx(styles.options, ref.current)}
        Component={CheckboxGroup}
        useDragHandle
        lockAxis="y"
        props={{
          value: checkedValue,
          onChange: handleCheck,
        }}
        onSortEnd={handleSortEnd}
        helperClass={styles.sortHelper}
      >
        <SortCheckboxList title="固定在左边" list={leftList || []} collection="left" />
        <SortCheckboxList title="不固定" list={list || []} collection="common" />
        <SortCheckboxList title="固定在右边" list={rightList || []} collection="right" />
      </SortList>
    );
  };

  return (
    <Popover
      getPopupContainer={() => document.getElementById(ref.current) as HTMLElement}
      visible={visible}
      trigger="custom"
      position="bottomRight"
      zIndex={1000}
      onClickOutSide={onCancel}
      wrapper
      content={
        <div className={styles.popover}>
          <div className={styles.title}>字段配置</div>
          {filter && (
            <Input
              style={{ width: '100%' }}
              prefix={<IconSearch />}
              placeholder="输入字段筛选"
              onChange={handleFilter}
              showClear
            />
          )}
          <Checkbox
            onChange={toggleCheckAll}
            checked={checkAll}
            className={styles.allCheck}
            indeterminate={!checkAll && checkedValue.length !== 0}
          >
            全部字段
          </Checkbox>
          <div className={styles.sortList}>{renderGroupList(options)}</div>
          <Row type="flex" justify="space-between" align="middle">
            <div>
              <Text link onClick={reset}>
                恢复预设
              </Text>
            </div>
            <Space>
              <Button type="tertiary" onClick={onCancel}>
                取消
              </Button>
              <Button theme="solid" onClick={apply} disabled={!validateFields()}>
                应用
              </Button>
            </Space>
          </Row>
        </div>
      }
    >
      <span
        className={className}
        id={ref.current}
        style={{ ...btnStyle, display: 'inline-block', position: 'relative' }}
      >
        <Button onClick={handlePopoverVisible}>字段配置</Button>
      </span>
    </Popover>
  );
};
