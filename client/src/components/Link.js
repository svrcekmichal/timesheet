import { PropTypes } from 'react';
import styled, {css} from 'styled-components';
import { Link as RouterLink } from 'react-router';

const linkStyle = css`
  color: #2b8de7;
  text-decoration: none;
  display: ${props => props.display || 'inline-block'};
  &:hover {
    color: #2e6ab8;
  }
`

const propTypes = {
  display: PropTypes.string
}

export const Link = styled(RouterLink)`
  ${linkStyle}
`;

Link.propTypes = propTypes;

export const Anchor = styled.a`
  ${linkStyle}
`;

Anchor.propTypes = propTypes;