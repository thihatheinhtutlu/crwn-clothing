import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {    
    const [formFields, setFormFields ] = useState(defaultFormFields);
    const {  email, password } = formFields;


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword (email, password);
            
            resetFormFields();

        } catch(error) {
            switch(error.code) {
                case 'auth/invalid-login-credentials':
                    alert('incorrect password')
                    break;
                case 'auth/invalid-login-credentials':
                    alert('no user with this email')
                    break;
                default:
                    console.log(error);
                
            }
            // if (error.code == "auth/invalid-login-credentials") {
            //     alert('Incorrect password')
            // }
            console.log(error);
        }
    };


    const handleChange = (event) => {
        const { name,value } = event.target;

        setFormFields({ ...formFields, [name]: value });

    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                label="Email"
                type="email" 
                required 
                onChange={handleChange} 
                name="email" 
                value={email} 
                />

                
                <FormInput
                label="Password"
                type="password" 
                required 
                onChange={handleChange} 
                name="password" 
                value={password}
                />

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google}onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;