import React, { useState, useEffect, useReducer } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

const CreateDCP = () => {
  const [dcpState, setDCPState] = useState('');
  const [sites, setSites] = useState([]);
  const [userInput, setUserInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
    site: '',
    o: '',
    a: '',
    s1: '',
    s2: '',
    s3: '',
    s4: '',
    s5: '',
    c: '',
    cpid: '',
    ts: ''
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios('https://s3-us-west-1.amazonaws.com/sc.frontend/sites.json');
        setSites(result.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const urlParam = userInput => {
    let params = '';
    for (let [key, value] of Object.entries(userInput)) {
      if (key !== 'site' && value !== '') {
        params += `&${key}=${value}`;
      } else {
        params += '';
      }
    }
    return params;
  };

  const handleInputChange = event => {
    const { name, value } = event.target;

    console.log(name, value);
    
    setUserInput({ [name]: value });
    setDCPState(`https://${userInput.site}/?${urlParam(userInput)}`);
    console.log(userInput.site);
  };

  const save = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(dcpState);
    } else {
      alert('Sorry!! Click to Copy to Clipboard is not available for your browser. Please manually copy your number');
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3 className="header">CakeKiller's DCP Link Creator</h3>
          <p>Clicking "Generate New DCP Link" stores the link in your clipboard for easy pasting to other applications</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                <FormGroup>
                  <Label>Select Site:</Label>
                  <Input type="select" name="site" onChange={handleInputChange} defaultValue={''}>
                    <option value="" disabled>
                      Please select a site...
                    </option>
                    {sites.map(site => (
                      <option key={site} value={site}>
                        {site}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label>Offer ID:</Label>
                  <Input type="text" name="o" value={userInput.o} onChange={handleInputChange} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Affiliate ID:</Label>
                  <Input type="text" name="a" value={userInput.a} onChange={handleInputChange} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>
                    Campaign ID:
                    <Input type="text" name="cpid" value={userInput.cpid} onChange={handleInputChange} />
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>
                    Creative ID:
                    <Input type="text" name="c" value={userInput.c} onChange={handleInputChange} />
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>
                    Traffic Source:
                    <Input type="text" name="ts" value={userInput.ts} onChange={handleInputChange} />
                  </Label>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label>
                    S1:
                    <Input type="text" name="s1" value={userInput.s1} onChange={handleInputChange} />
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>
                    S2:
                    <Input type="text" name="s2" value={userInput.s2} onChange={handleInputChange} />
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>
                    S3:
                    <Input type="text" name="s3" value={userInput.s3} onChange={handleInputChange} />
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>
                    S4:
                    <Input type="text" name="s4" value={userInput.s4} onChange={handleInputChange} />
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>
                    S5:
                    <Input type="text" name="s5" value={userInput.s5} onChange={handleInputChange} />
                  </Label>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Label>Your Link:</Label>
          <div className="link-container">{dcpState}</div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={save}>Copy to Clipboard</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateDCP;
