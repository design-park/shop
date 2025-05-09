import { useState, useEffect, lazy, Suspense } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./App.css";
import data from "./data.jsx";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import useUsername from "./hooks/useUsername.jsx";

const Detail = lazy(() => import("./pages/Detail.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));

function App() {
  let [shoes, setShoes] = useState(data);
  let [clickCount, setClickCount] = useState(0);
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let userName = useUsername();

  useEffect(() => {
    if (localStorage.getItem("watched") === null) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
  }, []);

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
              <p>{userName}</p>
              <div className="main-bg"></div>
              <div className="sticky-overlay">
                <p>최근 본 항목</p>
                <WatchedCard />
              </div>
              <Cards
                shoes={shoes}
                isLoading={isLoading}
                clickCount={clickCount}
              />
              <button
                className="btn btn-danger"
                onClick={() => {
                  setClickCount((prev) => prev + 1);
                  if (clickCount < 3) {
                    setIsLoading(true); //로딩 시작
                    axios
                      .get(
                        "https://codingapple1.github.io/shop/data" +
                          (clickCount + 2) +
                          ".json"
                      )
                      .then((result) => {
                        let copy = [...shoes, ...result.data];
                        setShoes(copy);
                        setIsLoading(false); // 로딩 끝
                      })
                      .catch(() => {
                        console.log("실패함 ㅅㄱ");
                        setIsLoading(false); //실패해도 로딩 끝
                      });
                  }
                }}
              >
                더보기
              </button>
            </>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <Suspense fallback={<div>로딩 중임</div>}>
              <Detail shoes={shoes} />
            </Suspense>
          }
        />
        <Route path="/cart" element={<Cart />} />
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
  let navigate = useNavigate();
  return (
    <div className="col-md-4" onClick={() => navigate("/detail/" + props.i)}>
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
          return <Card key={i} shoes={s} i={i}></Card>;
        })}
      </div>
      {props.isLoading && <p>로딩 중...</p>}
      {props.clickCount >= 3 && (
        <div className="alert alert-warning">더 이상 상품이 없습니다.</div>
      )}
    </div>
  );
}

function WatchedCard() {
  const watched = JSON.parse(localStorage.getItem("watched")) || [];
  const lastTwo = watched.slice(-2).reverse(); // grab the last two IDs, then newest-first

  if (lastTwo.length === 0) return null;

  return (
    <div>
      {lastTwo.map((id) => (
        <img
          key={id}
          src={`https://codingapple1.github.io/shop/shoes${id + 1}.jpg`}
          width="80%"
        />
      ))}
    </div>
  );
}

export default App;
