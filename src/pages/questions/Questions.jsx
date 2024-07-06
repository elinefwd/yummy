
import RecipeSearchAndDisplay from '../../components/QuestionsRequests/QuestionsRequests.jsx';
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const QuestionsPage = () => {
    return (
        <>
            <Header title="Questions" />
            <main>
                <p>Answer questions below to find something you feel like eating!</p>
        <div>
            <RecipeSearchAndDisplay />
        </div>
        </main>

            <Footer content="© 2024 Yummy Now" useCodeWrapper={true} />
</>
    );
}

export default QuestionsPage;
