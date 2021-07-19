import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { getProviders } from '../../services/providerService';

const ProvidersList = () => {
  const [providers, setProviders] = useState([]);
  const history = useHistory();
  const cancelToken = axios.CancelToken.source();

  useEffect(() => {
    getProviders(cancelToken.token)
      .then(({ data }) => setProviders(data));

    return () => cancelToken.cancel();
  }, []);

  return (
    <Container>
      <Row className="align-items-center mb-3">
        <Col sm={10}>
          <h1>Fornecedores</h1>
        </Col>
        <Col sm>
          <Button onClick={() => history.push('fornecedores/novo')}>Novo</Button>
        </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF/CNPJ</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((p) => (
            <tr
              key={p._id}
              role="button"
              onClick={() => history.push(`fornecedores/${p._id}`)}
            >
              <td>{p.name}</td>
              <td>{p.identification}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

ProvidersList.propTypes = {};

export default ProvidersList;
