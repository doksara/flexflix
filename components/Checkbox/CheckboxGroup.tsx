import React, {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useMemo,
} from "react"

interface CheckboxGroupProps {
  children: React.ReactNode
}

const CheckboxGroup = ({ children }: CheckboxGroupProps) => {
  console.log("Rerendering checkboxGroup")
  const handler = useCallback(() => (e: any) => console.log(e), [])

  const _children = useMemo(() => {
    return Children.map(children, (currentChild, currentIndex) => {
      if (isValidElement(currentChild)) {
        return cloneElement(currentChild as JSX.Element, {
          onChange: handler,
        })
      }
    })
  }, [children, handler])

  return <>{_children}</>
}

export default CheckboxGroup
