import './form-input.styles.scss';

const FormInput = ({ label, value ="" , ...otherProps }) => {
    return (
        <div className="group">
            <input className="form-input" {...otherProps} />
            
            {label && (
                <label className={`${ value.length ? 'shrink' : ''} form-input-label`} > {label} </label>
            )}
               
        </div>
    )
};

export default FormInput;