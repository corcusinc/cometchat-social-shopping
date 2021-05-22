export interface Merchant {
    id: number;
    name: string;
    description: string;
    logoUrl: string;
}

export const mockMerchants: Merchant[] = [{
  id: 0,
  name: 'Big Book Co',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dictum elit massa, non volutpat nisi pharetra non. Ut sagittis, sem vitae gravida sagittis, augue purus rhoncus augue, a semper erat mi ac enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut in dapibus ipsum.',
  logoUrl: 'https://media.timeout.com/images/103021834/630/472/image.jpg'
}, {
  id: 1,
  name: 'Big Teddy Co',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dictum elit massa, non volutpat nisi pharetra non. Ut sagittis, sem vitae gravida sagittis, augue purus rhoncus augue, a semper erat mi ac enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut in dapibus ipsum.',
  logoUrl: 'https://www.buildabear.com/dw/image/v2/BBNG_PRD/on/demandware.static/-/Sites-buildabear-master/default/dw2b81d8a7/28502x.jpg'
}, {
  id: 2,
  name: 'Big Pillow Co',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dictum elit massa, non volutpat nisi pharetra non. Ut sagittis, sem vitae gravida sagittis, augue purus rhoncus augue, a semper erat mi ac enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut in dapibus ipsum.',
  logoUrl: 'http://www.whotelsthestore.com/images/products/lrg/w-hotels-feather-down-pillow-WHO-108-F_lrg.jpg'
}]
