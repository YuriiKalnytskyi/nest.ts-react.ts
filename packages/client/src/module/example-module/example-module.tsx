import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { Formik, Form } from 'formik';
import toast from 'react-hot-toast';

import { EAccountFormControls, IOnSubmitData } from './types';
import { IAuthError, IExampleLogin } from '../../types';
import { exampleInitialValues } from './constants';
import { APP_KEYS } from '../common/constants';
import { exampleService, exampleAuthService } from '../../services';
import { validationSchemaExample } from './validation';
import { COLORS, FONTS } from '../../theme';

import {
  AddEditLayout,
  AvatarSetup,
  ButtonDelete,
  CloseAndOther,
  ConfirmationPopup,
  Drawer,
  Input,
  Loader,
  Loading,
  Pagination,
  SelectInput,
  VideoPlayer
} from '../common/component';

import * as Styled from './example-module.styled';
import testVideo from '../../assets/video/video-for-testing.mp4';
import testIcon from '../../assets/icon/example/add-avatar.svg';
import { SignInSocialMedia } from '../auth/common/sign-in-social-media/sign-in-social-media';
import { ESocialMedia } from '../auth/constants';
import { ButtonAdd } from '../common/component/button/button-add';

const ExampleModule = () => {
  const client = useQueryClient();

  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState<boolean>(false);
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarString, setAvatarString] = useState(null); // data?.photo || null

  const deleteAvatar = () => {
    setAvatarString(null);
    setAvatarFile(null);
  };

  const onError = (err: AxiosError<IAuthError>) => {
    toast.error('Error');
    toast.success('Success');
  };

  // const { data,refetch } = useQuery(
  //   'GetUser',
  //   exampleAuthService.getOneUser.bind(exampleAuthService, {
  //     id: '123e4567-e89b-12d3-a456-426655440000'
  //   }),
  //   {
  //     onError
  //   }
  // );

  const onSuccess = async () => {
    // await refetch();
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
    setIsAddDrawerOpen(false);
  };

  const onSaveButton = () => {
    setIsShowLoader(true);
  };

  useEffect(() => {
    if (isShowLoader) {
      setTimeout(() => {
        setIsShowLoader(false);
      }, 1500);
    }
    if (isLoader) {
      setTimeout(() => {
        setIsLoader(false);
      }, 3000);
    }
  }, [isShowLoader, isLoader]);

  return (
    <Styled.Container>
      <Formik
        initialValues={exampleInitialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchemaExample}
      >
        {({ errors, isValid }) => (
          <Form>
            <Input name={EAccountFormControls.NAME} label={'name'} required />
            <Input
              withIcon={Styled.UserInputIcon}
              name={EAccountFormControls.EMAIL}
              label={'Email'}
              readOnly
              required
              mt={'40px'}
            />

            <Input
              type={'password'}
              name={EAccountFormControls.PASSWORD}
              label={'Password'}
              required
              mt={'40px'}
            />

            <Input
              height={'40px'}
              name={EAccountFormControls.PASSWORD2}
              label={'Password2'}
              inputType={'2'}
              required
              type={'password'}
              mt={'40px'}
            />

            <SelectInput
              array={['Patient', 'Doctor']}
              label={'Виберіть'}
              name={'selectValue'}
              isSearch
              mt={'20px'}
            />

            <Styled.SaveButton
              content={'submit'}
              type='submit'
              variant='primary'
              hasErrors={Object.keys(errors).length > 0}
              mt={'20px'}
            />
          </Form>
        )}
      </Formik>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Styled.SaveButton
          content={'Open Drawer'}
          type='button'
          variant='primary'
          onClick={() => setIsAddDrawerOpen(true)}
          width={'200px'}
          mb={'10px'}
        />
        <Styled.SaveButton
          content={'Open Popup'}
          type='button'
          variant='primary'
          onClick={() => setIsPopupOpen(true)}
          width={'200px'}
          mb={'10px'}
        />

        <Styled.SaveButton
          content={'Icon Button'}
          type='button'
          variant='primary'
          onClick={() => setIsPopupOpen(true)}
          width={'200px'}
          height={'50px'}
          endIcon={testIcon}
          startIcon={testIcon}
          marginIcon={'20px'}
          widthIcon={'30px'}
        />

        <ButtonDelete content={'ButtonDelete'} width={'200px'} mt={'10px'} />
        <ButtonAdd width={'200px'} height={'50px'} content={'ButtonAdd'} mt={'10px'} />

        <AvatarSetup
          label={'Avatar'}
          avatar={avatarString || (avatarFile ? URL.createObjectURL(avatarFile) : undefined)}
          handleAvatarUpload={setAvatarFile}
          delAvatar={deleteAvatar}
        />

        <SignInSocialMedia
          component={ESocialMedia.GOOGLE}
          margin={`${FONTS.SIZES.lxx} 0 ${FONTS.SIZES.s} 0`}
        />

        <SignInSocialMedia
          component={ESocialMedia.FACEBOOK}
          margin={`0 0 ${FONTS.SIZES.xxxxl} 0`}
        />

        <CloseAndOther hoverColor={'red'} />

        {30 && 30 > 10 ? (
          <Pagination
            totalCount={30}
            pageSize={10}
            siblingCount={2}
            onPageChange={(num: number) => setPage(num)}
            currentPage={page}
          />
        ) : null}
      </div>

      <VideoPlayer
        maxWidth='400px'
        src={testVideo}
        // src={'https://my-santa-images.s3.us-west-2.amazonaws.com/671ac91b-a1ff-469c-b512-f8fa379b13e4.mp4'}
      />

      <Drawer
        open={isAddDrawerOpen}
        onClose={onCloseDrawer}
        contentPosition='right'
        slidePosition='right'
      >
        <AddEditLayout title={'twst'} text={'test'} onCloseButtonClick={onCloseDrawer}>
          <Styled.SaveButton
            content={
              !isShowLoader ? (
                'Save'
              ) : (
                <Loader size='small' color={COLORS.primaryRed} height='auto' />
              )
            }
            className='mb'
            disabled={isShowLoader}
            type='button'
            variant='primary'
            onClick={onSaveButton}
          />

          <Styled.SaveButton
            content={'Cancel'}
            type='button'
            variant='inverse'
            onClick={onCloseDrawer}
          />

          {isLoader ? <Loading className='full-screen' /> : null}
        </AddEditLayout>
      </Drawer>

      {isPopupOpen ? (
        <ConfirmationPopup
          onClose={() => setIsPopupOpen(false)}
          onConfirm={() => setIsPopupOpen(false)}
          title={'fkfkkfkf'}
          text={'ddkdkdkkdk'}
          isOpen={isPopupOpen}
        />
      ) : null}
    </Styled.Container>
  );
};

export default ExampleModule;
