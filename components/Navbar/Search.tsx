"use client"

import { SearchContext } from "../../context/SearchContext"
import React, { ChangeEvent, useContext } from "react"

export const Search = () => {
  const { query, setQuery } = useContext(SearchContext)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <input
      value={query}
      onChange={handleChange}
      aria-label="Search for TV Shows"
    />
  )
}
