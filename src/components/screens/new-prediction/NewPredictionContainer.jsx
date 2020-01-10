import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import BackArrow from '../../../../public/assets/ionic-md-arrow-round-back.svg';
import CoinDropdown from './CoinDropdown';
import { getLiveData } from '../../../utils/get-market-data';
import DurationDropdown from './DurationDropdown';

const { CancelToken } = axios;

const CURRENCIES = ['EUR', 'USD'];
const defaultActiveCurrencies = {};

CURRENCIES.forEach((currency) => {
  if (currency === 'EUR') defaultActiveCurrencies[currency] = true;
  else defaultActiveCurrencies[currency] = false;
});

const NewPredictionContainer = ({ products, makePrediction }) => {
  const [currencies, setCurrencies] = useState(defaultActiveCurrencies);
  const toggleCurrency = (currency) => setCurrencies({
    ...currencies,
    [currency]: !currencies[currency],
  });

  const activeCurrencies = Object.keys(currencies)
    .map((currency) => (currencies[currency] === true ? currency : null))
    .filter((currency) => currency !== null);

  const [selectedMarket, setSelectedMarket] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const [marketPrice, setMarketPrice] = useState(null);
  const renderPrice = () => (
    marketPrice !== null ? <span>(listed at <b>{marketPrice}</b>)</span> : ''
  );

  useEffect(() => {
    let isCancelled = false;
    const source = CancelToken.source();
    const fetchMarketPrice = async () => {
      const price = await getLiveData(selectedMarket, {
        cancelToken: source.token,
      });
      if (!isCancelled) setMarketPrice(price);
    };

    if (selectedMarket !== null) {
      fetchMarketPrice();
      const intervalId = setInterval(fetchMarketPrice, 1 * 1000);
      return () => {
        isCancelled = true;
        source.cancel();
        clearInterval(intervalId);
      };
    }
    return () => {};
  }, [selectedMarket]);

  const [direction, setDirection] = useState();
  const [duration, setDuration] = useState('Select a duration');

  const sendPrediction = () => {
    makePrediction({
      selectedMarket,
      direction,
      duration,
    });
  };

  return (
    <Container>
      <Link to="/predictions" id="new-prediction-back-arrow">
        <img alt="Go back" src={BackArrow} />
      </Link>
      <Row className="justify-content-md-center">
        <div id="new-prediction-head">
          <span role="img" aria-label="CrystalBall">🔮</span>
          Make a new prediction
        </div>
      </Row>
      <br /><br /><br />
      <Form onSubmit={onSubmit}>

        <Form.Group as={Row} controlId="formCurrency">
          <Form.Label column md="auto">
            Currencies
          </Form.Label>
          <Col>
            {CURRENCIES.map((CURRENCY) => (
              <Form.Check
                key={CURRENCY}
                type="switch"
                id={CURRENCY}
                inline
                label={CURRENCY}
                onChange={({ target: { id: currency } }) => toggleCurrency(currency)}
                checked={currencies[CURRENCY]}
              />
            ))}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formMarket">
          <Form.Label column md="auto">
            Select a market
          </Form.Label>
          <Col>
            <CoinDropdown
              products={products}
              activeCurrencies={activeCurrencies}
              selectMarket={(market) => setSelectedMarket(market)}
            />
          </Col>
        </Form.Group>

        {selectedMarket ? (
          <Form.Group as={Row} controlId="formDirection">
            <Form.Label column md="auto">
          I think that <strong>{selectedMarket}</strong> {renderPrice()} will
            </Form.Label>
            <Col>
              <Button variant="success" onClick={() => setDirection('UP')}>
                <span role="img" aria-label="chart-increasing">📈</span>
              have increased in price
              </Button>
              <Button variant="danger" style={{ marginLeft: 26 }} onClick={() => setDirection('DOWN')}>
                <span role="img" aria-label="chart-decreasing">📉</span>
              have decreased in price
              </Button>
            </Col>
          </Form.Group>
        ) : ''}

        {direction ? (
          <Form.Group as={Row} controlId="formDirection">
            <Form.Label column md="auto">
              in
            </Form.Label>
            <Col>
              <DurationDropdown
                duration={duration}
                setDuration={(selectedDuration) => setDuration(selectedDuration)}
              />
            </Col>
          </Form.Group>
        ) : ''}


        {duration !== 'Select a duration' ? (
          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <div className="new-prediction-btn" role="button" tabIndex={0} onClick={sendPrediction}>
                <div className="new-prediction-btn-txt">
                  <span role="img" aria-label="Wizard">🧙‍♂️</span>
                  <span> Abracadabra!</span>
                </div>
              </div>
            </Col>
          </Form.Group>
        ) : ''}

      </Form>
    </Container>
  );
};

NewPredictionContainer.propTypes = {
  products: PropTypes.instanceOf(Array).isRequired,
  makePrediction: PropTypes.func.isRequired,
};

export default NewPredictionContainer;
