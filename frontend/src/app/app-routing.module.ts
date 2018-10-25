import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosComponent }      from './eventos/eventos.component';
import { EventoDetailComponent }      from './evento-detail/evento-detail.component';

const routes: Routes = [
  // TODO se ñ estiver logado, redireciona p/ login
  { path: '', redirectTo: '/evento', pathMatch: 'full' },
  { path: 'evento', component: EventosComponent },
  { path: 'evento/:id', component: EventoDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }