import type {CategoryResponseValues} from "@/types/ServerResponseDTO.ts";
import {MdCircle, MdFavorite, MdMood, MdStar} from "react-icons/md";
import {TbLungs} from "react-icons/tb";
import ListItemCard from "@/components/ui/DataCards/ListItemCard.tsx";
import {Icon} from "@chakra-ui/react";

const IconList = {
    star: <MdStar/>,
    heart: <MdFavorite/>,
    smile: <MdMood/>,
    lung: <TbLungs/>
}

interface CategoryCardProps {
    category: CategoryResponseValues;
    onEdit: () => void | Promise<void>;
    onDelete: () => void | Promise<void>;
}

const CategoryCard = ({category, onEdit, onDelete}: CategoryCardProps) => {

    const iconKey = category.icon as keyof typeof IconList;
    return (
        <ListItemCard onEdit={onEdit} onDelete={onDelete}>
            <Icon size={"md"}>
                {IconList[iconKey] ?? <MdCircle/>}
            </Icon>
            {category.name}
        </ListItemCard>

    )
}

export default CategoryCard