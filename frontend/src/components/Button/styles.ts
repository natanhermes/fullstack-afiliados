import styled from 'styled-components';

export const ButtonStyled = styled.button`
  padding: 0 2rem;
  height: 3rem;
  font-size: 1rem;
  color: #ffffff;
  background: var(--primary);
  border: 0;
  border-radius: 0.25rem;
  transition: filter 0.2s ease-in-out;

  &:hover {
    filter: brightness(0.9);
  }

  &:focus {
    outline: none;
  }
`;
