import React, { useEffect, useState } from 'react';
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
import { COLORS, SPACES } from '../../theme';

import { Drawer } from '../common/component/drawer';
import { Loader } from '../common/component/loading/loader';
import { Loading } from '../common/component/loading';
import { AddEditLayout } from '../common/component/add-edit-layout';
import { ConfirmationPopup } from '../common/component/confirmation-popup/confirmation-popup';
import { InputTypeOne } from '../common/component/input/input-type-one';

import * as Styled from './example-module.styled';

const ExampleModule = () => {
  const client = useQueryClient();

  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState<boolean>(false);
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(true);


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

  const onCloseDrawer = () => {
    setIsAddDrawerOpen(false)
  };

  const onSaveButton = () => {
    setIsShowLoader(true)
  };

  useEffect(()=>{
    if (isShowLoader){
      setTimeout(()=>{setIsShowLoader(false)}, 1500)
    }
    if (isLoader){
      setTimeout(()=>{setIsLoader(false)}, 3000)
    }
  },[isShowLoader, isLoader])

  return (
    <Styled.Container>
      <Formik
        initialValues={exampleInitialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchemaExample}
      >
        {({ errors, isValid }) => (
          <Form>


            <InputTypeOne
              name={EAccountFormControls.NAME}
              label={'name'}
              required

            />
            <InputTypeOne
              withIcon={Styled.UserInputIcon}
              name={EAccountFormControls.EMAIL}
              label={'Email'}
              readOnly
              required
              mt={'40px'}
            />


            <InputTypeOne
              type={'password'}
              name={EAccountFormControls.PASSWORD}
              label={'Password'}
              required
              mt={'40px'}
            />

            <InputTypeOne
              height={'40px'}
              name={EAccountFormControls.PASSWORD2}
              label={'Password2'}
              inputType={'2'}
              required
              type={'password'}
              mt={'40px'}
            />




            <Styled.SaveButton
              content={'submit'}
              type="submit"
              variant="primary"
              hasErrors={Object.keys(errors).length > 0}
              mt={'20px'}
            />
          </Form>
        )}
      </Formik>

      <div style={{display: 'flex' , flexDirection: 'column'}}>
        <Styled.SaveButton
          content={'Open Drawer'}
          type="button"
          variant="primary"
          onClick={()=> setIsAddDrawerOpen(true)}
          width={'200px'}
          mb={'10px'}
        />
        <Styled.SaveButton
          content={'Open Popup'}
          type="button"
          variant="primary"
          onClick={()=> setIsPopupOpen(true)}
          width={'200px'}
        />
      </div>



      <Drawer
        open={isAddDrawerOpen}
        onClose={onCloseDrawer}
        contentPosition="right"
        slidePosition="right"
      >
        <AddEditLayout
          title={'twst'}
          text={'test'}
          onCloseButtonClick={onCloseDrawer}
        >
          <Styled.SaveButton
            content={
              !isShowLoader ? 'Save' : (
                <Loader size="small" color={COLORS.primaryRed} height="auto" />
              )
            }
            className="mb"
            disabled={isShowLoader}
            type="button"
            variant="primary"
            onClick={onSaveButton}
          />

          <Styled.SaveButton
            content={'Cancel'}
            type="button"
            variant="inverse"
            onClick={onCloseDrawer}

          />

          {isLoader ? <Loading className="full-screen" /> : null}
        </AddEditLayout>
      </Drawer>

      {
        isPopupOpen ?
          <ConfirmationPopup
            onClose={()=> setIsPopupOpen(false)}
            onConfirm={()=> setIsPopupOpen(false)}
            title={'fkfkkfkf'}
            text={'ddkdkdkkdk'}
            isOpen={isPopupOpen}
          />
         : null
      }

    </Styled.Container>
  );
};

export default ExampleModule;
