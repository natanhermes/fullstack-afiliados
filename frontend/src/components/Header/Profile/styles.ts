import NextLink from 'next/link';
import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;

  position: relative;

  div {
    display: flex;
    align-items: center;

    span {
      margin-right: 0.4rem;

      font-size: 1.2rem;
      color: var(--text-title);
    }
  }
`;

export const MenuDropdown = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  flex-direction: column;

  background-color: var(--text-title);

  height: 10rem;
  border-radius: 5px;
  position: absolute;
  top: 100%;
  right: 0;
  width: 10rem;

  z-index: 9999;
`;

export const ContainerMenuOption = styled.div`
  display: flex;
  width: 100%;

  &:hover {
    background-color: var(--text-body);
  }

  padding: 0.6rem;

  cursor: pointer;
`;
export const Link = styled(NextLink)`
  color: var(--gray-dark);
  text-decoration: none;
  margin-left: 1rem;
  font-weight: bold;
`;
