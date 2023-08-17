import { useEffect, useRef, useState } from "react"

import * as S from "./styles"
import { Box, Text } from "styled-system/jsx"
import { IconChevronUp } from "components/icons/IconChevronUp"
import { IconChevronDown } from "components/icons/IconChevronDown"

interface Props {
  open?: boolean
  title: React.ReactNode
  children: React.ReactNode
}

const Collapse = ({ open, title, children }: Props) => {
  const [isOpen, setIsOpen] = useState(open)
  const [height, setHeight] = useState<number | undefined>(open ? undefined : 0)
  const ref = useRef<HTMLDivElement>(null)

  const handleCollapse = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    setHeight(isOpen ? ref.current?.getBoundingClientRect().height : 0)
  }, [isOpen])

  return (
    <S.Collapse>
      <S.CollapseHeader onClick={handleCollapse}>
        <Text>{title}</Text>
        <Box>
          {isOpen ? (
            <IconChevronUp fill="primary" />
          ) : (
            <IconChevronDown fill="primary" />
          )}
        </Box>
      </S.CollapseHeader>

      <S.CollapseContent style={{ height: height }}>
        <div ref={ref}>{children}</div>
      </S.CollapseContent>
    </S.Collapse>
  )
}

export default Collapse
