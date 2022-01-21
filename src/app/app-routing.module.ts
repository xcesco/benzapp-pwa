import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DEBUG_INFO_ENABLED} from "./app.constants";
import {navbarRoute} from "./layouts/navbar/navbar.route";
import {errorRoute} from "./layouts/error/error.route";

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'login',
          loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        },
        ...LAYOUT_ROUTES,
      ],
      {enableTracing: DEBUG_INFO_ENABLED}
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

