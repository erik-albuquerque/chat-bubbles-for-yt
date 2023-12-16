import { BACKSPACE_KEY_CODE, ENTER_KEY_CODE } from '../../../../../../constants'

export enum ChatActionEnum {
  BACKSPACE_KEY_PRESS = BACKSPACE_KEY_CODE,
  ENTER_KEY_PRESS = ENTER_KEY_CODE,
  REMOVE_MESSAGE = 'remove_message',
  HIDE_MESSAGE = 'hide_message',
  UPDATE_DRAFT_MESSAGE = 'update_draft_message'
}

type BackspaceKeyPressAction = {
  type: ChatActionEnum.BACKSPACE_KEY_PRESS
}

type EnterKeyPressAction = {
  type: ChatActionEnum.ENTER_KEY_PRESS
  key: string
}

type UpdateDraftMessageAction = {
  type: ChatActionEnum.UPDATE_DRAFT_MESSAGE
  key: string
  code: string
}

type RemoveMessageAction = {
  type: ChatActionEnum.REMOVE_MESSAGE
}

type HideMessageAction = {
  type: ChatActionEnum.HIDE_MESSAGE
}

type ChatActionTypes =
  | BackspaceKeyPressAction
  | EnterKeyPressAction
  | UpdateDraftMessageAction
  | RemoveMessageAction
  | HideMessageAction

export type { ChatActionTypes }
