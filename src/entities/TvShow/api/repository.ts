import { getJson } from "@/shared/lib/http"
import { trending } from "./routes"
import { ApiResponse, TVShow } from "@/core/api/interface"

export const getTrending = () => getJson<ApiResponse<TVShow>>(trending())
