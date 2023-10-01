import React, { Component } from 'react'; //imports the Component class from ‘react’ library which we use to extend
class Products extends Component { //imports the component class from react library
    render() {
        const products = ["Learning React", "Pro React", "Beginning React"];
        const listProducts = products.map((product) => //loops through each element in the array and lists the elements with a bullet point. //key is needed fro all lists in react
            <li key={product.toString()}>{product}</li>
        );
        return (
            <div>
                <ul>{listProducts}</ul>
            </div>
        );
    }
}

export default Products; //makes it available for other files to import it.