/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import * as Yup from 'yup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory, useParams } from 'react-router-dom';
import { getCompanies } from '../../services/companyService';
import { saveProvider, getProvider } from '../../services/providerService';
import personType from '../../enums/personType';
import { formatDate } from '../../util/dates';

const ProviderForm = () => {
  const [companies, setCompanies] = useState([]);
  const history = useHistory();
  const { id } = useParams();

  const validationSchema = Yup.object().shape({
    company: Yup.string()
      .label('Empresa')
      .required(),
    name: Yup.string()
      .label('Nome')
      .max(100, 'O nome da empresa deve ter menos que 100 caracteres')
      .required(),
    birthday: Yup.string().nullable(),
    rg: Yup.string(),
    personType: Yup.string()
      .label('Tipo')
      .required(),
    identification: Yup.string()
      .label('CPF/CNPJ')
      .required(),
    phones: Yup.array().of(Yup.string()).required(),
  });

  const formik = useFormik({
    initialValues: {
      company: '',
      name: '',
      birthday: '',
      rg: '',
      personType: '',
      identification: '',
      phones: [''],
    },
    validationSchema,
    onSubmit: (values) => {
      saveProvider(values)
        .then(() => history.push('/'));
    },
  });

  useEffect(() => {
    getCompanies()
      .then(({ data }) => setCompanies(data));

    if (id === 'novo') return;

    getProvider(id)
      .then(({ data }) => formik.setValues(data));
  }, []);

  const {
    errors, values, handleChange, handleSubmit,
  } = formik;

  return (
    <Container>
      <h1 className="mb-3">Fornecedor</h1>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome do fornecedor"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              as="select"
              type="text"
              name="personType"
              value={values.personType}
              onChange={handleChange}
            >
              <option value="" disabled>Selecione um tipo de pessoa</option>
              {Object.keys(personType).map(
                (p) => <option key={p} value={p}>{personType[p]}</option>,
              )}
            </Form.Control>
            {errors.personType
              && <Form.Text className="text-danger">{errors.personType}</Form.Text>}
          </Form.Group>

          {personType[values.personType] === personType.individual && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Data de nascimento</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Digite sua data de nascimento"
                  name="birthday"
                  value={formatDate(values.birthday)}
                  onChange={handleChange}
                />
                {errors.birthday
                  && <Form.Text className="text-danger">{errors.birthday}</Form.Text>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>RG</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite seu RG"
                  name="rg"
                  value={values.rg}
                  onChange={handleChange}
                />
                {errors.rg
                  && <Form.Text className="text-danger">{errors.rg}</Form.Text>}
              </Form.Group>
            </>
          )}

          <Form.Group className="mb-3">
            <Form.Label>CPF/CNPJ</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu CPF/CNPJ"
              name="identification"
              value={values.identification}
              onChange={handleChange}
            />
            {errors.identification
              && <Form.Text className="text-danger">{errors.identification}</Form.Text>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Empresa</Form.Label>
            <Form.Control
              as="select"
              type="text"
              name="company"
              value={values.company}
              onChange={handleChange}
            >
              <option value="" disabled>Selecione uma empresa</option>
              {companies.map(
                (c) => <option key={c._id} value={c._id}>{c.name}</option>,
              )}
            </Form.Control>
            {errors.company
              && <Form.Text className="text-danger">{errors.company}</Form.Text>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Telefones</Form.Label>
            <FieldArray
              validateOnChange={false}
              name="phones"
              render={({ remove, push }) => (
                <>
                  {values.phones.map((phone, index) => (
                    <Row key={index} className="mb-1">
                      <Col sm={11}>
                        <Form.Control
                          type="tel"
                          placeholder="Digite seu telefone"
                          name={`phones.${index}`}
                          value={phone}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col sm={1}>
                        <Button onClick={() => remove(index)}>-</Button>
                      </Col>
                    </Row>

                  ))}
                  <Button onClick={() => push('')}>Adicionar novo telefone</Button>
                </>
              )}
            />

            {errors.phones
              && <Form.Text className="text-danger">{errors.phones}</Form.Text>}
          </Form.Group>

          <Button variant="primary" type="submit">Salvar</Button>
        </Form>
      </FormikProvider>
    </Container>
  );
};

ProviderForm.propTypes = {};

export default ProviderForm;
