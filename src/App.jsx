import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./App.css";
import data from "./data.jsx";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import Detail from "./pages/Detail.jsx";

function App() {
  let [shoes] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light" className="custom-nav">
        <Container>
          <Navbar.Brand href="#home">Shoe Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/detail")}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <Cards shoes={shoes} />
            </>
          }
        />
        <Route path="/detail" element={<Detail />} />
        <Route path="/event" element={<Event />}>
          <Route
            path="one"
            element={<h6>첫 주문시 양배추즘 서비스</h6>}
          ></Route>
          <Route path="two" element={<p>생일기념 쿠폰받기</p>}></Route>
        </Route>
        <Route path="*" element={<p>없는 페이지임</p>} />
      </Routes>
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        width="80%"
      />
      <h5>{props.shoes.title}</h5>
      <p>{props.shoes.price}</p>
    </div>
  );
}

function Cards(props) {
  return (
    <div className="container text-center">
      <div className="row">
        {props.shoes.map((s, i) => {
          return <Card shoes={s} i={i}></Card>;
        })}
      </div>
    </div>
  );
}

export default App;
