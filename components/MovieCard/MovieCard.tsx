import { getImagePath } from "../../utils"
import * as S from "./styles"
import { Image } from "../Image/Image"
import { Box } from "../../styled-system/jsx"

export const MovieCard = ({
  title,
  subtitle,
  imgSrc,
}: {
  title: string
  subtitle: string
  imgSrc: string | null
}) => {
  return (
    <Box
      display="flex"
      height="100%"
      width="100%"
      position="relative"
      borderRadius="16px"
      overflow="hidden"
    >
      <S.MovieCardPocket>
        <S.MovieCardTitle>{title}</S.MovieCardTitle>
        <S.MovieCardSubtitle>{subtitle}</S.MovieCardSubtitle>
      </S.MovieCardPocket>
      <Box
        className="group"
        position="relative"
        width="100%"
        borderRadius="12px"
      >
        <Image
          fill
          src={imgSrc ? getImagePath(imgSrc) : ""}
          fallback="https://placehold.co/300x342.png"
          alt={title}
          _groupHover={{ transform: "scale(1.05)" }}
        />
      </Box>
    </Box>
  )
}
