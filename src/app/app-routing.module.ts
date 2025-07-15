import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ExpansionComponent } from './components/expansion/expansion.component';
import { FormsComponent } from './components/forms/forms.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProgressSnipperComponent } from './components/progress-snipper/progress-snipper.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { SliderComponent } from './components/slider/slider.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { ProductComponent } from './dashboard/dashboard-components/product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UploadComponent } from './components/upload/upload.component';
import { FormsModule } from '@angular/forms'; 
import { UserStorageComponent } from './UserStorage/user-storage.component'; 
import { BucketManagerComponent } from './components/bucket-manager/bucket-manager.component';

import { BucketDetailsComponent } from './components/bucket-details/bucket-details.component';

import { VmManagerComponent } from './components/vm-manager/vm-manager.component';
import { VmListComponent } from './components/vm-list/vm-list.component';

import { VmDetailsComponent } from './components/vm-details/vm-details.component';

import { WelcomeComponent } from './pages/welcome/welcome.component';

import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component'; // ← Vérifie que ce chemin est correct
import { Home2Component } from './home2/home2.component';
import { CephfsComponent } from './components/cephfs/cephfs.component';
import { ForumComponent } from './components/forum/forum.component';

const routes: Routes = [
  // 🔓 Public layout (sans sidebar)
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: 'welcome', component: WelcomeComponent }
    ]
  },

  {
    path: 'authentication',
    component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },

  // 🔐 Private layout (avec sidebar)
  {
    path: '',
    component: FullComponent,
    children: [
      { path: 'cephfs', component: CephfsComponent },

       { path: 'forum', component: ForumComponent },

      { path: 'home2', component: Home2Component },
      { path: 'home', component: DashboardComponent },
      { path: 'alerts', component: AlertsComponent },
      { path: 'forms', component: FormsComponent },
      { path: 'table', component: ProductComponent },
      { path: 'grid-list', component: GridListComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'tabs', component: TabsComponent },
      { path: 'expansion', component: ExpansionComponent },
      { path: 'chips', component: ChipsComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'toolbar', component: ToolbarComponent },
      { path: 'progress-snipper', component: ProgressSnipperComponent },
      { path: 'snackbar', component: SnackbarComponent },
      { path: 'slider', component: SliderComponent },
      { path: 'slide-toggle', component: SlideToggleComponent },
      { path: 'tooltip', component: TooltipsComponent },
      { path: 'button', component: ButtonsComponent },
      { path: 'upload', component: UploadComponent },
      { path: 'storage', component: UserStorageComponent }, 
      { path: 'spaces', component: BucketManagerComponent },
      { path: 'bucket/:name', component: BucketDetailsComponent },
      { path: 'create-vm', component: VmManagerComponent },
      { path: 'vms', component: VmListComponent },
      { path: 'vms/create', component: VmManagerComponent },
      { path: 'vms/:name', component: VmDetailsComponent },
      {
  path: 'home2',
  component: Home2Component
}
    ]
  },

  // ❌ fallback
  { path: '**', redirectTo: '/home' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
