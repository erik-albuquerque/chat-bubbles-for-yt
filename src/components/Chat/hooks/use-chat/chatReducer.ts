import { v4 as uuid } from 'uuid'

import {
  BACKSPACE_KEY_CODE,
  ENTER_KEY_CODE,
  DEFAULT_KEY_CODE,
  SPECIAL_KEYS
} from '../../../../constants'
import { MessageType } from '../../../../types/Message'

export enum ChatActionTypes {
  BACKSPACE = BACKSPACE_KEY_CODE,
  ENTER = ENTER_KEY_CODE,
  DEFAULT = DEFAULT_KEY_CODE
}

type ChatState = {
  messages: MessageType[]
  currentMessage: string
}

type BackspaceAction = { type: ChatActionTypes.BACKSPACE }
type EnterAction = { type: ChatActionTypes.ENTER; key: string }
type DefaultAction = {
  type: ChatActionTypes.DEFAULT
  key: string
  code: string
}

type ChatAction = BackspaceAction | EnterAction | DefaultAction

const chatReducer = (state: ChatState, action: ChatAction) => {
  switch (action.type) {
    case ChatActionTypes.BACKSPACE:
      return { ...state, currentMessage: state.currentMessage.slice(0, -1) }

    case ChatActionTypes.ENTER:
      if (action.key.trim() !== '') {
        const messageId = uuid()
        return {
          ...state,
          messages: [
            ...state.messages,
            { id: messageId, content: state.currentMessage }
          ],
          currentMessage: ''
        }
      }
      return state

    case ChatActionTypes.DEFAULT:
      if (!SPECIAL_KEYS.includes(action.code) && action.key.length === 1) {
        return { ...state, currentMessage: state.currentMessage + action.key }
      }

      return state

    default:
      return state
  }
}

export { chatReducer }
