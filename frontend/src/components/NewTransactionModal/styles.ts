import styled from 'styled-components';

export const Container = styled.form`
  height: 10rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const InputFileContainer = styled.div`
  padding: 0 1.5rem;
  width: 100%;
  height: 4rem;
  font-size: 1rem;
  font-weight: 400;
  background: #e7e9ee;
  border: 1px solid #d7d7d7;
  border-radius: 0.25rem;

  display: flex;

  input {
    display: none;
  }

  label {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;

export const Title = styled.h2`
  color: var(--primary);
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
