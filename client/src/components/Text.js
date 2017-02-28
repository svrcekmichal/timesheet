import { PropTypes } from 'react';
import styled from 'styled-components';

const Text =  styled.p`
  font-size: ${props => props.fontSize || 1}em;
  line-height: ${props => props.lineHeight || 1}em
  margin: 0
`;

Text.propTypes = {
  fontSize: PropTypes.number,
  lineHeight: PropTypes.number
}

export default Text;
