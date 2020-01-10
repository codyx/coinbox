import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link, useHistory } from 'react-router-dom';
import BackArrow from '../../../../public/assets/ionic-md-arrow-round-back.svg';
import GenericAnim from '../../animations/GenericAnim';

const ValidatePrediction = () => {
  const history = useHistory();
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
      <span>The prediction may take several minutes before appearing in the list.</span>
      <Row className="justify-content-md-center">
        <GenericAnim
          height={400}
          width={400}
          onComplete={() => history.push('/predictions')}
          fileName="validate-prediction.json"
        />
      </Row>
    </Container>
  );
};

export default ValidatePrediction;
