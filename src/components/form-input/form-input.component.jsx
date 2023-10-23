import { 
    FormInputLabel, 
    Input, 
    Group 
} from "./form-input.styles";

const FormInput = ({ label, value ="" , ...otherProps }) => {
    return (
        <Group>
            <Input {...otherProps} />
            
            {label && (
                <FormInputLabel shrink={value.length} > 
                    {label} 
                 </FormInputLabel>
            )}
               
        </Group>
    )
};

export default FormInput;