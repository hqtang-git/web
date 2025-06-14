export const FILTER_KEYS = {
  'gender': 'gender',
  'unit': 'unit',
  'qual': 'qual',
  'system': 'system',
  'cons': 'cons',
}
export const FieldLabels = {
  'id': 'ID编号',
  'name': '姓名',
  [FILTER_KEYS.gender]: '性别',
  [FILTER_KEYS.unit]: '单位',
  [FILTER_KEYS.qual]: '值班资格', 
  [FILTER_KEYS.system]: '所属系统',
  [FILTER_KEYS.cons]: '值班类型',
  'exclude': '不值班时间段',
  'info': '备注信息',
}

export const formClearValue = {
  'id': '',
  'name': '',
  [FILTER_KEYS.gender]: '',
  [FILTER_KEYS.unit]: '',
  [FILTER_KEYS.qual]: '',
  [FILTER_KEYS.system]: '',
  [FILTER_KEYS.cons]: '',
  'exclude': [],
  'info': '',
}

