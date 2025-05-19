import {
  brandFive,
  brandFour,
  brandOne,
  brandThree,
  brandTwo,
} from '@assets/index';

interface IBrandsItem {
  source: string;
  title: string;
}

export const brandsData: IBrandsItem[] = [
  { source: brandOne, title: 'Xiaomi' },
  { source: brandTwo, title: 'Sony' },
  { source: brandThree, title: 'Marshall' },
  { source: brandFour, title: 'LG' },
  { source: brandFive, title: 'JBL' },
];
