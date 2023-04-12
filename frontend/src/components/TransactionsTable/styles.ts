import styled, { css } from 'styled-components';

const borderRadius = css`
  &:first-child {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }

  &:last-child {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
`;

export const Container = styled.div`
  margin-top: 1rem;

  @media only screen and (max-width: 500px) {
    display: none;
  }

  table {
    width: 100%;
    border-spacing: 0rem 0.5rem;

    th {
      padding: 1rem 2rem;
      font-weight: 400;
      line-height: 1.5rem;
      text-align: left;
      color: var(--text-body);
      background: var(--gray-dark);
      opacity: 0.4;
      ${borderRadius}
    }

    td {
      padding: 1rem 0.8rem;
      color: var(--text-body);
      background: transparent;
      ${borderRadius}

      &:first-child {
        color: var(--text-title);
      }

      &[class*='+'] {
        color: var(--green);
      }

      &[class*='-'] {
        color: var(--red);
      }
    }
  }
`;
