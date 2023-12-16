import { v4 as uuid } from 'uuid'

import { SPECIAL_KEYS } from '../../../../../constants'
import { MessageType } from '../../../../../types/Message'
import { ChatActionEnum, ChatActionTypes } from './types'

type ChatState = {
  chatHistory: MessageType[]
  draftMessage: string
}

const updateDraftMessage = (
  state: ChatState,
  key: string,
  code: string
): ChatState => {
  return !SPECIAL_KEYS.includes(code) && key.length === 1
    ? { ...state, draftMessage: state.draftMessage + key }
    : state
}

const isMessageEmpty = (message: string): boolean => message.trim() === ''

const chatReducer = (state: ChatState, action: ChatActionTypes): ChatState => {
  const { chatHistory, draftMessage } = state

  switch (action.type) {
    case ChatActionEnum.BACKSPACE_KEY_PRESS:
      return { ...state, draftMessage: draftMessage.slice(0, -1) }

    case ChatActionEnum.ENTER_KEY_PRESS:
      return !isMessageEmpty(draftMessage)
        ? {
            ...state,
            chatHistory: [
              ...chatHistory,
              { id: uuid(), content: draftMessage, isVisible: true }
            ],
            draftMessage: ''
          }
        : state

    case ChatActionEnum.HIDE_MESSAGE:
      return chatHistory.length > 0
        ? {
            ...state,
            chatHistory: [
              { ...chatHistory[0], isVisible: false },
              ...chatHistory.slice(1)
            ]
          }
        : state

    case ChatActionEnum.REMOVE_MESSAGE:
      return chatHistory.length > 0
        ? { ...state, chatHistory: [...chatHistory.slice(1)] }
        : state

    case ChatActionEnum.UPDATE_DRAFT_MESSAGE:
      return updateDraftMessage(state, action.key, action.code)

    default:
      return state
  }
}

export { chatReducer }
