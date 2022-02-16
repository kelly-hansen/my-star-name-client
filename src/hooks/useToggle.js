import { useState } from 'react'

const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen((value) => { return !value })
  }

  return [isOpen, toggle]
}

export default useToggle
