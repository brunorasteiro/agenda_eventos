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

  add(descricao: string, inicio : Date, fim : Date): void {
    descricao = descricao.trim();
    
    if (!descricao || !inicio || !fim) { return; }
    this.eventoService.addEvento({ descricao, inicio, fim } as Evento)
      .subscribe(evento => {
        this.eventos.push(evento);
      });
  }
  
  delete(evento: Evento): void {
    this.eventos = this.eventos.filter(h => h !== evento);
    this.eventoService.deleteEvento(evento).subscribe();
  }

}