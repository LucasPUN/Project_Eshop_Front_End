import {Card, Col} from "react-bootstrap";
import {ProductListDto} from "../../../../data/ProductListDto.ts";
import {Link} from "react-router-dom";

type Props = {
  product: ProductListDto;
}

export default function ProductList({product}: Props) {
  return (

    <Col key={product.product_id}>
      <div className="d-flex justify-content-center mt-5 mb-5">
        <Card style={{
          width: "500px",
          height: "500px"
        }}>
          <div style={{
            width: "100%",
            height: "80%",
            backgroundImage: `url(${product.image_url})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}>
          </div>

          <div >
            <Card.Body>

              <Card.Title style={{
                height: "50px"}}>{product.name}</Card.Title>


              <Card.Text>
                ${product.price}
              </Card.Text>


              <div className="d-flex justify-content-center">
                <Link to={`/product/${product.product_id}`}>
                  <button className="btn btn-outline-info">Details</button>
                </Link>
              </div>
            </Card.Body>
          </div>

        </Card>
      </div>
    </Col>


  )
}