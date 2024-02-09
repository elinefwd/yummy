import Questions from "../questions/Questions.jsx";
import fetchRecipes from "../../components/questionsRequests/QuestionsRequests.jsx";
function Welcome () {
    return (
        <>
           <code> after login </code>
            <p>
                Welcome Name! (name adjustable)
            </p>
            <a>
                results questions:     <Questions onSearch={fetchRecipes} />

                Recently Served:
                name, recepi and ratings if rated from the last 5 dishes

            </a>
        </>
    )
}
        export default Welcome;