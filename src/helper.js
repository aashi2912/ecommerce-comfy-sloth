export const formatPrice = (number) => {
    return new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
    }).format(number / 100);
};

export const getCategories =
    (products) => {
        let categories = [];
        products.forEach(product => categories.push(product.category.toLowerCase()));
        return new Set(["all", ...categories]);
    }

export const getCompanies =
    (products) => {
        let companies = [];
        products.forEach(product => companies.push(product.company.toLowerCase()));
        return new Set(["all", ...companies]);
    }