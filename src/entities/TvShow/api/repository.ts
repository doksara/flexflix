import { getJson } from "utils"
import { trending } from "./routes"
import { ApiResponse, TVShow } from "@/core/api/interface"

export const getTrending = () => getJson<ApiResponse<TVShow>>(trending())
