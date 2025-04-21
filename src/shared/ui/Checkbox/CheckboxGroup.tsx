import React, { Children, cloneElement, isValidElement, useMemo } from "react"

interface CheckboxGroupProps {
  children: React.ReactNode
  initialValues: string[]
}

const CheckboxGroup = ({ children, initialValues }: CheckboxGroupProps) => {
  const _children = useMemo(() => {
    return Children.map(children, (currentChild, currentIndex) => {
      if (isValidElement(currentChild)) {
        return cloneElement(currentChild as JSX.Element, {
          checked: initialValues.includes(currentChild.props.value),
        })
      }
    })
  }, [children, initialValues])

  return <>{_children}</>
}

export default CheckboxGroup
