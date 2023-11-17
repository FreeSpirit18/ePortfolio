
import Form from "../components/LogIn/Form";
import '../styles/Login.css'

function Login(){
    const api = process.env.REACT_APP_API;

    return(
        <>
            <Form/>
            <style>{`
                body {
                    background: linear-gradient(to right, #DE1919 50%, #1C1C1C 50%);;
                }
            `}</style>

        </>
    )
}
export default Login