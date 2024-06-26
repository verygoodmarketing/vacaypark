import { Route } from '@angular/router';

export const routes: Route[] = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
];

// export const appRoutes: Route[] = [
//   {
//     path: '',
//     pathMatch: 'full',
//     redirectTo: 'branches',
//   },
//   {
//     path: '',
//     loadComponent: () =>
//       import('./layouts/main/main-layout.component').then(
//         c => c.MainLayoutComponent,
//       ),
//     children: [
//       {
//         path: 'branches',
//         loadComponent: () =>
//           import('./views/branches/branches.component').then(
//             c => c.BranchesComponent,
//           ),
//       },
//       {
//         path: 'pull-requests',
//         loadComponent: () =>
//           import('./views/pull-requests/pull-requests.component').then(
//             c => c.PullRequestsComponent,
//           ),
//       },
//       {
//         path: 'environments',
//         loadComponent: () =>
//           import('./views/environments/environments.component').then(
//             c => c.EnvironmentsComponent,
//           ),
//       },
//       {
//         path: 'login',
//         loadComponent: () =>
//           import('./components/login/login.component').then(
//             c => c.LoginComponent,
//           ),
//       },
//     ],
//   },
// {
//   path: 'login',
//   loadComponent: () =>
//     import('./layouts/login/login-layout.component').then(
//       c => c.LoginLayoutComponent,
//     ),

//   children: [
//     {
//       path: '',
//       loadComponent: () =>
//         import('./components/login/login.component').then(
//           c => c.LoginComponent,
//         ),
//       //     // loadComponent: () =>
//       //     //   import('./views/login-view/login-view.component').then(
//       //     //     c => c.LoginViewComponent,
//       //     //   ),
//       //     // canActivate: [AngularFireAuthGuard],
//       //     // data: { authGuardPipe: redirectLoggedInToHome },
//       //     loadComponent: () =>
//       //       import('./components/login/login.component').then(
//       //         c => c.LoginComponent,
//       //       ),
//     },
//   ],
// },
// ];
