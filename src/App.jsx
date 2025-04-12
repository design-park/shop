import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

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
          <div className="col-6 col-md-4">.col-6 .col-md-4</div>
          <div className="col-6 col-md-4">.col-6 .col-md-4</div>
          <div className="col-6 col-md-4">.col-6 .col-md-4</div>
        </div>

      </div>

    </div>
  );
}

export default App;

