import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Input } from 'components/Filter/Filter';
import styled from 'styled-components';

// import { AddContactSchema } from 'components/Validation/Validation';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const AddContactSchema = yup.object().shape({
  name: yup.string()
    .min(2, "Too Short name!")
    .max(50, "Too Long name!")
    .required("Name is required to fulfill"),
  number: yup.string().min(4).max(10).matches(phoneRegExp).required("Phone number is required"),
});
const itinialValues = {
  name: '',
  number: '',
}
export const ContactForm = ({addContact}) => {
  
  const handleSubmit = (values, { resetForm }) => {
    addContact(values);
    resetForm();
  };
  return (
      <Formik
        initialValues={itinialValues}
        validationSchema={AddContactSchema}
        onSubmit={handleSubmit}
      >
        
        <Form>
          <LabelStyled htmlFor="name">Name</LabelStyled>
          <Input
            id="name"
            name="name"
            placeholder="Enter name"
            
          />
          <ErrorMessage name="name" component="div" className="error" />
        
          <LabelStyled htmlFor="number">Phone Number</LabelStyled>
          <Input
            id="number"
            name="number"
            placeholder="Enter phone number"

          />
          <ErrorMessage name="number" component="div"/>

          <AddButton type="submit">Add to contacts</AddButton>
        </Form>
      </Formik>
    );
}

// 
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

// const FormError = styled(ErrorMessage)`
//   display: block;
// `;
