import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, changeAmount, removeProduct } from "./../store.jsx";

function Cart() {
  let cart = useSelector((state) => state.cart.array);
  let dispatch = useDispatch();
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>수량 변경하기</th>
            <th>삭제 하기</th>
          </tr>
        </thead>
        {cart.map(function (a) {
          return (
            <tbody key={a.id}>
              <tr>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.count}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      dispatch(changeName())
                      dispatch(changeAmount(a.id))
                    }}
                  >
                    +
                  </button>
                </td>
                <td>
                  <button
                  className="btn btn-danger"
                  onClick={() => {
                    dispatch(removeProduct(a.id))
                  }}>
                    삭제
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
}

export default Cart;
