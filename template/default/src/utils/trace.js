/**
 * 银河统计
 * Created by GG on 2020/5/13.
 */

import { invoke, isAvailable } from '@mf2e/js-bridge'
import { isOnline } from '@/utils/detect'

let column
let columnd = process.env.VUE_APP_TITLE

// 设置 columnd
invokeIfAvailable('setColumnInfo', { columnd }, false)

async function trace(id, value) {
  if (!isOnline) return

  if (!column) {
    let res = await invokeIfAvailable('getColumnInfo', null, true)
    column = res?.column || 'H5'
    columnd = res?.columnd || columnd
  }

  if (value instanceof Object) {
    value = Object.assign({}, { column, columnd }, value)
  }

  let events = [{ id, value }]
  invokeIfAvailable('trace', { events }, false)
}

function invokeIfAvailable(name, params, needResult) {
  if (isAvailable(name)) {
    return invoke(name, params, needResult)
  }
}

export default trace
