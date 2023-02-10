import styled from 'styled-components';
import { COLORS, FONTS, SPACES } from '../../../../theme';

export const OptionBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  margin: ${SPACES.xxs} ${SPACES.percent3} ${SPACES.xxs} ${SPACES.percent3};
  gap: ${SPACES.xxs};
  width: 94%;
`;

export const FieldLabel = styled.span`
  font-family: ${FONTS.FAMILIES.inter};
  font-weight: ${FONTS.WEIGHTS.medium};
  font-size: ${FONTS.SIZES.m};
  color: ${COLORS.mediumDarkShadeOfCyanBlue};
`;

export const Text = styled.span`
  font-family: ${FONTS.FAMILIES.inter};
  font-weight: ${FONTS.WEIGHTS.normal};
  font-size: ${FONTS.SIZES.s};
  color: ${COLORS.darkGrey};
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const AvatarContainer = styled.div`
  position: relative;
  margin-bottom: ${SPACES.xxs};
  width: 4rem;
  height: 4rem;
  background: ${COLORS.ligthGreyBlue};
  border: 1px dashed ${COLORS.darkGreyBlue};
  border-radius: 50%;

  input {
    position: absolute;
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;

    z-index: -1;
  }
`;

export const AddAvatar = styled.img`
  position: absolute;
  top: 1.8rem;
  left: 2.6rem;

  &:hover {
    cursor: pointer;

    rect {
      fill: black;
    }
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: ${COLORS.grey};
  padding: 0;
  margin: 0;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 80%;
  border-radius: 5px;
  cursor: pointer;
`;
