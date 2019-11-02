import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecordingComponent} from './Components/recording.component';
import {PatientInterfaceComponent} from './Components/patient.interface.component';

const routes: Routes = [
  { path: '', component: PatientInterfaceComponent},
  { path: 'patients', component: PatientInterfaceComponent},
  { path: 'record/:id', component: RecordingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
