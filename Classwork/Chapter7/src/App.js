// import React, { Component } from 'react';
// import Products from './Products';
// import { Button } from 'react-bootstrap';
// import Rating from './Rating';
// class App extends Component {

//   render() {

//     const isValid = true;
//     return (
//       <div>
//         <h1>
//           My First React App!
//         </h1>

//         <Products />
//         <Rating rating="1" />
//         <Rating rating="2" />
//         <Rating rating="3" />
//         <Rating rating="4" />
//         <Rating rating="5" />

//         {/* <Button variant="danger">Default</Button> */}
//         <Button variant="primary" disabled={!isValid}>Default</Button>

//       </div>
//     );
//   }
// }


// export default App;

import React, { Component } from 'react';
import Products from './Products';
import JumboTronComponent from './JumboTronComponent';
import UserForm from './UserForm';
import GitHub from './GitHub';

class App extends Component {
  render() {
    return (
      <div>
        <UserForm />
        <GitHub />
        <JumboTronComponent>
          This is a long sentence, and I want to insert content into the
          jumbotron component from the outside.
        </JumboTronComponent>
        <Products />
      </div>
    );
  }
}

export default App;