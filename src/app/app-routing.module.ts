import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeroesComponent} from "./heroes/heroes.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";

const routes: Routes = [
  {
    path: '',redirectTo: '/dashboard',pathMatch: 'full'
  },
  {
    path: 'dashboard',component: DashboardComponent
  },
  {
    path: 'heroes',component: HeroesComponent
  },
  {
    path: 'detail/:id',component: HeroDetailComponent
  }
];

@NgModule({
  //这个方法之所以叫 forRoot()，是因为你要在应用的顶层配置这个路由器。
  //forRoot() 方法会提供路由所需的服务提供者和指令，还会基于浏览器的当前 URL 执行首次导航
  imports: [RouterModule.forRoot(routes)],
  // AppRoutingModule 导出 RouterModule，以便它在整个应用程序中生效。
  exports: [RouterModule]
})
export class AppRoutingModule { }

// 能在 AppComponent 中使用 RouterOutlet，是因为 AppModule 导入了 AppRoutingModule，
// 而 AppRoutingModule 中导出了 RouterModule
