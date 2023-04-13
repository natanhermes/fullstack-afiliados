import { FormEvent, useContext, useRef, useState } from 'react';
import Modal from 'react-modal';

import closeImg from '../../../public/close.svg';
import { FiFile } from 'react-icons/fi';

import {
  Container,
  InputFileContainer,
  Title,
  ButtonContainer,
} from './styles';
import Image from 'next/image';
import { Button } from '../Button';
import { TransactionsContext } from '@/contexts/TransactionsContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const TOAST_DURATION_IN_MS = 3000;

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const notify = (message: string) =>
    toast(message, {
      autoClose: 1000,
    });
  const { uploadFile } = useContext(TransactionsContext);

  const [file, setFile] = useState<File>({} as File);

  function closeModal() {
    onRequestClose();
    setFile({} as File);
  }

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    if (!file.name) {
      notify('Selecione o arquivo para upload.');
      return;
    }

    toast.promise(uploadFile(file), {
      pending: 'Realizando upload. Aguarde...',
      success: 'Upload realizado com sucesso!',
      error: 'Ocorreu um erro ao realizar o upload. Contate o admin!',
    });

    setTimeout(closeModal, TOAST_DURATION_IN_MS);
  }

  function handleOnChange(file: File) {
    if (file.type !== 'text/plain') {
      notify('Arquivo inválido. Selecione um arquivo de texto(.txt)');
    }
    setFile(file);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button className="react-modal-close" type="button" onClick={closeModal}>
        <Image src={closeImg} alt="Fechal modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <Title>Importar transações</Title>

        <InputFileContainer>
          <label htmlFor="uploadFile">
            {file.name ? file.name : 'Selecione o arquivo para upload'}
            <FiFile size={24} />
            <input
              ref={inputRef}
              id="uploadFile"
              type="file"
              name="sales"
              onChange={(e) => handleOnChange(e.target.files![0])}
            />
          </label>
        </InputFileContainer>
        <ButtonContainer>
          <Button type="submit">Importar</Button>
          <ToastContainer
            theme="dark"
            progressStyle={{ backgroundColor: 'var(--primary)' }}
            autoClose={TOAST_DURATION_IN_MS}
          />
        </ButtonContainer>
      </Container>
    </Modal>
  );
}
