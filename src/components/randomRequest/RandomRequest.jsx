import axios from "axios";
// import {useState} from "react";







                        async function fetchData() {

                            // const [info, setInfo] = useState([]);

                            try {
                                const response = await axios.get(
                                    'https://api.edamam.com/api/recipes/v2?type=public&app_id=236b3497&app_key=117ade035cd558821cf71f334a2e0af9&random=true'
                                );
                                console.log(response.data);
                                // setInfo(response.data);
                            } catch (e) {
                                console.error(e);
                            }


                           }


                            export default fetchData;



