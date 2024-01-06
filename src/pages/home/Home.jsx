
import {useState} from "react";
// import "./Home.css"


function

Home() {
    const [count, setCount] = useState(0)

    return( <>
            <div>
                <a>
                    {/*<img src={yummynowlogo} className="logo" alt="logo" />*/}
                </a> <a>
                {/*<img src={yummynowlogo} className="spinlogo" alt="spinninglogo" />*/}
            </a>
            </div>
            <h1>Yummy Now</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    login {count}
                </button>
                <p></p>
                <button onClick={() => setCount((count) => count + 1)}>
                    register {count}
                </button>
            </div>
        </>



    )
}
export default Home