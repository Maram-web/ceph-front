import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsModule } from '@angular/forms';

// ✅ composants standalone à importer
import { AlertsComponent } from './alerts/alerts.component';
import { FormsComponent } from './forms/forms.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { ChipsComponent } from './chips/chips.component';
import { ProgressComponent } from './progress/progress.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { TooltipsComponent } from './tooltips/tooltips.component';


// ⚠️ À ajouter :
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';



// ✅ composant non-standalone à déclarer
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [
    UploadComponent // ✅ seulement les composants non-standalone ici
  ],
  imports: [
    CommonModule,
    FormsModule,
    FeatherModule.pick(allIcons),

    // ✅ importer les composants standalone ici
    AlertsComponent,
    FormsComponent,
    MenuComponent,
    TabsComponent,
    ExpansionComponent,
    ChipsComponent,
    ProgressComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent,
    ButtonsComponent,
    TooltipsComponent,
    MatCardModule,
    MatButtonModule
  
  ],
  exports: [
    UploadComponent,

    // ✅ tu peux les réexporter si besoin
    AlertsComponent,
    FormsComponent,
    MenuComponent,
    TabsComponent,
    ExpansionComponent,
    ChipsComponent,
    ProgressComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent,
    ButtonsComponent,
    TooltipsComponent,

  ]
})
export class ComponentsModule { }
