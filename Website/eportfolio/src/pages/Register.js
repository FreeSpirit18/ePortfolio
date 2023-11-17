import RegForm from "../components/Register/RegForm";




function Register(){
    const api = process.env.REACT_APP_API;

    return(
        <>
            <RegForm/>
            <style>{`
                body {
                    background: linear-gradient(to right, #DE1919 50%, #1C1C1C 50%);;
                }
            `}</style>
        </>
    )
}
export default Register