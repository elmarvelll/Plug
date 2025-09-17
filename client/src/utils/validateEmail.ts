
function validateEmail(email: string) {
    if (email !== '') {
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        return validEmail;
    }
    else {
        return null
}
}
export default validateEmail