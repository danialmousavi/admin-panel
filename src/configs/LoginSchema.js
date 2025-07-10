import * as Yup from 'yup';
const LoginSchema=Yup.object({
    phone:Yup.number().required('شماره تماس الزامی است'),
    password:Yup.string().min(6,'رمزعبور باید حداقل 6 کاراکتر باشد').required('رمزعبور الزامی است')
})
// .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, 'رمزعبور باید شامل حروف بزرگ، کوچک و اعداد باشد')
export default LoginSchema;
// This schema validates that the email is in a valid format and is required, and that the password is at least 6 characters long, contains at least one uppercase letter, one lowercase letter, and one number, and is also required. The error messages are in Persian to match the context of the login form.