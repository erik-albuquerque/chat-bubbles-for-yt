import { v4 as uuid } from 'uuid'

import { SPECIAL_KEYS } from '../../../../../constants'
import { BubbleType } from '../../../../../types/bubble'
import { ChatActionEnum, ChatActionTypes } from './types'

type ChatState = {
  chatHistory: BubbleType[]
  draftBubble: string
}

const updateDraftBubble = (
  state: ChatState,
  key: string,
  code: string
): ChatState => {
  return !SPECIAL_KEYS.includes(code) && key.length === 1
    ? { ...state, draftBubble: state.draftBubble + key }
    : state
}

const isBubbleEmpty = (bubble: string): boolean => bubble.trim() === ''

const chatReducer = (state: ChatState, action: ChatActionTypes): ChatState => {
  const { chatHistory, draftBubble } = state

  switch (action.type) {
    case ChatActionEnum.BACKSPACE_KEY_PRESS:
      return { ...state, draftBubble: draftBubble.slice(0, -1) }

    case ChatActionEnum.ENTER_KEY_PRESS:
      return !isBubbleEmpty(draftBubble)
        ? {
            ...state,
            chatHistory: [
              ...chatHistory,
              { id: uuid(), content: draftBubble, isVisible: true }
            ],
            draftBubble: ''
          }
        : state

    case ChatActionEnum.HIDE_BUBBLE:
      return chatHistory.length > 0
        ? {
            ...state,
            chatHistory: [
              { ...chatHistory[0], isVisible: false },
              ...chatHistory.slice(1)
            ]
          }
        : state

    case ChatActionEnum.REMOVE_BUBBLE:
      return chatHistory.length > 0
        ? { ...state, chatHistory: [...chatHistory.slice(1)] }
        : state

    case ChatActionEnum.UPDATE_DRAFT_BUBBLE:
      return updateDraftBubble(state, action.key, action.code)

    default:
      return state
  }
}

export { chatReducer }
