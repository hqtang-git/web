const isEmpty = (value) => value === '' || value === null || value === undefined;

export const formatNil = (value) => {
  return isEmpty(value) ? '-' : value;
}

/**
 * 将对象a中的中文值根据对象b的映射关系转换为对应数值
 * @param a 包含中文值的原始对象
 * @param b 包含映射关系的配置数组
 * @returns 转换后的数值对象
 */
export function convertChineseToValue(a: Record<string, string>, b: Array<any>): Record<string, number> {
    // 创建映射关系缓存
    const optionMap: Record<string, Record<string, number>> = {};
    
    // 构建从key到中文-值的映射
    b.forEach(item => {
        const key = item.item.value;
        if (!optionMap[key]) {
            optionMap[key] = {};
        }
        item.optionList.forEach(option => {
            optionMap[key][option.key] = option.value;
        });
    });
    
    // 转换a对象中的值
    const result: Record<string, number> = {};
    Object.entries(a).forEach(([key, value]) => {
        if (optionMap[key] && optionMap[key][value] !== undefined) {
            result[key] = optionMap[key][value];
        }
    });
    
    return result;
}


/**
 * 根据筛选项过滤列表数据
 * @param filters 筛选项对象，键为筛选字段，值为允许的选项数组
 * @param list 原始列表数据
 * @returns 符合所有筛选条件的列表数组
 */
export const filterList = (
    filters: Record<string, string[]>,
    list: Array<Record<string, any>>
  ): Array<Record<string, any>> => {
    return list.filter(item => {
      // 遍历所有筛选条件，必须全部满足
      return Object.entries(filters).every(([key, allowedValues]) => {
        // 如果筛选条件为空数组，则不限制此条件
        if (allowedValues.length === 0) return true;
        
        // 检查当前项是否包含该字段，且值在允许范围内
        return item.hasOwnProperty(key) && allowedValues.includes(item[key]);
      });
    });
  };