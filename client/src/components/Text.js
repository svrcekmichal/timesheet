import { PropTypes } from 'react';
import styled from 'styled-components';

const Text =  styled.p`
  font-size: ${props => props.fontSize || 1}em;
  line-height: ${props => props.lineHeight || 1}em;
  text-align: ${props => props.textAlign || 'left'};
  margin: 0;
`;

Text.propTypes = {
  fontSize: PropTypes.number,
  lineHeight: PropTypes.number,
  textAlign: PropTypes.string
};

export default Text;
