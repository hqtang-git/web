import { Button, Form, Toast, SideSheet, Typography } from '@douyinfe/semi-ui';
import { useMemo, useState, useRef} from 'react';
import dayjs from 'dayjs';
import { useLockFn } from 'ahooks';
import axios from 'axios';

import { useUserStore, Mode } from './store';
import { FieldLabels, formClearValue } from './const';
import { convertChineseToValue } from '../../common/util'

const {
  DatePicker,
  Select,
  Radio,
  RadioGroup,
  Input,
  TextArea,
} = Form;

const TypeToFormComponentsMap = {
  'select': {
    Wrap: Select,
    Item: Select.Option,
  },
  'radio': {
    Wrap: RadioGroup,
    Item: Radio,
  },
};


interface IProps {
  options: any[];
  refreshList: () => void;
}

export const Drawer = ({ options, refreshList }: IProps) => {
  const currentOperateUser = useUserStore(state => state.currentOperateUser);
  const mode = useUserStore(state => state.mode);
  const formRef = useRef<any>();
  const [loading, setLoading] = useState(false);

  const isShowForm = mode && [Mode.EDIT, Mode.ADD].includes(mode);
  const setMode = useUserStore(state => state.setMode);
  const isEditMode = mode === Mode.EDIT;

  const { description, item } = options?.find(item => item?.type === 'timeselct') || {};

  const initValues: any = useMemo(() => {
    if (!isEditMode) {
      return {
        info: '无'
      };
    }

    const { name, info, exclude, isleader, ...rest } = currentOperateUser || {};
    const restFormValues = convertChineseToValue(rest, options);

    const result = {
      name,
      info,
      isleader,
      ...restFormValues,
      exclude: typeof exclude === 'string' ? (exclude?.split(';') || []) : []
    };

    return result;
  }, [currentOperateUser]);

  const hideForm = () => {
    (formRef?.current as any)?.formApi?.setValues(formClearValue, {
      isOverride: true
    });

    setMode(Mode.CLOSE);
  };

  const handleReset = async () => {
    await (formRef?.current as any)?.formApi?.reset();
  }

  const handleSubmit = useLockFn(async () => {
    const { values } = (formRef?.current as any)?.formApi?.getFormState();
    await (formRef?.current as any)?.formApi?.validate();

    const { exclude = [], ...rest } = values || {};
    const excludeTransform = exclude?.map(item => dayjs(item).format('YYYY/MM/DD')).join(';');
    
    const params = {
      exclude: excludeTransform,
      ...(isEditMode ? {
        id: currentOperateUser?.id
      } : {}),
      ...rest,
    };

    console.log('@@@@2 ~ 提交参数:', params)
    setLoading(true);
    axios.post('http://192.168.1.6:5050/pinfo_manage', params).then(response => {
      console.log('@@@@2 ~ 提交返回数据:', response);
      const { status, message } = response.data || {};
      setLoading(false);

      // 成功
      if (status === "success") {
        hideForm();
        Toast.success(message);
        refreshList();
      } else {
        // 失败
        Toast.error(message || '提交失败');
      }

    }).catch(error => {
      setLoading(false);
      Toast.error(error?.message || '提交失败')
    });
  })

  const footer = (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={handleReset} style={{ marginRight: 8 }}>重置</Button>
      <Button onClick={handleSubmit} theme="solid" loading={loading}>提交</Button>
    </div>
  );
  

  if (!initValues) {
    return null;
  }

  return (
    <SideSheet
      title={<Typography.Title heading={4}>{isEditMode ? '编辑人员属性' : '创建人员' }</Typography.Title>}
      headerStyle={{ borderBottom: '1px solid var(--semi-color-border)' }}
      bodyStyle={{ borderBottom: '1px solid var(--semi-color-border)' }}
      visible={isShowForm}
      footer={footer}
      closeIcon={null}
      size='large'
      onCancel={hideForm}
    >
      <Form
        // @ts-ignore
        labelPosition='left'
        labelAlign='right'
        initValues={initValues || {}}
        ref={formRef as any}
      >

        <Input
          placeholder={`请输入${FieldLabels.name}`}
          disabled={isEditMode}
          field='name'
          label={FieldLabels.name}
          style={{ width: 300 }}
          rules={[{
            required: !isEditMode,
            message: `请输入${FieldLabels.name}`
          }]}
        />

        {/* 时间选择 */}
        <DatePicker
          extraText={description}
          field={item?.value}
          label={item?.key}
          multiple
          style={{ width: 300 }}
        />

        {/* 选择框集合 */}
        {
          !!options?.length ? (
            options.map(option => {
              const { optionList, type, item, description, disabledEdit } = option || {};
              console.log('@@@@2 ~ Table ~ option:', option)
              const { Wrap, Item } = TypeToFormComponentsMap[type] || {};

              if (!Wrap) {
                return null;
              }
              
              return (
                <Wrap
                  rules={[{
                    required: !isEditMode,
                    message: `请选择${item?.key}`
                  }]}
                  disabled={isEditMode ? !!disabledEdit : false}
                  extraText={description}
                  placeholder={`请选择${item?.key}`}
                  field={item?.value}
                  label={item?.key}
                  style={{ width: '300px' }}
                >
                  {
                    optionList?.map(i => (
                      <Item value={i.value}>{i?.key}</Item>
                    ))
                  }
                </Wrap>
              )
            })
          ) : null
        }

        <TextArea placeholder={`请输入${FieldLabels.info}`} field='info' label={FieldLabels.info} style={{ width: 300 }} />

      </Form>
    </SideSheet>
  )
}