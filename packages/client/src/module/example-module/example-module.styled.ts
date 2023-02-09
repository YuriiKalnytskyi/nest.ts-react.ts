import styled, { css } from 'styled-components';
import { SPACES } from '../../theme';
import { Button } from './component/button';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const buttonsSharedStyels = css`
  width: 100%;
  padding-top: ${SPACES.xxs};
  padding-bottom: ${SPACES.xxs};
`;

export const SaveButton = styled(Button)<{ hasErrors?: boolean }>`
  ${buttonsSharedStyels}

  ${({ hasErrors }) =>
    hasErrors &&
    css`
      margin-bottom: 0 !important;
    `}
`;
