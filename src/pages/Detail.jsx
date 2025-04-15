import { useParams } from "react-router-dom";
import styled from 'styled-components';

function Detail(props) {
  let {id} = useParams();
  let found = props.shoes.find((x) => x.id == id);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src={"https://codingapple1.github.io/shop/shoes" + (found.id + 1) + ".jpg"}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{found.title}</h4>
          <p>{found.content}</p>
          <p>{found.price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;