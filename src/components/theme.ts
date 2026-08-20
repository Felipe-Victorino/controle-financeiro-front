import {createSystem, defaultConfig, defineConfig} from "@chakra-ui/react";

const config = defineConfig({
    globalCss: {
        "*": {
            boxSizing: "border-box"
        },
        html: {
            colorPalette: "cyan",
            scrollBehavior: "smooth",
        },
    },
})

export const system = createSystem(defaultConfig, config)