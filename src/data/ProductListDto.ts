export interface ProductListDto {
    product_id: number;
    name:       string;
    image_url:  string;
    image_hover_url : string;
    price:      number;
    has_stock:  boolean;
}

export interface ProductDetailDto {
    product_id:  number;
    name:        string;
    description: string;
    image_url:   string;
    image_hover_url : string;
    price:       number;
    stock:       number;
}