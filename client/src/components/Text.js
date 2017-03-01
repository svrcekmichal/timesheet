import { PropTypes } from 'react';
import styled, { css } from 'styled-components';

const Text =  styled.p`
  ${props => props.inline && css`
    display: inline-block;
    vertical-align: top;
  `}

  font-size: ${props => props.fontSize || 1}em;
  line-height: ${props => props.lineHeight || 1}em;
  text-align: ${props => props.textAlign || 'left'};
  margin: 0;
`;

Text.propTypes = {
  inline: PropTypes.bool,
  fontSize: PropTypes.number,
  lineHeight: PropTypes.number,
  textAlign: PropTypes.string
};

export default Text;
