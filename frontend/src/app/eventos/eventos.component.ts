import { Component, OnInit } from '@angular/core';

import { Evento } from '../evento';
import { EventoService } from '../evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  eventos: Evento[];
  
  constructor(private eventoService: EventoService) { }

  ngOnInit() {
    this.getEventos();
  }
    
  getEventos(): void {
    this.eventoService.getEventos()
      .subscribe(eventos => this.eventos = eventos);
  }
}