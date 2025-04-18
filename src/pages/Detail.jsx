import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Detail(props) {
  let { id } = useParams();
  let found = props.shoes.find((x) => x.id == id);
  let [showAlert, setShowAlert] = useState(true);
  let [amount, setAmount] = useState(1);
  let [isAmount, setisAmount] = useState(true);

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

  return (
    <div className="container">
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
          {isAmount ? 
            null
           : <div className="alert alert-warning">그러지 마세요</div>}
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
