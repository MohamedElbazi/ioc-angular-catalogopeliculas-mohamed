import { Routes } from '@angular/router';
import { CatalegComponent } from './pages/cataleg/cataleg.component';
import { PreferitsPanelComponent } from './components/preferits-panel/preferits-panel.component';

export const routes: Routes = [
  { path: '', component: CatalegComponent },
  { path: 'preferits', component: PreferitsPanelComponent },
  { path: '**', redirectTo: '' }
];