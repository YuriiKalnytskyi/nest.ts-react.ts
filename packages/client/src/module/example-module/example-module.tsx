import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { Formik, Form } from 'formik';
import toast from 'react-hot-toast';

import { EAccountFormControls, IOnSubmitData } from './types';
import { IAuthError, IExampleLogin } from '../../types';

import { exampleInitialValues } from './constants';
import { APP_KEYS } from '../common/constants';

import { exampleService, exampleAuthService } from '../../services';

import { validationSchemaExample } from './validation';

import { Input } from './component/input';

import * as Styled from './example-module.styled';

const ExampleModule = () => {
  const client = useQueryClient();

  const onError = (err: AxiosError<IAuthError>) => {
    toast.error('Error');
  };

  const { refetch } = useQuery(
    'GetUser',
    exampleAuthService.getOneUser.bind(exampleAuthService, {
      id: '123e4567-e89b-12d3-a456-426655440000'
    }),
    {
      onError
    }
  );

  const onSuccess = async () => {
    await refetch();
    // or
    await client.invalidateQueries(APP_KEYS.QUERY_KEYS.EXAMPLE);
  };

  const { mutate: login } = useMutation<any, AxiosError<IAuthError>, IExampleLogin>(
    (req: IExampleLogin) => exampleService.login(req),
    {
      onSuccess,
      onError
    }
  );

  const { mutate: editUser } = useMutation<any, AxiosError<IAuthError>, IExampleLogin>(
    (req: IExampleLogin) => exampleAuthService.editUser(req),
    {
      onSuccess,
      onError
    }
  );

  const onSubmit = (data: IOnSubmitData) => {
    login(data);
    editUser(data);
  };

  return (
    <Styled.Container>
      <Formik
        initialValues={exampleInitialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchemaExample}
      >
        {({ errors, isValid }) => (
          <Form>
            <Input name={EAccountFormControls.EMAIL} type={'text'} margin={'0'} />
            <Input name={EAccountFormControls.PASSWORD} type={'text'} margin={'0'} />

            <Styled.SaveButton
              content={'submit'}
              type="submit"
              variant="primary"
              hasErrors={Object.keys(errors).length > 0}
            />
          </Form>
        )}
      </Formik>
    </Styled.Container>
  );
};

export default ExampleModule;
