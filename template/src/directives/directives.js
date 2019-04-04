import { trackEvent } from '@/utils/track'

const directives = {
  'track-event': {
    bind (el, binding) {
      el.addEventListener('click', () => {
        trackEvent(binding.value)
      })
    }
  },
  'async-click': {
    bind (el, binding) {
      let isDisabled
      el.addEventListener('click', async () => {
        if (isDisabled) return

        isDisabled = true
        try {
          await binding.value()
          isDisabled = false
        } catch (e) {
          isDisabled = false
          throw e
        }
      })
    }
  }
}

export default directives
