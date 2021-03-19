import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import InputWrapper from './InputWrapper';
import Section from '../Layout';

const defaultProps = {
    name: '',
    email: '',
    bio: '',
    gender: '',
    regulations: false,
};

const genderOptions = [
    {
        id: 1,
        value: 'Female',
    },
    {
        id: 2,
        value: 'Male',
    },
];

// using same CSS as FormValidation.js which is already included

function FormikValidation() {
  const [submitted, setSubmitted] = useState(false);
    return (
        <Section title="Form validation with Formik">
            <Formik
                initialValues={defaultProps}
                validate={(values) => {
                    setSubmitted(false);
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            values.email
                        )
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.name) {
                        errors.name = 'Required';
                    }
                    if (!values.bio) {
                        errors.bio = 'Required';
                    }
                    if (!values.gender) {
                        errors.gender = 'Required';
                    }

                    if (!values.regulations) {
                        errors.regulations = 'Required';
                    }

                    return errors;
                }}
                onSubmit={(values, { resetForm }) => {
                    setSubmitted(true);
                    resetForm();
                }}
            >
                {({ errors }) => (
                    <Form>
                        {submitted ? <h2>Thanks for sending!</h2> : null}
                        <InputWrapper {...{ name: 'name', errors }}>
                            <Field placeholder="Name" type="text" name="name" />
                        </InputWrapper>
                        <InputWrapper {...{ name: 'email', errors }}>
                            <Field
                                placeholder="Email"
                                type="email"
                                name="email"
                            />
                        </InputWrapper>
                        <InputWrapper {...{ name: 'bio', errors }}>
                            <Field placeholder="Bio" as="textarea" name="bio" />
                        </InputWrapper>
                        <InputWrapper {...{ name: 'gender', errors }}>
                            <span id="gender-label-group">Gender:</span>
                            <span aria-labelledby="gender-label-group">
                                {genderOptions.map((item, i) => (
                                    <label key={item.id}>
                                        <Field
                                            name="gender"
                                            type="radio"
                                            value={item.value}
                                        />
                                        {item.value}
                                    </label>
                                ))}
                            </span>
                        </InputWrapper>
                        <InputWrapper {...{ name: 'regulations', errors }}>
                            <label>
                                <Field type="checkbox" name="regulations" /> I
                                Accept the rules
                            </label>
                        </InputWrapper>
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </Section>
    );
}

export default FormikValidation;
