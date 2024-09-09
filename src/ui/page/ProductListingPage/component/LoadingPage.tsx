import {Card, Col, Placeholder} from "react-bootstrap";

export default function LoadingPage() {
    return (
        <Col>
            <div className="d-flex justify-content-center mt-5 mb-5">
                <Card style={{ width: '18rem' }}>
                    <div style={{
                        width: "100%",
                        height: "200px",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "contain"
                    }}>
                    </div>

                    <Card.Body>
                        <Placeholder as={Card.Title} animation="glow">
                            <Placeholder xs={6} />
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="glow">
                            <Placeholder xs={2} />
                        </Placeholder>
                        <div className="d-flex justify-content-center">
                        <Placeholder.Button variant="primary" xs={4} />
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </Col>
    )
}