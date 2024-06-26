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
    HelpIcon,
    ShoppingCartIcon
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
      title: 'Mis productos',
      icon: ShoppingCartIcon,
      to: '',
      children: [
        {
          title: 'Todos los productos',
          icon: CircleIcon,
          to: '/productos'
        },
        {
          title: 'Agregar producto',
          icon: CircleIcon,
          to: '/agregar-producto'
        },
      ]
    },
    {
      title: 'Mis gastos',
      icon: KeyIcon,
      to: '',
      children: [
        {
          title: 'Agregar gasto',
          icon: CircleIcon,
          to: '/agregar-gasto'
        },
        {
          title: 'Consultar mis gastos',
          icon: CircleIcon,
          to: '/mis-gastos'
        },
        // {
        //   title: 'Gasto Anual',
        //   icon: CircleIcon,
        //   to: '/auth/register'
        // },
      ]
    },
  ];
  
  export default sidebarItem;