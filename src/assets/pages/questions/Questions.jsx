
import "./Questions.css";

function Questions () {
    return (
        <>

            <p> Questions for your Yummy dish: </p>
            <p></p>
            <a> Is there a special diet? </a>
            <label>
                <input type="radio" name="diet" value="vegan"/>
                Vegan
            </label>
            <label>
                <input type="radio" name="diet" value="vegetarian"/>
                Vegetarian
            </label>
            <label>
                <input type="radio" name="diet" value="anything"/>
                Anything
            </label>
<p></p>
            <a> What temperature should the dish be?</a>
            <label>
                <input type="radio" name="temperature" value="hot"/>
                Hot
            </label> <label>
            <input type="radio" name="temperature" value="cold"/>
            Cold
        </label> <label>
            <input type="radio" name="temperature" value="anything"/>
            Anything
        </label>
<p></p>
            <a> Do you feel like putting some effort in the dish? </a>
            <label>
                <input type="radio" name="enthousiasm" value="yes"/>
                Yes
            </label> <label>
            <input type="radio" name="enthousiasm" value="no"/>
            No
        </label> <label>
            <input type="radio" name="enthousiasm" value="maybe"/>
            Maybe
        </label>
<p></p>
            <a> Are there kids joining the table? </a>
            <label>
                <input type="radio" name="enthousiasm" value="yes"/>
                Yes
            </label> <label>
            <input type="radio" name="enthousiasm" value="no"/>
            No
        </label> <label>
            <input type="radio" name="enthousiasm" value="maybe"/>
            Maybe
        </label>
            <p> </p>
<button>Let's go!</button>
</>
    )
}
export default Questions
