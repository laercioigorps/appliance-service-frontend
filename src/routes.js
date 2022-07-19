import React from 'react'
import CustomerCreate from './views/customers/customerCreate'
import CustomerDetail from './views/customers/customerDetail'
import CustomerList from './views/customers/customerList'
import ProblemsEdit from './views/services/problems/problemsEdit'
import ServiceCreate from './views/services/serviceCreate'
import ServiceList from './views/services/serviceList'
import ServiceDetail from './views/services/servicesDetail'
import SolutionsEdit from './views/services/solutions/solutionsEdit'
import SymptomsEdit from './views/services/symptoms/symptomsEdit'
import ApplianceEdit from './views/services/appliances/applianceEdit'
import ServicePriceEdit from './views/services/price/priceEdit'
import CreateAddressToCustomer from './views/customers/addresses/createAddress'
import SelectServiceAddress from './views/services/address/selectServiceAddress'
import DashboardCopy from './views/dashboard/Dashboard-copy'
import StatusEdit from './views/services/status/statusEdit'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))
const Teste = React.lazy(() => import('./views/teste/teste'))
const Logout = React.lazy(() => import('./views/pages/logout/logout'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/dashboard-copy', name: 'Dashboard', element: DashboardCopy },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/teste', name: 'Teste', element: Teste },
  { path: '/logout', name: 'Logout', element: Logout },
  //customer
  { path: '/customers/create', name: 'Customer Create', element: CustomerCreate },
  { path: '/customers/:id', name: 'Customer Detail', element: CustomerDetail, exact: true },
  {
    path: '/customers/:id/new-address',
    name: 'Customer Detail',
    element: CreateAddressToCustomer,
    exact: true,
  },
  { path: '/customers/', name: 'Customer List', element: CustomerList, exact: true },

  //services
  { path: '/services', name: 'Service List', element: ServiceList },
  { path: '/services/create', name: 'Service Create', element: ServiceCreate },
  { path: '/services/:id', name: 'Service Create', element: ServiceDetail },
  {
    path: '/services/:service_id/historic/:historic_id/symptoms/edit',
    name: 'Symptoms Edit',
    element: SymptomsEdit,
  },
  {
    path: '/services/:service_id/historic/:historic_id/problems/edit',
    name: 'Symptoms Edit',
    element: ProblemsEdit,
  },
  {
    path: '/services/:service_id/historic/:historic_id/solutions/edit',
    name: 'Symptoms Edit',
    element: SolutionsEdit,
  },
  {
    path: '/services/:service_id/historic/:historic_id/appliance/edit',
    name: 'Symptoms Edit',
    element: ApplianceEdit,
  },
  {
    path: '/services/:service_id/price/edit',
    name: 'Symptoms Edit',
    element: ServicePriceEdit,
  },
  {
    path: '/services/:service_id/address/select',
    name: 'Service Address Select',
    element: SelectServiceAddress,
  },
  {
    path: '/services/:service_id/status/edit',
    name: 'Status Edit',
    element: StatusEdit,
  },
]

export default routes
