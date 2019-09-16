import React, { useState, useEffect, useReducer } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

const CreateDCP = () => {
  //prettier-ignore
  const initialState = {site: '', o: '', a: '', s1: '', s2: '', s3: '', s4: '', s5: '', c: '', cpid: '', ts: ''};
  const [copied, setCopied] = useState(false);
  const [sites, setSites] = useState([]); // stores sites from axios call
  const [dcpState, setDCPState] = useState(''); // stores full clipboard URL
  const formReducer = (state, action) => ({ ...state, ...action });
  const [state, dispatch] = useReducer(formReducer, initialState); // stores the url params

  const urlParam = state => {
    let params = '';
    for (let [key, value] of Object.entries(state)) {
      if (key === 'site' && value !== '') {
        params += `https://${value}/?`;
      } else if (key !== 'site' && value !== '') {
        params += `&${key}=${value}`;
      } else {
        params += '';
      }
    }
    return params;
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    dispatch({ [name]: value });
  };

  const save = () => {
    if (navigator.clipboard) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
      navigator.clipboard.writeText(dcpState.replace('?&', '?'));
    } else {
      alert('Sorry!! Click to Copy to Clipboard is not available for your browser. Please manually copy your number');
    }
  };

  const restart = () => {
    document.getElementById('form').reset();
    dispatch(initialState);
    setDCPState('');
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios('https://s3-us-west-1.amazonaws.com/sc.frontend/sites.json');

        // set sites data
        setSites(result.data);

        // update url state
        setDCPState(urlParam(state));
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [state]);

  return (
    <Container>
      <Row>
        <Col>
          <h3 className="header">CakeKiller's DCP Link Creator</h3>
          <p>Clicking "Copy to Clipboard" stores the link in your clipboard for easy pasting.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form id="form">
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
              <Col lg={{ size: 2, offset: 1 }} xs="12">
                <FormGroup>
                  <Label>
                    Offer ID:
                    <Input type="text" name="o" value={state.o} onChange={handleInputChange} />
                  </Label>
                </FormGroup>
              </Col>
              <Col lg="2" xs="12">
                <FormGroup>
                  <Label>
                    Affiliate ID:
                    <Input type="text" name="a" value={state.a} onChange={handleInputChange} />
                  </Label>
                </FormGroup>
              </Col>
              <Col lg="2" xs="12">
                <FormGroup>
                  <Label>
                    Campaign ID:
                    <Input type="text" name="cpid" value={state.cpid} onChange={handleInputChange} />
                  </Label>
                </FormGroup>
              </Col>
              <Col lg="2" xs="12">
                <FormGroup>
                  <Label>
                    Creative ID:
                    <Input type="text" name="c" value={state.c} onChange={handleInputChange} />
                  </Label>
                </FormGroup>
              </Col>
              <Col lg="2" xs="12">
                <FormGroup>
                  <Label>
                    Traffic Source:
                    <Input type="text" name="ts" value={state.ts} onChange={handleInputChange} />
                  </Label>
                </FormGroup>
              </Col>
            </Row>
            <Row>
            <Col lg={{ size: 2, offset: 1 }} xs="12">
                <FormGroup>
                  <Label>
                    S1:
                    <Input type="text" name="s1" value={state.s1} onChange={handleInputChange} />
                  </Label>
                </FormGroup>
              </Col>
              <Col lg="2" xs="12">
                <FormGroup>
                  <Label>
                    S2:
                    <Input type="text" name="s2" value={state.s2} onChange={handleInputChange} />
                  </Label>
                </FormGroup>
              </Col>
              <Col lg="2" xs="12">
                <FormGroup>
                  <Label>
                    S3:
                    <Input type="text" name="s3" value={state.s3} onChange={handleInputChange} />
                  </Label>
                </FormGroup>
              </Col>
              <Col lg="2" xs="12">
                <FormGroup>
                  <Label>
                    S4:
                    <Input type="text" name="s4" value={state.s4} onChange={handleInputChange} />
                  </Label>
                </FormGroup>
              </Col>
              <Col lg="2" xs="12">
                <FormGroup>
                  <Label>
                    S5:
                    <Input type="text" name="s5" value={state.s5} onChange={handleInputChange} />
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
          <div className="link-container">{dcpState.replace('?&', '?')}</div>
        </Col>
      </Row>
      <Row>
        <Col lg="6" xs="12">
          <Button color="success" onClick={save}>
            Copy to Clipboard
          </Button>
          <p className={`${copied ? 'copied-shown' : 'copied-hidden'}`}>Url Copied!</p>
        </Col>
        <Col lg="6" xs="12">
          <Button color="secondary" onClick={restart}>
            Restart
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateDCP;
