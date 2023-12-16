import { useReducer, useCallback, useMemo, useState, useEffect } from 'react'

import { BACKSPACE_KEY_CODE, ENTER_KEY_CODE } from '../../../../constants'
import { chatReducer } from '../reducers/chat-reducer'
import { ChatActionEnum } from '../reducers/chat-reducer/types'

type ActionMap = {
  [key: string]: ChatActionEnum
}

const ACTION_MAP: ActionMap = {
  [BACKSPACE_KEY_CODE]: ChatActionEnum.BACKSPACE_KEY_PRESS,
  [ENTER_KEY_CODE]: ChatActionEnum.ENTER_KEY_PRESS
}

enum TimerValues {
  SHORT = 500, // 500ms
  LONG = 6000 // 6 sec
}

const useChat = () => {
  const [{ chatHistory, draftBubble }, dispatch] = useReducer(chatReducer, {
    chatHistory: [],
    draftBubble: ''
  })

  const [isBubbleVisible, setIsBubbleVisible] = useState(true)

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { code, key } = event
    const action = ACTION_MAP[code]

    if (action) dispatch({ type: action, key, code })
    dispatch({ type: ChatActionEnum.UPDATE_DRAFT_BUBBLE, key, code })
  }, [])

  const getTimerDuration = useMemo(() => {
    return chatHistory.length >= 3 ? TimerValues.SHORT : TimerValues.LONG
  }, [chatHistory.length])

  useEffect(() => {
    const timerId = setTimeout(
      () => {
        dispatch({
          type: isBubbleVisible
            ? ChatActionEnum.HIDE_BUBBLE
            : ChatActionEnum.REMOVE_BUBBLE
        })
        setIsBubbleVisible(!isBubbleVisible)
      },
      isBubbleVisible ? TimerValues.SHORT : getTimerDuration
    )

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearTimeout(timerId)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [getTimerDuration, handleKeyDown, isBubbleVisible])

  return {
    chatHistory,
    draftBubble,
    dispatch
  }
}

export { useChat }
