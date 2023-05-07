import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatPrice, getCategories, getCompanies } from "../helper";

function loadProducts(categories, selectedCategory, setFilter) {
  return (
    <Box>
      <Text
        as={"h5"}
        fontWeight="bold"
        fontSize="1rem"
        marginBottom={"0.5rem"}
        color="var(--clr-grey-1)"
      >
        Category
      </Text>
      <Flex direction={"column"} rowGap={1}>
        {categories.length > 0 &&
          categories.map((c, key) => (
            <Text
              key={key}
              className={`filter-btn ${
                c.toLowerCase() === selectedCategory.toLowerCase()
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setFilter((preData) => ({ ...preData, category: c }))
              }
            >
              {c}
            </Text>
          ))}
      </Flex>
    </Box>
  );
}

function Filter({ filter, setFilter, resetFilter }) {
  const { all_products } = useSelector((state) => state.product);
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  useEffect(() => {
    const categories = getCategories(all_products);
    const companies = getCompanies(all_products);
    let max = 0;
    all_products.forEach((e) => {
      max = Math.max(e.price, max);
    });
    setMaxPrice(max);
    setCategories((prevState) => [...categories]);
    setCompanies((prevState) => [...companies]);
    setFilter((prevData) => ({ ...filter, maxPrice: max, price: max }));
  }, [all_products]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <Flex
      as={"form"}
      onSubmit={handleSubmit}
      sx={{
        flexDirection: "column",
        justifyContent: "flex-start",
        rowGap: 3,
      }}
    >
      <FormControl marginBottom={2}>
        <Input
          type={"text"}
          name="search"
          value={filter.search}
          placeholder="Search"
          textTransform={"capitalize"}
          background="var(--clr-grey-10)"
          borderRadius={"var(--radius)"}
          borderColor="transparent"
          letterSpacing={"var(--spacing)"}
          onChange={(event) =>
            setFilter((prevData) => ({
              ...prevData,
              search: event.target.value,
            }))
          }
        />
      </FormControl>
      {/* Categories */}
      {categories.length > 0 &&
        loadProducts(categories, filter.category, setFilter)}
      {/* Companies*/}
      {companies.length > 0 && (
        <Box>
          <Text
            as={"h5"}
            fontWeight="bold"
            fontSize="1rem"
            marginBottom={"0.5rem"}
            color="var(--clr-grey-1)"
          >
            Company
          </Text>

          <Select
            name={"company"}
            size={"sm"}
            style={{ textTransform: "capitalize" }}
            onChange={(e) =>
              setFilter((prevData) => ({
                ...prevData,
                company: e.target.value,
              }))
            }
          >
            {companies.map((c, index) => (
              <Box
                as={"option"}
                defaultValue={c.toLowerCase() === filter.company.toLowerCase()}
                value={c}
                key={index}
              >
                {c}
              </Box>
            ))}
          </Select>
        </Box>
      )}
      {/* Price */}
      <Box>
        <Text
          as={"h5"}
          fontWeight="bold"
          fontSize="1rem"
          marginBottom={"0.5rem"}
          color="var(--clr-grey-1)"
        >
          Price
        </Text>
        <Text color="var(--clr-grey-4)">{formatPrice(filter.price)}</Text>
        <input
          type={"range"}
          min={0}
          step={1}
          name="price"
          value={filter.price}
          max={filter.maxPrice}
          onChange={(event) =>
            setFilter((prevData) => ({
              ...prevData,
              price: event.target.value,
            }))
          }
          style={{
            width: "100%",
          }}
        />
      </Box>
      {/* Clear Filters */}
      <Box>
        <Button
          size="sm"
          type="button"
          onClick={() => resetFilter()}
          sx={{
            backgroundColor: "var(--clr-red-dark)",
            color: "var(--clr-white)",
            borderRadius: "var(--radius)",
            padding: "0.25rem 0.5rem",
            letterSpacing: "var(--spacing)",
            _hover: {
              backgroundColor: "var(--clr-red-dark)",
              color: "var(--clr-white)",
            },
          }}
        >
          Clear Filters
        </Button>
      </Box>
    </Flex>
  );
}

export default Filter;
