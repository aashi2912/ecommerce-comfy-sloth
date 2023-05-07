import { Box, Container, Flex, Text } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Filter from "../components/Filter";
import Loading from "../components/Loading";
import PageHero from "../components/PageHero";
import Product from "../components/ProductCard";

function Products() {
  const filterInitialState = {
    search: "",
    price: 0,
    category: "all",
    company: "all",
    maxPrice: 0,
  };
  const [filter, setFilter] = useState(filterInitialState);
  const { all_products, isLoading } = useSelector((state) => state.product);
  const [loading, setLoading] = useState(true);

  const handleFilterChange = (values) => {
    setFilter(values);
  };
  const [filteredProducts, setFilteredProducts] = useState([...all_products]);

  useMemo(() => {
    setLoading(true);
    let filteredProducts_latest = all_products;
    if (filter.search !== "") {
      filteredProducts_latest = filteredProducts_latest.filter(
        (p) => p.name.search(filter.search) !== -1
      );
    }
    if (filter.company.toLowerCase() !== "all") {
      filteredProducts_latest = filteredProducts_latest.filter(
        (p) => p.company.toLowerCase() === filter.company.toLowerCase()
      );
    }
    if (filter.category.toLowerCase() !== "all") {
      filteredProducts_latest = filteredProducts_latest.filter(
        (p) => p.category.toLowerCase() === filter.category.toLowerCase()
      );
    }
    if (filter.price !== filter.maxPrice) {
      filteredProducts_latest = filteredProducts_latest.filter(
        (p) => p.price <= filter.price
      );
    }
    setFilteredProducts(filteredProducts_latest);
    setLoading(false);
  }, [filter, all_products]);

  if (all_products.length === 0 || loading || isLoading) {
    return <Loading />;
  }
  return (
    <Box mb={10}>
      <PageHero page={"Products"} />
      <Container maxW={"container.xl"} marginTop={{ base: 5, md: 20 }}>
        <Flex
          width="100%"
          columnGap={4}
          direction={{ base: "column", md: "row" }}
        >
          <Flex flex={1}>
            <Filter
              filter={filter}
              setFilter={setFilter}
              resetFilter={() => {
                let max = 0;
                all_products.forEach((e) => {
                  max = Math.max(e.price, max);
                });
                setFilter({
                  ...filterInitialState,
                  maxPrice: max,
                  price: max,
                });
              }}
              handleFilterChange={handleFilterChange}
            />
          </Flex>
          <Flex
            flex={4}
            justifyContent={{ base: "center", md: "flex-start" }}
            wrap="wrap"
            rowGap={"2rem"}
            columnGap="1.5rem"
            marginTop={{ base: 5, md: 0 }}
          >
            {filteredProducts.length > 0 &&
              filteredProducts.map((product, index) => {
                return <Product product={product} key={index} />;
              })}
            {all_products.length > 0 && filteredProducts.length === 0 && (
              <Box>
                <Text
                  sx={{
                    letterSpacing: "var(--spacing)",
                    color: "var(--clr-primary-1)",
                    fontSize: "2rem",
                    textTransform: "capitalize",
                  }}
                >
                  Sorry, no products matched your search.
                </Text>
              </Box>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default Products;
