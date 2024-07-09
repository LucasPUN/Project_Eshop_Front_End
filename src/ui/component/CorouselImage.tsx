import {Carousel, Container, Image} from "react-bootstrap";

export default function NoTransitionExample() {
    return (
            <Carousel slide={false} style={{width: '100%' , justifyContent:'center'}}>
                <Carousel.Item>
                    <Image src="https://bbgshophk.com/cdn/shop/files/Discount_SLIDE_DESK.png?v=1718971692&width=1880"
                           style={{height: '600px'}}
                           />
                    <Carousel.Caption>
                        {/*<h3>First slide label</h3>*/}
                        {/*<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <Image src="https://bbgshophk.com/cdn/shop/files/BADBLOOD_SLIDESHOW_DESKTOP_04d7852b-c89a-4e07-a2d7-e136ed5d845b.png?v=1718706177&width=1770"
                           style={{height: '600px'}}
                    />
                    <Carousel.Caption>
                        {/*<h3>Second slide label</h3>*/}
                        {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
                    </Carousel.Caption>
                </Carousel.Item>

                {/*<Carousel.Item>*/}
                {/*    <Image src="https://www.freewebheaders.com/wp-content/gallery/cats/cute-sleepy-kitten-website-header.jpg"*/}
                {/*         />*/}
                {/*    <Carousel.Caption>*/}
                {/*        /!*<h3>Third slide label</h3>*!/*/}
                {/*        /!*<p>*!/*/}
                {/*        /!*    Praesent commodo cursus magna, vel scelerisque nisl consectetur.*!/*/}
                {/*        /!*</p>*!/*/}
                {/*    </Carousel.Caption>*/}
                {/*</Carousel.Item>*/}
            </Carousel>

    );
}