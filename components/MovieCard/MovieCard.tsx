import { getImagePath } from "../../utils"
import { Box } from "../ui/Box"
import * as S from "./styles"
import Image from "next/image"

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
    <S.MovieCard>
      <S.MovieCardHeader>
        <S.MovieCardTitle>{title}</S.MovieCardTitle>
        <S.MovieCardSubtitle>{subtitle}</S.MovieCardSubtitle>
      </S.MovieCardHeader>
      <S.MovieCardImageWrapper height={340}>
        <Image
          src={imgSrc ? getImagePath(imgSrc) : ""}
          alt={title}
          fill
          style={{ borderRadius: "16px", objectFit: "cover" }}
        />
      </S.MovieCardImageWrapper>
    </S.MovieCard>
  )
}
