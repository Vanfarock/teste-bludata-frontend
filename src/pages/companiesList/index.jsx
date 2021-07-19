import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { getCompanies } from '../../services/companyService';

const CompaniesList = () => {
  const [companies, setCompanies] = useState([]);
  const history = useHistory();
  const cancelToken = axios.CancelToken.source();

  useEffect(() => {
    getCompanies(cancelToken.token)
      .then(({ data }) => {
        setCompanies(data);
      });

    return () => cancelToken.cancel();
  }, []);

  return (
    <Container>
      <Row className="align-items-center mb-3">
        <Col sm={10}>
          <h1>Empresas</h1>
        </Col>
        <Col sm>
          <Button onClick={() => history.push('empresas/novo')}>Novo</Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>UF</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((c) => (
            <tr
              key={c._id}
              role="button"
              onClick={() => history.push(`empresas/${c._id}`)}
            >
              <td>{c.name}</td>
              <td>{c.cnpj}</td>
              <td>{c.state}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

CompaniesList.propTypes = {};

export default CompaniesList;
