import useIndexedDB from "~/composables/useIndexedDB";

const data = useIndexedDB({
  key: "builder",
  defaultValue: {
    id: "",
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    image: "",
    images: [],
    category: "",
    tags: [],
    status: "",
  },
});

export default function useBuilder() {
  return { data };
}
