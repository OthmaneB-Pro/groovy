import { useState } from "react"

export const useSuccessMessage = (timeDelay : number = 2000) => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const displaySuccessMessage = () => {
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
    }, timeDelay)
  }

  return { isSubmitted, displaySuccessMessage }
}
