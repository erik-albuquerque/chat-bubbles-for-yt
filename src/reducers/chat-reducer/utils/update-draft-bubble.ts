import { SPECIAL_KEYS } from '../../../constants'
import { ChatState } from '../types'

const updateDraftBubble = (
  state: ChatState,
  key: string,
  code: string
): ChatState => {
  return !SPECIAL_KEYS.includes(code) && key.length === 1
    ? { ...state, draftBubble: state.draftBubble + key }
    : state
}

export { updateDraftBubble }
