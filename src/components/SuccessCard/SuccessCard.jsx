import "./SuccessCard.css";
export default function SuccessCard({ message=null }){

    return(
        <div className="success-card">
                <div className="checkmark-circle">
                <i className="checkmark">✓</i>
                </div>
                <h1>Success</h1> 
                {message}
        </div>
    )
}