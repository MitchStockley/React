import React, { Component } from 'react'; //imports the Component class from ‘react’ library which we use to extend
import Product from './Product';
class Products extends Component { //imports the component class from react library
    products;
    constructor(props) {
        super(props);
        this.products = this.getProducts();
    }
    getProducts() {
        return [
            {
                imageUrl: "http://loremflickr.com/150/150?random=1",
                productName: "Product 1",
                releasedDate: "May 31, 2016",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Aenean porttitor, tellus laoreet venenatis facilisis, enim ex faucibus nulla, id rutrum ligula purus sit amet mauris. ",
                rating: 4,
                numOfReviews: 2
            },
            {
                imageUrl: "http://loremflickr.com/150/150?random=2",
                productName: "Product 2",
                releasedDate: "October 31, 2016",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Aenean porttitor, tellus laoreet venenatis facilisis, enim ex faucibus nulla, id rutrum ligula purus sit amet mauris. ",
                rating: 2,
                numOfReviews: 12
            },
            {
                imageUrl: "http://loremflickr.com/150/150?random=3",
                productName: "Product 3",
                releasedDate: "July 30, 2016",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Aenean porttitor, tellus laoreet venenatis facilisis, enim ex faucibus nulla, idrutrum ligula purus sit amet mauris. ",
                rating: 5,
                numOfReviews: 2
            }];
    }
    render() {
        const listProducts = this.products.map((product) => {
            return <Product key={product.productName} data={product} />
        })

        return (
            <div>
                {listProducts.length > 0 ? (
                    <ul>{listProducts}</ul>
                ) : (
                    <ul>No Products to Display</ul>
                )}
            </div>
        )
    }

}


export default Products; //makes it available for other files to import it.