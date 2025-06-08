import dayjs from "dayjs";

const EMPTY = '-';

interface IProps {
  value: string | number;
  weekDay?: string;
  isShowWeekDay?: boolean;
  className?: string;
}

/**
 * @description 日期格式化
 * @param props 
 */
export const Date = (props: IProps) => {
  const { value, weekDay, isShowWeekDay = false, className } = props;

  const result = dayjs(value).format('YYYY-MM-DD');

  if (!value) {
    return <>{EMPTY}</>;
  }

  return (
    <span className={className}>
      {result || EMPTY}
      {
        isShowWeekDay && weekDay ? (
          <span className="ml-2">{`(${weekDay})`}</span>
        ) : null
      }
    </span>
  )
}