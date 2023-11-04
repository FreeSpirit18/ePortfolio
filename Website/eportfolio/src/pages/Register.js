import RegForm from "../components/Register/RegForm";




function Register(){
    const api = process.env.REACT_APP_API;

    return(
        <>
            <RegForm/>
        </>
    )
}
export default Register