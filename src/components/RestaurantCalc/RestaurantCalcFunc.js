import React, { useRef, useState } from 'react';
import Section from '../Layout';

const tipOptions = [5,10,15,20];
const vatRate = 0.23;

function useInputHook(initialValue = ''){
    const [state, setState] = useState(initialValue);

    const handleChange = (e) => {
        setState(parseFloat(e.target.value));
    };

    return [state, handleChange];
};

function RestaurantCalcFunc(){
    const [amountToPay, setAmountToPay] = useState();
    const [amount, handleAmountChange] = useInputHook(undefined);
    const [tip, handleTipChange] = useInputHook(tipOptions[0]);

    const amountInput = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setAmountToPay(
            ((amount * ((100.0 + tip )/100) ) * (vatRate + 1)).toFixed(2)
        );
    };

    const handleReset = (e) => {
        setAmountToPay(undefined);
    };
        return(
            <Section title="Restaurant Calculator Function">
                { amountToPay ?
                    <div>
                        <p><strong>{amountToPay} Gross</strong></p>
                        <button onClick={handleReset} type="reset">Reset</button>
                    </div>
                :
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <input ref={amountInput} name="amount" type="number" placeholder="Net amount" onChange={handleAmountChange} step="any" />
                    </div>
                    <div>
                        <select name="tip" value={tip}  onChange={handleTipChange}>
                            { tipOptions.map((percent, i) =>
                                <option key={i} value={percent}>{percent}%</option>
                            )}
                        </select>
                    </div>
                    <button type="submit">Convert</button>
                </form>
                }
            </Section>
        );
}

export default RestaurantCalcFunc;