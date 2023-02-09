const ERROR_MESSAGES = Object.freeze({
  DUPLICATE_USER: 'user already exists',
  DUPLICATE_EMAIL: 'user with such email already exists',
  DUPLICATE_CONTACT: 'Contact already exist',
  NOT_FOUND_USER: 'user does not exist',
  NOT_FOUND_SUB_USER: 'sub user does not exist',
  NOT_FOUND_SUB_PROFILE: 'sub profile does not exist',
  INVALID_PASSWORD: 'invalid password',
  UNABLE_ENCRYPT: 'unable to encrypt your password',
  CANT_CREATE_SUB_PROFILE: 'you cannot create sub profile',
  CANT_MODIFY_SUB_PROFILE: 'you cannot modify this sub profile',
  SOCIAL_MEDIA: 'you registred via social media',
  CANNOT_CREATE_SUGGESTED_ITEM: 'you cannot create suggested item',
  CANT_MODIFY_ITEM: 'you cannot modify this item',
  CANT_ADD_TO_WISH_LIST: 'you cannot add this item to the wishlist',
  NOT_FOUND_ITEM: 'item does not exist'
});

export default ERROR_MESSAGES;
