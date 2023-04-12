import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { FiChevronDown, FiLogOut, FiUser } from 'react-icons/fi';
import { BiSupport } from 'react-icons/bi';

import { Container, ContainerMenuOption, MenuDropdown, Link } from './styles';
import { AuthContext } from '@/contexts/AuthContext';

export function Profile() {
  const { signOut, user } = useContext(AuthContext);

  const [showMenuDropdown, setShowMenuDropdown] = useState(false);

  const profileContainerRef = useRef<HTMLDivElement>(null);
  const optionsContainerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        optionsContainerRef.current &&
        !optionsContainerRef.current.contains(event.target as Node)
      ) {
        optionsContainerRef.current.style.display = 'none';
        if (profileContainerRef.current) profileContainerRef.current.click();
      }
    },
    [profileContainerRef, optionsContainerRef],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <Container>
      <div
        ref={profileContainerRef}
        onClick={() => setShowMenuDropdown((prevState) => !prevState)}
      >
        <span>{user?.name.split(' ').slice(0, 2).join(' ')}</span>
        <FiChevronDown size={18} color="#E1E1E6" />
      </div>

      {showMenuDropdown && (
        <MenuDropdown ref={optionsContainerRef}>
          <ContainerMenuOption>
            <FiUser size={24} color="var(--gray-dark)" />
            <Link href="">Perfil</Link>
          </ContainerMenuOption>
          <ContainerMenuOption>
            <BiSupport size={24} color="var(--gray-dark)" />
            <Link href="">Suporte</Link>
          </ContainerMenuOption>
          <ContainerMenuOption onClick={signOut}>
            <FiLogOut size={24} color="var(--gray-dark)" />
            <Link href="">Sair</Link>
          </ContainerMenuOption>
        </MenuDropdown>
      )}
    </Container>
  );
}
