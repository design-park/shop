import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addProduct } from "./../store.jsx";
import { NumberInCart } from "../NumberInCart.jsx";

function Detail(props) {
  let dispatch = useDispatch();
  let { id } = useParams();
  let found = props.shoes.find((x) => x.id == id);
  let [showAlert, setShowAlert] = useState(true);
  let [amount, setAmount] = useState(1);
  let [isAmount, setisAmount] = useState(true);
  let [tab, setTab] = useState(0);
  let [fade2, setFade2] = useState('');

  useEffect(() => {
    let a = setTimeout(() => {
      setShowAlert(false);
    }, 2000);

    return () => {
      clearTimeout(a);
    };
  }, []);

  useEffect(() => {
    const parsed = parseInt(amount);
    const valid = !isNaN(parsed) && parsed >= 1 && Number.isInteger(parsed);
    setisAmount(valid);
  }, [amount]);

  useEffect(() => {
    let a = setTimeout(() => {
      setFade2("end");
    }, 100)
    
    return () => {
      clearTimeout(a);
      setFade2('');
    }
  }, [])


  return (
    <div className={`container start ${fade2}`}>
      {showAlert == true ? (
        <div className="alert alert-warning">2초 이내 구매 시 할인</div>
      ) : null}
      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" +
              (found.id + 1) +
              ".jpg"
            }
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{found.title}</h4>
          <p>{found.content}</p>
          <p>{found.price}원</p>
          <p><NumberInCart id={id} /></p>
          <p>
            수량:
            <span>
              <input
                className="ms-2"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </span>
          </p>
          {isAmount ? null : (
            <div className="alert alert-warning">그러지 마세요</div>
          )}
          <button className="btn btn-danger" onClick={()=>{
            dispatch(addProduct(found))
          }}>주문하기</button>
        </div>
      </div>

      <Nav justify variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link onClick={() => setTab(0)} eventKey="link-0">
            탭1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTab(1)} eventKey="link-1">
            탭2
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTab(2)} eventKey="link-2">
            탭3
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </div>
  );
}

function TabContent({ tab }) {
  let [fade, setFade] = useState('');

  useEffect(()=> {
    let a = setTimeout(() => {setFade("end")}, 100)

    return () => {
      clearTimeout(a)
      setFade('')
    }
  }, [tab])

  return (
    <div className={"start " + fade}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
  );
}

export default Detail;
