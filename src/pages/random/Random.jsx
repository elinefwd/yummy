
import fetchData from "../../components/randomRequest/RandomRequest.jsx";

function Random () {


return(
<>
    <button onClick={fetchData}> click me for a random recipe </button>
<p>

            hier hebben we een random optie die ook zonder inloggen of registreren te zien is
        </p>
</>

)

}




    export default Random;
