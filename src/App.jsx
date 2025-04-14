import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./App.css";
import data from "./data.jsx";

function App() {
  let [shoes] = useState(data);

  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light" className="custom-nav">
        <Container>
          <Navbar.Brand href="#home">Shoe Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#cart">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="main-bg"></div>

      <div className="container text-center">
        <div className="row">
          {
            shoes.map((a, i)=> {
              return (
                <Card shoes={shoes[i]} i={i+1}></Card>
              )
            } )
          }
        </div>
      </div>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img src= {"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"} width= "80%"/>
      <h5>{props.shoes.title}</h5>
      <p>{props.shoes.price}</p>
    </div>
  )
}



export default App;
