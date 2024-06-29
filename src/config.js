var isLg = window.matchMedia("only screen and (min-width: 1024px)").matches;
const config = {
    Sidebar_drawer: isLg,
    Customizer_drawer: false,
    mini_sidebar: false,
    fontTheme: 'Roboto',
    inputBg: false
};

export default config;
