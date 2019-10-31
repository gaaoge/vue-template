import { invoke, isAvailable } from '@mf2e/js-bridge'

function invokeIfAvailable(name, params, needResult) {
  if (isAvailable(name)) {
    return invoke(name, params, needResult)
  }
}

function renderStart() {
  invokeIfAvailable('updateFailType', { failType: 2002 }, false)
}

function renderEnd() {
  invokeIfAvailable('render', { timestamp: { render: Date.now() } }, false)
}

function requestStart() {
  invokeIfAvailable('updateFailType', { failType: 2003 }, false)
}

function requestEnd() {
  invokeIfAvailable('updateFailType', { failType: 2004 }, false)
}

export { invokeIfAvailable, renderStart, renderEnd, requestStart, requestEnd }
