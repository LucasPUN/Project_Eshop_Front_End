type Props = {
  quantity: number,
  handleMinus: () => void,
  handlePlus: () => void
}

export default function QuantitySelector({quantity, handleMinus, handlePlus}: Props) {
  return (
    <>
      <div className="d-flex"
           style={{
             width: "100%"
           }}>
        <button className="btn"
                style={{
                  width: "100%",
                  border: "1px solid black",
                }}
                onClick={handleMinus}
        >
          -
        </button>

        <div className="d-flex justify-content-center align-items-center"
             style={{
               width: "100%",
               border: "1px solid black",
               backgroundColor: "whitesmoke"
             }}>
          {quantity}
        </div>

        <button className="btn "
                style={{
                  width: "100%",
                  border: "1px solid black",
                }}
                onClick={handlePlus}
        >
          +
        </button>
      </div>
    </>
  )
}