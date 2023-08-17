/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types'
import type { PropertyValue } from '../types/prop-type'
import type { Properties } from '../types/csstype'
import type { Tokens } from '../tokens'

export type TextProperties = {
   variant?: ConditionalValue<"title" | "subtitle" | "body" | "caption">
}


type TextOptions = TextProperties & Omit<SystemStyleObject, keyof TextProperties >

/** Component for text rendering */
export declare function text(options?: TextOptions): string
