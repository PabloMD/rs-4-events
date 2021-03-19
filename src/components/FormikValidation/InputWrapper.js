import { ErrorMessage } from 'formik';

const InputWrapper = ({ children, errors, name }) => {
    return (
        <div className={errors[name] ? 'withErrors' : null}>
            {children}

            {errors[name] && (
                <ErrorMessage name={name}>
                    {(msg) => (
                        <div className="errors">
                            <p>{msg}</p>
                        </div>
                    )}
                </ErrorMessage>
            )}
        </div>
    );
};

export default InputWrapper;
