"use client"

import {ChakraProvider} from "@chakra-ui/react"
import {system} from "@/components/theme"
import {ColorModeProvider, type ColorModeProviderProps} from "@/components/ui/color-mode.tsx";

export function Provider(props: ColorModeProviderProps) {
    return (
        <ChakraProvider value={system}>
            <ColorModeProvider {...props} />
        </ChakraProvider>
    )
}
