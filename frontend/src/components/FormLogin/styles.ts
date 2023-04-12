import styled, { css } from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 40rem;
  height: 30rem;

  padding: 0 4rem;

  border: 1px solid var(--primary);
  border-radius: 2rem;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;

  button {
    margin-top: 2rem;
  }
`;
export const FormTitle = styled.h2`
  margin: 4rem 0 2rem 0;

  color: var(--primary);
`;
export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  &:first-child {
    margin-bottom: 2rem;
  }

  label {
    color: var(--text-body);
    margin-left: 0.4rem;
  }
`;

export const Input = styled.input<{ filled?: boolean }>`
  height: 100%;
  width: 100%;

  border: 2px solid transparent;
  border-radius: 3rem;

  background-color: var(--gray-dark);
  color: var(--text-body);
  opacity: 0.8;

  margin-top: 0.4rem;

  padding: 1rem;

  &:focus,
  &:hover {
    outline: none;
    border: 2px solid var(--primary);
  }

  ${(props) =>
    props.filled &&
    css`
      border-color: var(--primary);
    `}
`;

export const ErrorMessage = styled.span`
  font-size: 0.8rem;
  color: red;

  margin-left: 0.8rem;
  margin-top: 0.2rem;
`;
