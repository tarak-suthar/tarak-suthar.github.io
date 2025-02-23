import config from "../config.json"
const productsApi = {
    fetchAll: `${config.base_uri}/public/products`,
    searchAll: `${config.base_uri}/public/products/search`
}
export default productsApi;