import { useState } from 'react';
import { Button } from '../Button';
import { Summary } from '../Summary';
import { TransactionsTable } from '../TransactionsTable';
import { ButtonContainer, Container } from './styles';
import { NewTransactionModal } from '../NewTransactionModal';

export const Dashboard = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModalUploadFile() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={openModalUploadFile}>Importar arquivo</Button>
      </ButtonContainer>
      <Summary />
      <TransactionsTable />

      <NewTransactionModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </Container>
  );
};
