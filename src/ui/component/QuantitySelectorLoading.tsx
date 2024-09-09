import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



export default function QuantitySelectorLoading() {
    return (
        <>
            <div className="d-flex ">
            <button className="btn btn-outline-info" disabled
                style={{
                width:"40px",
                height:"40px"
            }}
            >
                -
            </button>

            <div className="d-flex justify-content-center align-items-center"
                style={{
                width: "40px",
                height: "40px",
                border: "1px solid black",
                backgroundColor:"whitesmoke"
            }}>
                <FontAwesomeIcon icon={faSpinner} spin/>
            </div>

            <button className="btn btn-outline-info" disabled
                style={{
                width: "40px",
                height: "40px"
            }}
            >
                +
            </button>
            </div>
        </>
    )
}