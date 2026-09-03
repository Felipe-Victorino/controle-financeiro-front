import {createSystem, defaultConfig, defineConfig} from "@chakra-ui/react";

const config = defineConfig({
    globalCss: {
        "*": {
            colorPalette: "cyan",
            boxSizing: "border-box"
        },
        html: {

            scrollBehavior: "smooth",
        },
    },
})

export const system = createSystem(defaultConfig, config)