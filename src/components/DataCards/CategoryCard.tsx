import type {CategoryResponse} from "@/types/CategoryResponse.ts";
import {Card, HStack} from "@chakra-ui/react";
import {MdCircle, MdFavorite, MdMood, MdStar} from "react-icons/md";
import {TbLungs} from "react-icons/tb";

const IconList = {
    star: <MdStar/>,
    heart: <MdFavorite/>,
    smile: <MdMood/>,
    lung: <TbLungs/>
}


const CategoryCard = ({category}: { category: CategoryResponse }) => {

    const iconKey = category.icon as keyof typeof IconList;
    return (
        <Card.Root>
            <Card.Body>
                <Card.Title>
                    <HStack>{IconList[iconKey] ?? <MdCircle/>}
                        {category.name}</HStack>

                </Card.Title>
            </Card.Body>
        </Card.Root>
    )
}

export default CategoryCard