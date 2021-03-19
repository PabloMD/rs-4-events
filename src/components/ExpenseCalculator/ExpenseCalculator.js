import { useState, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';
import './ExpenseCalculator.scss';

import { InputWrapper } from '../FormikValidation';
import { Formik, Form, Field } from 'formik';

import Section from '../Layout';
import { ExpensesList } from '.';

const entryTypes = ['Expense', 'Income'];
const expenseCategories = ['Grocery', 'Sport', 'Travel', 'Whisky', 'Salary'];
const initialIncomes = [
    {
        id: uuidv4(),
        name: 'Base salary',
        category: 'Salary',
        amount: 9999,
    },
];

const initialExpenses = [
    {
        id: uuidv4(),
        name: 'Saturday shopping',
        category: 'Grocery',
        amount: 300,
    },
    {
        id: uuidv4(),
        name: 'Saturday whisky',
        category: 'Whisky',
        amount: 150,
    },
    {
        id: uuidv4(),
        name: 'Subway ticket',
        category: 'Travel',
        amount: 15,
    },
];

const useRemovableList = (initialValue = []) => {
    const [list, setList] = useState(initialValue);

    const removeItem = (toRemove) => {
        setList(list.filter((item) => item.id !== toRemove.id));
    };

    const addItem = ({ name, amount, category }) => {
        setList([
            {
                id: uuidv4(),
                name: name,
                amount: parseFloat(amount, 10),
                category: category,
            },
            ...list,
        ]);
    };

    return [list, addItem, removeItem];
};

const ExpenseCalculator = () => {
    const [expenses, addExpense, removeExpense] = useRemovableList(
        localStorage.getItem('myExpenses')
            ? JSON.parse(localStorage.getItem('myExpenses'))
            : initialExpenses
    );
    const [incomes, addIncome, removeIncome] = useRemovableList(
        localStorage.getItem('myIncomes')
            ? JSON.parse(localStorage.getItem('myIncomes'))
            : initialIncomes
    );

    const getTotal = (incomesArray, expensesArray) => (
        incomesArray.reduce((sum, item) => (sum += item.amount), 0) -
        expensesArray.reduce((sum, item) => (sum += item.amount), 0)
        );

    const [balance, setBalance] = useState(getTotal(incomes,expenses));

    useEffect(() => {
        setBalance(getTotal(incomes, expenses));
        localStorage.setItem('myExpenses', JSON.stringify(expenses));
        localStorage.setItem('myIncomes', JSON.stringify(incomes));
    }, [expenses, incomes]);

    return (
        <Section title="4. Expense Calculator" className="expCalc">
            <div className={`balance${balance <= 0 ? ' bankrupt' : ''} `}>
                Balance: <span>{balance} PLN</span>
            </div>
            <div className="wrapper">
                <Formik
                    initialValues={{
                        entry_type: 'Expense',
                        name: '',
                        amount: 0,
                        category: expenseCategories[0],
                    }}
                    validate={(values) => {
                        const errors = {};
                        console.log('validating');
                        if (!entryTypes.includes(values.entry_type)) {
                            errors.entry_type = 'Required';
                        }
                        if (!values.name) {
                            errors.name = 'Required';
                        }
                        if (parseFloat(values.amount) <= 0) {
                            errors.amount = 'Need to be greater than 0!';
                        }
                        if (!expenseCategories.includes(values.category)) {
                            errors.category = 'Required';
                        }

                        return errors;
                    }}
                    onSubmit={(values, { resetForm }) => {
                        console.log('submitted');
                        if (values.entry_type === 'Income') {
                            addIncome(values);
                            setBalance(balance + parseFloat(values.amount, 10));
                        } else {
                            addExpense(values);
                            setBalance(balance - parseFloat(values.amount, 10));
                        }

                        resetForm();
                    }}
                >
                    {({ errors }) => (
                        <Form>
                            <InputWrapper {...{ name: 'entry_type', errors }}>
                                <span id="entry_type-label-group">
                                    Entry type:
                                </span>
                                <div aria-labelledby="entry_type-label-group">
                                    {entryTypes.map((item) => (
                                        <label key={item}>
                                            <Field
                                                name="entry_type"
                                                type="radio"
                                                value={item}
                                            />
                                            {item}
                                        </label>
                                    ))}
                                </div>
                            </InputWrapper>
                            <InputWrapper {...{ name: 'name', errors }}>
                                <Field
                                    placeholder="Name"
                                    type="text"
                                    name="name"
                                />
                            </InputWrapper>
                            <InputWrapper {...{ name: 'amount', errors }}>
                                <Field
                                    placeholder="Amount"
                                    type="number"
                                    name="amount"
                                />
                            </InputWrapper>
                            <InputWrapper {...{ name: 'category', errors }}>
                                <Field
                                    name="category"
                                    as="select"
                                    className="my-select"
                                >
                                    {expenseCategories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </Field>
                            </InputWrapper>
                            <button type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>
                <div className="lists">
                    <Section title="Expenses">
                        <ExpensesList
                            items={expenses}
                            removeItem={removeExpense}
                        />
                    </Section>
                    <Section title="Incomes">
                        <ExpensesList
                            items={incomes}
                            removeItem={removeIncome}
                        />
                    </Section>
                </div>
            </div>
        </Section>
    );
};

export default ExpenseCalculator;
