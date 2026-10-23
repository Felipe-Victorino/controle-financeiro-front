import type {CategoryResponse} from "@/types/CategoryResponse.ts";
import {MdCircle, MdFavorite, MdMood, MdStar} from "react-icons/md";
import {TbLungs} from "react-icons/tb";
import ListItemContainer from "@/components/ui/Containers/ListItemContainer.tsx";
import {Icon} from "@chakra-ui/react";

const IconList = {
    star: <MdStar />,
    heart: <MdFavorite/>,
    smile: <MdMood/>,
    lung: <TbLungs/>
}


const CategoryCard = ({category}: { category: CategoryResponse }) => {

    const iconKey = category.icon as keyof typeof IconList;
    return (
        <ListItemContainer>
            <Icon size={"md"}>
                {IconList[iconKey] ?? <MdCircle/>}
            </Icon>
            {category.name}
        </ListItemContainer>

    )
}

export default CategoryCard