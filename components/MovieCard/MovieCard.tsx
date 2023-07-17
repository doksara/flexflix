import { getImagePath } from "../../utils"
import * as S from "./styles"
import { Box } from "../ui/Box"
import { Image } from "../Image/Image"

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
    <Box position="relative" borderRadius="16px" overflow="hidden">
      <S.MovieCardPocket>
        <S.MovieCardTitle>{title}</S.MovieCardTitle>
        <S.MovieCardSubtitle>{subtitle}</S.MovieCardSubtitle>
      </S.MovieCardPocket>
      <S.MovieCardImageWrapper>
        <Image
          width={300}
          height={342}
          src={imgSrc ? getImagePath(imgSrc) : ""}
          fallback="https://placehold.co/300x342.png"
          alt={title}
          style={{ borderRadius: "16px", objectFit: "cover", display: "block" }}
        />
      </S.MovieCardImageWrapper>
    </Box>
  )
}
