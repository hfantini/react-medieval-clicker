import './Loader.scss';
import styled from 'styled-components';

const Loader = styled.img`
width: ${props => props.width ? props.width : "1rem"};
height: ${props => props.height ? props.height : "1rem"};
`

export default Loader;
