import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { saveCompany, getCompany } from '../../services/companyService';
import getAllStates from '../../util/states';

const CompanyForm = () => {
  const { id } = useParams();
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    state: Yup.string()
      .label('State')
      .matches(/[A-Z]{2}/)
      .required(),
    name: Yup.string()
      .label('Nome')
      .max(100, 'O nome da empresa deve ter menos que 100 caracteres')
      .required(),
    cnpj: Yup.string()
      .label('CNPJ')
      .min(14, 'O CNPJ deve possuir exatamente 14 dígitos')
      .max(14, 'O CNPJ deve possuir exatamente 14 dígitos')
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      state: '',
      name: '',
      cnpj: '',
    },
    validationSchema,
    onSubmit: (e) => {
      saveCompany(e)
        .then(() => history.push('/'));
    },
  });

  useEffect(() => {
    if (id === 'novo') return;

    getCompany(id)
      .then(({ data }) => {
        if (data) formik.setValues(data);
      });
  }, []);

  const {
    errors, values, handleChange, handleSubmit,
  } = formik;

  const states = getAllStates();
  return (
    <Container>
      <h1 className="mb-3 ">Empresa</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Estado</Form.Label>
          <Form.Control
            as="select"
            type="text"
            name="state"
            value={values.state}
            onChange={handleChange}
          >
            <option>Selecione uma UF</option>
            {Object.keys(states).map((s) => (
              <option key={s} value={s}>{states[s]}</option>))}
          </Form.Control>
          {errors.state && <Form.Text className="text-danger">{errors.state}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome da empresa"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>CNPJ</Form.Label>
          <Form.Control
            type="text"
            placeholder="xx.xxx.xxx/xxxx-xx"
            name="cnpj"
            value={values.cnpj}
            onChange={handleChange}
          />
          {errors.cnpj && <Form.Text className="text-danger">{errors.cnpj}</Form.Text>}
        </Form.Group>
        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </Form>
    </Container>
  );
};

CompanyForm.propTypes = {};

export default CompanyForm;
