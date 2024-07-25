import {Card, Col} from "react-bootstrap";
import {ProductListDto} from "../../../../data/ProductListDto.ts";
import {Link} from "react-router-dom";

type Props = {
  product: ProductListDto;
}

export default function ProductList({product}: Props) {
  return (

    <Col key={product.id}>
      <div className="d-flex justify-content-center mt-4 mb-1">
        <Card style={{
          width: "600px",
          height: "600px"
        }}>
          <div
            className="image-container"
            style={{
              backgroundImage: `url(${product.image_url})`,
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundImage = `url(${product.image_hover_url})`}
            onMouseLeave={(e) => e.currentTarget.style.backgroundImage = `url(${product.image_url})`}
          >
          </div>


          <div>
            <Card.Body
              className="d-flex flex-column align-items-center"
              style={{
                minHeight: "100px"}}
            >


              <Card.Title
                style={{
                  height: "90px"
                }}>
                {product.name}
              </Card.Title>



              <Card.Text style={{
                height: "10px"
              }}>
                ${product.price}
              </Card.Text>



            </Card.Body>


              <Link to={`/product/${product.id}`}>
                <button className="btn btn-outline-info " style={{
                  width: "90%",
                  marginLeft: "5%",
                  marginBottom: "5%"
                }}>Details
                </button>

              </Link>

          </div>

        </Card>
      </div>
    </Col>


  )
}