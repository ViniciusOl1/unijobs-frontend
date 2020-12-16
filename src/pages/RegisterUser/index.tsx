import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationsErrors';
import {
  Container,
  ContainerForm,
  Lateral,
  FormLinks,
  LinkForm,
} from './styles';

import Courses from '../../services/courses';

import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Banner from '../../components/Banner';
import api from '../../services/api';
import Loading from '../../components/Loading';

import { useToast } from '../../hooks/toast';
import ScrollToTopOnMount from '../../utils/ScrollToTopOnMount';

interface SignUpFormData {
  email: string;
  name: string;
  academic_record: number;
  phone: number;
  user_type: string;
  course: string;
  password: string;
  password_confirmation: string;
}

const RegisterUser: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required(),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          academic_record: Yup.number().required('Apenas números são aceitos'),
          course: Yup.string().required('Escolha seu curso'),
          phone: Yup.number().required('Digite um telefone válido'),
          user_type: Yup.string().required('Vendedor ou Comprador'),
          password: Yup.string().required('Senha é necessária'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Senhas devem ser iguais',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        addToast({
          type: 'sucess',
          title: 'Conta criada',
          description: 'Sua conta foi criada com sucesso',
        });

        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao se cadastrar, cheque as credenciais',
        });
      }
      setLoading(false);
    },
    [addToast, history],
  );
  document.body.style.overflow = 'hidden';

  return (
    <>
      <ScrollToTopOnMount />
      <Loading loading={loading} />
      <Banner backIcon />
      <Container>
        <Lateral />
        <ContainerForm>
          <FormLinks>
            <LinkForm to="login">Entrar</LinkForm>
            <LinkForm to="registeruser">Registre-se</LinkForm>
          </FormLinks>
          <Form onSubmit={handleSubmit}>
            <Input
              name="name"
              type="text"
              label="Nome Completo"
              placeholder="Digite seu Nome Completo"
            />
            <Input
              name="email"
              type="email"
              label="E-mail"
              placeholder="Digite seu E-mail"
            />
            <Input
              name="phone"
              type="tel"
              label="Telefone ou Celular"
              placeholder="Digite seu Telefone ou Celular"
            />
            <Select
              name="user_type"
              label="Você é vendedor ou comprador?"
              options={[
                { value: 'vendedor', label: 'Vendedor' },
                // { value: 'comprador', label: 'Comprador' },
              ]}
              placeholder="Você é vendedor ou comprador?"
            />
            <Input
              name="academic_record"
              type="number"
              label="Ra do Aluno"
              placeholder="Digite seu RA"
            />
            <Select
              name="course"
              label="Escolha seu curso"
              options={Courses}
              placeholder="Selecione seu curso"
            />
            <Input
              name="password"
              type="password"
              label="Escolha sua senha"
              placeholder="Digite sua Senha"
            />
            <Input
              name="password_confirmation"
              type="password"
              label="Confirme sua senha"
              placeholder="Digite sua Senha"
            />
            <Button type="submit" style={{ width: '100%' }}>
              Cadastrar-se
            </Button>
          </Form>
        </ContainerForm>
      </Container>
    </>
  );
};

export default RegisterUser;
