import { DatePicker } from 'antd';
import moment from 'moment';

interface Props {
  name: string,
  value: number | null,
  onChange?: Function,
  format?: string,
  showTime?: boolean,
  className?: string,
}

const defaultFormat = 'YYYY-MM-DD HH:mm:ss'

export default function(props: Props) {
  const { name, value, showTime, format, onChange, className } = props;

  const handleInputChange = (evt: moment.MomentInput) => {
    onChange && onChange({ target: { name, value: moment(evt).unix() } });
  }

  const formatValue = value ? moment.unix(value) : null;

  return (
    <DatePicker
      className={className || undefined}
      value={formatValue}
      showTime={!!showTime}
      format={format || defaultFormat}
      onChange={handleInputChange}
    />
  )
}