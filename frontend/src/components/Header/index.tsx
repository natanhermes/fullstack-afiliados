import Image from 'next/image';
import logoImg from '../../../public/afiliados-logotipo.png';

import { Container, Content } from './styles';
import { Profile } from './Profile';

export function Header() {
  return (
    <Container>
      <Content>
        <Image width={120} height={40} src={logoImg} alt="Afiliados" />
        <Profile />
      </Content>
    </Container>
  );
}
