const backendDomin = "http://localhost:5000"

const SummaryApi = {
    signUp:{
        url: `${ backendDomin}/api/signup`,
        method:"post"
    },
    signIn :{
        url: `${ backendDomin}/api/signin`,

    }
}

export default SummaryApi