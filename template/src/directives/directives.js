import { trackEvent } from '@/utils/track'

const directives = {
  'track-event': {
    bind (el, binding) {
      el.addEventListener('click', () => {
        trackEvent('click_' + binding.value)
      })
    }
  }
}

export default directives
