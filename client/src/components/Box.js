import React, { PropTypes } from 'react';
import styled, { css } from 'styled-components';

const Box = styled.div`

  ${props => props.margin && css`
    margin: ${props.margin};
  `}
  ${props => props.marginTop && css`
    margin-top: ${props.marginTop}em;
  `}
  ${props => props.marginRight && css`
    margin-right: ${props.marginRight}em;
  `}
  ${props => props.marginBottom && css`
    margin-bottom: ${props.marginBottom}em;
  `}
  ${props => props.marginLeft && css`
    margin-left: ${props.marginLeft}em;
  `}


  ${props => props.padding && css`
    padding: ${props.padding};
  `}
  ${props => props.paddingTop && css`
    padding-top: ${props.paddingTop}em;
  `}
  ${props => props.paddingRight && css`
    padding-right: ${props.paddingRight}em;
  `}
  ${props => props.paddingBottom && css`
    padding-bottom: ${props.paddingBottom}em;
  `}
  ${props => props.paddingLeft && css`
    padding-left: ${props.paddingLeft}em;
  `}
`;

Box.propTypes = {
  margin: PropTypes.string,
  marginTop: PropTypes.number,
  marginRight: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  padding: PropTypes.string,
  paddingTop: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingBottom: PropTypes.number,
  paddingLeft: PropTypes.number,
};
export default Box;