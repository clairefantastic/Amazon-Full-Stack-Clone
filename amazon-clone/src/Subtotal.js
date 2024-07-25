import React from "react";
import "./Subtotal.css";
import CurrentFormat from "react-currency-format";

function Subtotal() {
  return (
    <div className="subtotal">
      <CurrentFormat 
        renderText={(value) => (
            <>
              <p>
                {/* Homework */}
                Subtotal (0 items): <strong>0</strong>
              </p>
              <small className="subtotal__gift">
                <input type="checkbox" />
                This order contains a gift
              </small>
            </>
        )}
        decimalScale={2}
        value={0} // Homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal
