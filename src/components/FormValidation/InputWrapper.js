
const InputWrapper = ({children, errors}) => {
    const errorPresent = () => errors !== undefined && errors.length;
    const showErrors = () => (errorPresent() ? <div className="errors"><p>{errors}</p></div>: null);

    return(
        <div className={errorPresent() ? 'withErrors' : null}>
            {children}

            {showErrors()}
        </div>
    );
};

export default InputWrapper;