import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankLayoutComponent } from './blank-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BlankLayoutComponent],
  imports: [
    CommonModule,
    RouterModule // ✅ INDISPENSABLE pour <router-outlet>
  ],
  exports: [BlankLayoutComponent]
})
export class BlankLayoutModule {}
