import { useSelector, useDispatch } from 'umi';
import { useEffect } from 'react';
import { createSelector } from 'reselect';
import { Input, Radio, Button } from 'antd';
import DatePicker from '@/ui/DatePicker';
import { listModelState } from '@/models/a';
import { listModelState as BListModalState } from '@/models/b';

const stateSelector = createSelector(
  (state: { a: listModelState }) => state.a,
  (state: { b: BListModalState }) => state.b,
  (a, b) => ({ ...a, bLoadStatus: b.loadStatus }),
)

interface Props {
  location: object,
}
interface State {
  a: listModelState,
  b: BListModalState,
}
interface AntdEvtModal {
  target: { name?: any, value?: any },
}

export default function pageOne(props: Props) {
  const stateProps = useSelector((state: State) => stateSelector(state));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'b/loadList' });

    dispatch({ type: 'a/syncListInput', reset: true });
  }, [dispatch]);

  const handleInputChange = (evt: AntdEvtModal) => {
    const node = evt.target;
    dispatch({ type: 'a/syncListInput', input: { [node.name]: node.value } });
  }

  const { inputValue, radioValue, dateValue } = stateProps.input || {};

  return (
    <div>
      <h1>loadStatus：{stateProps.loadStatus}</h1>
      <h1>bLoadStatus：{stateProps.bLoadStatus}</h1>

      <Input
        name="inputValue"
        value={inputValue}
        placeholder="input"
        onChange={handleInputChange}
      />
      <br />

      <Radio.Group name="radioValue" onChange={handleInputChange} value={radioValue}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </Radio.Group>
      <br />

      <DatePicker
        name="dateValue"
        value={dateValue || null}
        showTime={true}
        onChange={handleInputChange}
      />
      <br />

      <Button type="primary">按钮</Button>
    </div>
  );
}