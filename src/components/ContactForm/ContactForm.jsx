import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Component } from 'react';
import { Input } from 'components/Filter/Filter';
import styled from 'styled-components';
// import { AddContactSchema } from 'components/Validation/Validation';

// const phoneRegExp =
//   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const AddContactSchema = yup.object({
  name: yup.string()
    .min(2, 'Too Short name!')
    .max(50, 'Too Long name!')
    .required('Required'),
  number: yup.string().min(4).max(10).required(),
});

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
 
  handleSubmit = (values, { resetForm }) => {
    this.props.addContact(this.state);
    this.setState({ name: '', number: '' });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={AddContactSchema}
        onSubmit={this.handleSubmit}
      >
        <Form>
          <LabelStyled htmlFor="name">Name</LabelStyled>
          <Input
            id="name"
            name="name"
            placeholder="Enter name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        
          <LabelStyled htmlFor="number">Phone Number</LabelStyled>
          <Input
            id="number"
            name="number"
            placeholder="Enter phone number"
            value={this.state.number}
            onChange={this.handleChange}
          />
          <ErrorMessage name="number" />

          <AddButton type="submit">Add to contacts</AddButton>
        </Form>
      </Formik>
    );
  }
}

const LabelStyled = styled.label`
  font-size: 25px;
`;
const AddButton = styled.button`
  display: block;
  font-weight: 700;
  width: 100%;
  font-size: 20px;
  cursor: pointer;
`;

const FormError = styled(ErrorMessage)`
  display: block;
`;
