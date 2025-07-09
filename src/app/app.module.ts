import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullComponent } from './layouts/full/full.component';
import { DemoFlexyModule } from './demo-flexy-module'
import { ReactiveFormsModule } from '@angular/forms';
// Modules
import { DashboardModule } from './dashboard/dashboard.module';
import { ComponentsModule } from './components/components.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/services/auth.interceptor';
import { UserStorageComponent } from './UserStorage/user-storage.component';
import { BucketManagerComponent } from './components/bucket-manager/bucket-manager.component';
import { BucketDetailsComponent } from './components/bucket-details/bucket-details.component'; // ← ici ton composant
import { VmManagerComponent } from './components/vm-manager/vm-manager.component';
import { VmListComponent } from './components/vm-list/vm-list.component';
import { VmDetailsComponent } from './components/vm-details/vm-details.component';


@NgModule({
  declarations: [
    AppComponent,
    FullComponent,  
       LoginComponent,
      
       UserStorageComponent, 
       BucketManagerComponent,
       BucketDetailsComponent,
       VmManagerComponent ,
       VmListComponent,
VmDetailsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    DashboardModule,
    ComponentsModule,
    FormsModule,
    MatFormFieldModule,
     MatInputModule,
      MatButtonModule,
       RegisterComponent,
       ReactiveFormsModule ,
       HttpClientModule,
           MatCardModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
MatOptionModule

  ],
  providers: [
        {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
