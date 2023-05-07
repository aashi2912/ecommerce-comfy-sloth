import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function PageHero({ page = null, title = null }) {
  return (
    <Flex
      fontSize={{ base: "100%", md: "1.1rem" }}
      sx={{
        color: "var(--clr-primary-1)",
        backgroundColor: "var(--clr-primary-10)",
        width: "100%",
        alignItems: "center",
        fontWeight: "bold",
        height: "10vh",
        textTransform: "capitalize",
        overflow: "auto",
      }}
    >
      <Container maxW={"container.xl"}>
        <Breadcrumb>
          <BreadcrumbItem className="breadcrumb-item">
            <BreadcrumbLink as={Link} to={"/"}>
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem
            isCurrentPage={title === null && page !== null}
            className={`breadcrumb-item ${
              Boolean(page !== null && title === null) ? "active" : ""
            }`}
          >
            <BreadcrumbLink as={Link} to={"/products"}>
              {page}
            </BreadcrumbLink>
          </BreadcrumbItem>
          {title && (
            <BreadcrumbItem
              isCurrentPage={Boolean(title)}
              className={`breadcrumb-item ${
                Boolean(page !== null && title !== null) ? "active" : ""
              }`}
            >
              <BreadcrumbLink as={Link} to={`/${title}`}>
                {title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}
        </Breadcrumb>
      </Container>
    </Flex>
  );
}

export default PageHero;
