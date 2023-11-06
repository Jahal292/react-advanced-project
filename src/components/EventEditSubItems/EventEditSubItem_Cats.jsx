import { useState, useEffect } from "react";
import { ACTIONS } from "../eventReducer";
import { useEvent } from "../EventContext";
import { useLoaderData } from "react-router-dom";
import { 
  Stack,
  Image,
  Center,
  Tooltip,
  Editable,
  Checkbox,
  Text,
} from "@chakra-ui/react"

export const loader = async () => {
  const categories = await fetch(`http://localhost:3000/categories`);

  return {
    categories: await categories.json(),
  };
};

export const EventEditSubItem_Cats = ({ eventItem, imgUrl,typeInput,direction }) => {
  const { dispatch } = useEvent();
  const { categories } = useLoaderData();
  const [selectedCategories, setSelectedCategories] = useState(
    new Set(eventItem)
  );
  const [editCats, setEditCats] = useState(false);

  const toggleCategory = (categoryId) => {
    if (selectedCategories.has(categoryId)) {
      selectedCategories.delete(categoryId);
    } else {
      selectedCategories.add(categoryId);
    }
    setSelectedCategories(new Set(selectedCategories));
  };

  const catsToShow = [];

  useEffect(() => {
    setEditCats(Array.from(selectedCategories));
    dispatch({ type: ACTIONS.EDIT_CATS, payload: editCats });
  }, [dispatch, selectedCategories, setSelectedCategories, editCats]);

  return (
    <Stack direction="row">
    <Center>
      <Tooltip label={typeInput}>
        <Image
          src={imgUrl}
          height={10}
          p={2}
          bg="brand.200"
          borderRadius="full"
          mr={5}
alt={typeInput}
/>
</Tooltip>
<Editable textAlign={"center"} color="black" defaultValue={eventItem} >
    <Stack direction={direction}>
      {editCats ? (
        categories.map((category) => {
          const isChecked = selectedCategories.has(category.id);

          return (
            <Checkbox
              colorScheme="orange"
              key={category.id}
              name="categoryIds"
              value={Array.from(selectedCategories)}
              onChange={() => toggleCategory(category.id)}
              isChecked={isChecked}
              sx={{
                borderColor: "brand.200",
                backgroundColor: "brand.100",
                paddingLeft: "5px",
                borderRadius: "20px",
              }}
            >
              {category.name}
            </Checkbox>
          );
        })
      ) : (
        <Text cursor={"crosshair"} onClick={() => setEditCats(!editCats)}>
          {eventItem.map((catId) => {
            const category = categories.find((cat) => cat.id === catId);
            catsToShow.push(category.name);
          })}

          {catsToShow.join(", ")}
        </Text>
      )}
    </Stack>
    </Editable>
    </Center>
    </Stack>
  );
};