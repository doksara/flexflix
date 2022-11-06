import { Card, Container, Grid, Col, Text } from '@nextui-org/react'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../context/SearchContext'
import { ApiResponse, TvListResultObject } from '../interface'
import styles from '../styles/Home.module.css'
import debounce from 'lodash/debounce'

export async function getJson<T>(
  request: RequestInfo
): Promise<T> {
  const response = await fetch(request)
  const body = await response.json()

  return body
}

export const getImagePath = (
  filePath: string
) => {
  const baseUrl = 'https://image.tmdb.org/t/p'
  const fileSize = 'w500'

  return `${baseUrl}/${fileSize}${filePath}`
}

export const getStaticProps: GetStaticProps = async (context) => {
  const API_KEY = process.env.TMDB_API_KEY
  const URL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`

  const data = await getJson<ApiResponse<TvListResultObject>>(URL)

  return {
    props: {
      shows: data.results
    }
  }
}

interface HomeProps {
  shows: TvListResultObject[]
}

const Home: NextPage<HomeProps> = ({ shows }) => {
  const [searchResults, setSearchResults] = useState<TvListResultObject[]>(shows)
  const { query } = useContext(SearchContext)

  useEffect(() => {
    debounce(() => {
      getJson<ApiResponse<TvListResultObject>>(`api/search/${query}`)
        .then(res => {
          setSearchResults(res.results)
        })
    }, 3000)()
  }, [query])

  return (
    <div className={styles.container}>
      <Head>
        <title>Trending :: flexflix</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <Grid.Container gap={2} justify="center">
            {searchResults.map(show => (
              <Grid key={show.id} xs={6} md={3} lg={2}>
                <Link passHref href={`/show/${encodeURIComponent(show.id)}`}>
                  <a>
                    <Card isHoverable>
                      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                        <Col>
                          <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                            {show.first_air_date}
                          </Text>
                          <Text h4 color="white">
                            {show.name}
                          </Text>
                        </Col>
                      </Card.Header>
                      <Card.Image
                        src={getImagePath(show.poster_path!)}
                        objectFit="cover"
                        width="100%"
                        height={340}
                        alt="Card image background"
                        showSkeleton
                      />
                    </Card>
                  </a>
                </Link>
              </Grid>
            ))}
          </Grid.Container>
        </Container>
      </main>
    </div>
  )
}

export default Home
