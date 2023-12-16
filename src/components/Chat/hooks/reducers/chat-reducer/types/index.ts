import { BACKSPACE_KEY_CODE, ENTER_KEY_CODE } from '../../../../../../constants'

export enum ChatActionEnum {
  BACKSPACE_KEY_PRESS = BACKSPACE_KEY_CODE,
  ENTER_KEY_PRESS = ENTER_KEY_CODE,
  REMOVE_BUBBLE = 'remove_bubble',
  HIDE_BUBBLE = 'hide_bubble',
  UPDATE_DRAFT_BUBBLE = 'update_draft_bubble'
}

type BackspaceKeyPressAction = {
  type: ChatActionEnum.BACKSPACE_KEY_PRESS
}

type EnterKeyPressAction = {
  type: ChatActionEnum.ENTER_KEY_PRESS
  key: string
}

type UpdateDraftBubbleAction = {
  type: ChatActionEnum.UPDATE_DRAFT_BUBBLE
  key: string
  code: string
}

type RemoveBubbleAction = {
  type: ChatActionEnum.REMOVE_BUBBLE
}

type HideBubbleAction = {
  type: ChatActionEnum.HIDE_BUBBLE
}

type ChatActionTypes =
  | BackspaceKeyPressAction
  | EnterKeyPressAction
  | UpdateDraftBubbleAction
  | RemoveBubbleAction
  | HideBubbleAction

export type { ChatActionTypes }
