export function unsplashSrc(id: string, _width = 1400) {
  return `/styles/${id}.jpg`;
}

/** IDs comprobados contra images.unsplash.com (HTTP 200). */
export const stylePhotos = {
  atelier: {
    hero: "photo-1578749556568-bc2c40e68b61",
    lamp: "photo-1513506003901-1e6a229e2d15",
    wood: "photo-1452860606245-08befc0ff44b",
    copper: "photo-1615485290382-441e4d049cb5",
    studio: "photo-1519710164239-da123dc03ef4",
  },
  work: {
    norte: "photo-1487958449943-2429e8be8625",
    caja: "photo-1447933601403-0c6688de566e",
    breve: "photo-1524758631624-e2822e304c36",
    aula: "photo-1503387762-592deb58ef4e",
    portrait: "photo-1507003211169-0a1dd7228f2d",
  },
  taller: {
    storefront: "photo-1504148455328-c376907d081c",
    tools: "photo-1581244277943-fe4a9c777189",
    wood: "photo-1416879595882-3373a0480b5b",
    street: "photo-1585464231875-d9ef1f5ad396",
    map: "photo-1477959858617-67f85cf4f1df",
  },
  norte: {
    hero: "photo-1497366216548-37526070297c",
    meeting: "photo-1497366811353-6870744d04b2",
    paper: "photo-1454165804606-c3d57bc86b40",
  },
  roja: {
    room: "photo-1517248135467-4c7edcad34c4",
    plate: "photo-1414235077428-338989a2e8c0",
    tacos: "photo-1624300629298-e9de39c13be5",
    mole: "photo-1504674900247-0877df9cc836",
    dessert: "photo-1551024601-bec78aea704b",
  },
  casa: {
    norte: "photo-1600596542815-ffad4c1539a9",
    alba: "photo-1600607687939-ce8a6c25118c",
    centro: "photo-1600566753086-00f18fb6b3ea",
    lote: "photo-1564013799919-ab600027ffc6",
  },
  cielo: {
    ana: "photo-1494790108377-be9c29b29330",
    mar: "photo-1573496359142-b8d87734a5a2",
    sol: "photo-1472099645785-5658abf4ff4e",
  },
  lila: {
    salon: "photo-1560066984-138dadb4c035",
    cut: "photo-1522337360788-8b13dee7a37e",
    color: "photo-1487412947147-5cebf100ffc2",
  },
  nexo: {
    warehouse: "photo-1553413077-190dd305871c",
  },
  mostrador: {
    bag: "photo-1591195853828-11db59a44f6b",
    candle: "photo-1603006905003-be475563bc59",
    soap: "photo-1556228720-195a672e8a03",
    notebook: "photo-1531346878377-a5be20888e57",
  },
} as const;
