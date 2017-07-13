// constants
export const PRODUCT_DETAI = "PRODUCT_DETAI";

// actions
export function getProductDetail() {
    return {
        type: PRODUCT_DETAI,
        data: {
            name: "monkey-product-detail"
        }
    }
}
