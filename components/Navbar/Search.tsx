"use client"
import { IconSearch } from "../icons/IconSearch"
import { SearchContext } from "../../context/SearchContext"
import React, { useContext } from "react"
import { Input } from "@nextui-org/react"

export const Search = () => {
  const { query, searchHandler } = useContext(SearchContext)

  return (
    <Input
      value={query}
      onChange={(e) => searchHandler(e.target.value)}
      aria-label="Search for TV Shows"
      clearable
      contentLeft={
        <IconSearch fill="var(--nextui-colors-accents6)" size={16} />
      }
      contentLeftStyling={false}
      css={{
        w: "100%",
        "@xsMax": {
          mw: "300px",
        },
        "& .nextui-input-content--left": {
          h: "100%",
          ml: "$4",
          dflex: "center",
        },
      }}
      placeholder="Search..."
    />
  )
}
