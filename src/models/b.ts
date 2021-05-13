import {  Effect, Reducer } from 'umi';

export interface listModelState {
  loadStatus: number,
  list?: Array<any> | null,
  count?: number,
}
export interface listModelType {
  namespace: string,
  state: listModelState,
  reducers: {
    loadList: Reducer,
    loadListCompletion: Reducer<listModelState>,
  },
  effects: {
    loadListEffect: Effect,
  }
}

const BModel: listModelType = {
  namespace: 'b',
  state: {
    loadStatus: 0,
    list: null,
    count: 0,
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
        list: list || null,
        count: count || 0,
      }
    }
  },
  effects: {
    *loadListEffect({}, { call, put }) {
      yield put({ type: 'loadList' })

      const result = yield call(() => new Promise(resolve => {
        resolve({list: [1], count: 1})
      }))
      console.log(result)

      yield put({
        type: 'loadListCompletion',
        payload: { error: undefined, ...result }
      })
    }
  }
}

export default BModel;