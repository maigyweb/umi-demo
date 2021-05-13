import {  Effect, Reducer } from 'umi';

export interface listModelState {
  loadStatus?: number,
  list?: Array<any> | null,
  count?: number,
  input?: {
    inputValue: string,
    radioValue: string,
    dateValue: number,
  },
}
export interface listModelType {
  namespace: string,
  state: listModelState,
  reducers: {
    loadList: Reducer,
    loadListCompletion: Reducer<listModelState>,
    syncListInput: Reducer<listModelState>,
  },
  effects: {
    loadListEffect: Effect,
  }
}

const AModel: listModelType = {
  namespace: 'a',
  state: {
    loadStatus: 0,
    list: null,
    count: 0,
    input: {
      inputValue: '',
      radioValue: '',
      dateValue: 0,
    }
  },
  reducers: {
    loadList(state) {
      return {
        ...state,
        loadStatus: 1,
      }
    },
    loadListCompletion(state, action) {
      const { error, list = null, count = 0 } = action.payload;
      if (error) {
        return {
          ...state,
          loadStatus: 0,
        }
      }

      return {
        ...state,
        loadStatus: 2,
        list,
        count,
      }
    },
    syncListInput(state, action) {
      const { input, reset } = action;
      return {
        ...(reset ? AModel.state : state),
        input: {
          ...(reset ? AModel.state.input : state && state.input),
          ...input,
        }
      }
    }
  },
  effects: {
    *loadListEffect({}, { call, put }) {
      yield put({ type: 'loadList' })

      const result = yield call(() => new Promise(resolve => {
        resolve({list: [1], count: 1})
      }))

      yield put({
        type: 'loadListCompletion',
        payload: { error: undefined, ...result }
      })
    }
  }
}

export default AModel;