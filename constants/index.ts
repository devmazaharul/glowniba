export const defaultValues = Object.freeze({
  saltRound: 10,
  addProductLimit: 50,
  addTocartLimit:20,
  featureListSize: 10,
  productLimit: 10,
  productLimitMobile: 5,
  productLimitTablet: 8,
  productLimitDesktop: 10,
  siteName: 'Glow niba',
  siteUrl: 'https://glowniba.vercel.app',
  facbookPageUrl: 'https://facebook.com/glowniba',
  instagramUrl: 'http://instagram.com/glowniba',
  instagramUserName: '@glowniba',
  whatsAppNumber: '8801799588',
  whatAppsMessage: 'Hi, I want to buy from Glow Niba!',
  responceUserLimit:30,
  responceSubscriberLimit:40,
  processingFee: 40,
});

export const contactInfo = Object.freeze({
  supprtyEmail: 'support@glowniba.com',
  supprtyPhone: '+880171265885',
  supprtyAddress: 'Dhaka, Bangladesh',
  supprtyLocation: 'Dhaka, Bangladesh',
});

export const loggerControllerExternalObject = Object.freeze({
  useExternalLogserver: true,
  loggerServerHost: 'https://estudy-backend.vercel.app',
  loggerServerPort: 443,
  loggerServerPath: '/log',
});


export const productLimitation=Object.freeze({
  productShowLImit:30
})

export   const avableAblepaymentMethods = [
    {
      name: 'cod',
      url: 'https://img.freepik.com/premium-vector/cod-icon-shipping-cash-delivery-symbol-vector-logo-template_883533-219.jpg',
    },
    {
      name: 'mazapay',
      url: 'https://glowniba.vercel.app/_next/image?url=%2Fmazapay.png&w=64&q=75',
    },
    {
      name: 'bkash',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQexegg4w0f3wDXzIeODqG8GI4JPMnsHupA-g&s',
    },
    {
      name: 'nagad',
      url: 'https://freelogopng.com/images/all_img/1679248787Nagad-Logo.png',
    },
  ];