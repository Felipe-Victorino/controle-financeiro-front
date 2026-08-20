import {Box, Heading, Text} from "@chakra-ui/react";

const DashboardTitle = ({name, body}: { name?: string, body?: string }) => {
    return (
        <Box>
            <Heading>
                {name}
            </Heading>
            <Text>
                {body}
            </Text>
        </Box>
    )
}
export default DashboardTitle;