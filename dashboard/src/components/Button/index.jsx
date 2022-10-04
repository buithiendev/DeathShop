import styled from 'styled-components';

function Button(props) {
    const { onClick, onSubmit, type } = props;

    return (
        <ButtonContainer onClick={onClick} onSubmit={onSubmit} type={type}>
            {props.children}
        </ButtonContainer>
    );
}

const ButtonContainer = styled.button`
    cursor: pointer;
    margin-top: 25px;
    width: 100%;
    padding: 15px;
    background-color: var(--color-success);
    border-radius: 25px;
    border: 0;
    font-weight: 600;
    color: var(--white-color);
    font-size: 1.5rem;
    transition: var(--transition);
    text-transform: uppercase;

    &:hover {
        background-color: #333;
    }
`;

export default Button;
