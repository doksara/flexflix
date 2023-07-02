import { getImagePath } from "../../utils"
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
      <S.MovieCardPocket>
        <S.MovieCardTitle>{title}</S.MovieCardTitle>
        <S.MovieCardSubtitle>{subtitle}</S.MovieCardSubtitle>
      </S.MovieCardPocket>
      <S.MovieCardImageWrapper>
        <Image
          width={300}
          height={342}
          src={imgSrc ? getImagePath(imgSrc) : ""}
          alt={title}
          style={{ borderRadius: "16px", objectFit: "cover", display: "block" }}
        />
      </S.MovieCardImageWrapper>
    </S.MovieCard>
  )
}
