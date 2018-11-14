import Vue from 'vue'
import CommonToast from './common/Toast'
import CommonModal from './common/Modal'

import BaseDialog from './base/Dialog'

// 注册全局组件
Vue.component('common-toast', CommonToast)
Vue.component('common-modal', CommonModal)

Vue.component('base-dialog', BaseDialog)
