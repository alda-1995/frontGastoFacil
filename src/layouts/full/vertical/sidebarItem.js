import {
    CircleIcon,
    WindmillIcon,
    TypographyIcon,
    ShadowIcon,
    PaletteIcon,
    KeyIcon,
    BugIcon,
    DashboardIcon,
    BrandChromeIcon,
    HelpIcon
  } from 'vue-tabler-icons';
  
  const sidebarItem = [
    { header: 'Dashboard' },
    {
      title: 'home',
      icon: DashboardIcon,
      to: '/'
    },
    { divider: true },
    { header: 'Páginas' },
    {
      title: 'Mis gastos',
      icon: KeyIcon,
      to: '/auth',
      children: [
        {
          title: 'Agregar gasto',
          icon: CircleIcon,
          to: '/auth/login'
        },
        {
          title: 'Gastos del mes',
          icon: CircleIcon,
          to: '/auth/register'
        },
        {
          title: 'Gasto Anual',
          icon: CircleIcon,
          to: '/auth/register'
        },
      ]
    },
  ];
  
  export default sidebarItem;