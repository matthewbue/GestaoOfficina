import { RouteInfo } from './vertical-menu.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [
  {
    path: '/page', title: 'Home', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  // {
  //   path: '/alertas', title: 'Alertas', icon: 'ft-bell', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  // },
  // {
  //   path: '', title: 'MenuTopSetting', icon: 'ft-life-buoy', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
  //   submenu: [
  //     { path: '/account', title: 'MenuItemUserAccount', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  //   ]
  // },
{
  path: '', title: 'MenuItemClientes', icon: 'ft-users', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
  submenu: [
    { path: '/clientes', title: 'MenuItemSubClientes', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  ]
},
{
  path: '/ordemdeservico', title: 'MenuItemOs', icon: 'ft-file', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
},
{
  path: '/orcamento', title: 'MenuItemOrçamento', icon: 'ft-file-text', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
}
];
