import {Dimensions} from 'react-native';

const COLORS = {
  primary: '#F7007D',
  secondary: '#E9EEF7',
  textColor: '#2A2A2A',
  danger: '#FF0037',
  borderColor: '#DBD9D9',
  borderCardColor: '#F39FCA',
  borderColorFocused: '#7C7C7C',
  white: '#FFFFFF',
  black: '#000000',
};

const SIZES = {
  borderRadius: 12,
  borderRadiusSmall: 4,
  borderRadiusMedium: 8,
  borderRadiusLarge: 16,

  authIconSizes: 24,

  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
};

const IMAGES = {
  riskfactorsBanner:
    'https://res.cloudinary.com/dftozcqnt/image/upload/v1671452357/Breastcancer_bc4jt7.jpg',
  onBoard1:
    'https://res.cloudinary.com/dav5lnlxj/image/upload/v1665910054/hospital_vpjetb.png',
  onBoard2:
    'https://res.cloudinary.com/dav5lnlxj/image/upload/v1665910060/doc_umpdad.png',
  onBoard3:
    'https://res.cloudinary.com/dav5lnlxj/image/upload/v1665910060/calender_wq42mz.png',
  authImage:
    'https://res.cloudinary.com/dav5lnlxj/image/upload/v1665910061/authImage_mb3hex.png',
  verifyImage:
    'https://res.cloudinary.com/dftozcqnt/image/upload/v1669895999/otp_two-factor_1_cdkweo.png',

  selfExamine:
    'https://res.cloudinary.com/dav5lnlxj/image/upload/v1665910055/healthy_dutzy0.png',
  riskFactors:
    'https://res.cloudinary.com/dav5lnlxj/image/upload/v1665910049/risk_jn06br.png',
  hospital:
    'https://res.cloudinary.com/dav5lnlxj/image/upload/v1665910054/hospitals_q8jow9.png',
  specialist:
    'https://res.cloudinary.com/dav5lnlxj/image/upload/v1665910060/doc_umpdad.png',

  headerImage:
    'https://res.cloudinary.com/dav5lnlxj/image/upload/v1665910049/nurse_ufaz8i.png',

  helpImage:
    'https://res.cloudinary.com/dftozcqnt/image/upload/v1672855007/Breast_cancer_awareness-rafiki_bne9ja.png',
  shareImage:
    'https://res.cloudinary.com/dftozcqnt/image/upload/v1673139794/undraw_Share_re_9kfx_trrlt3.png',
};

export {COLORS, SIZES, IMAGES};
