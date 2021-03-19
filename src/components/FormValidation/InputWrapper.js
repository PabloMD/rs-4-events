
const InputWrapper = ({children, errors}) => {
    return (
        <div className={ errors ? 'withErrors' : null}>
            {children}

            { errors && (
                <div className="errors">
                    <p>{errors}</p>
                </div>
            )}
        </div>
    );
};

export default InputWrapper;