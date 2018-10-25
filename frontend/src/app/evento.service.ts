import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Evento } from './evento';
import { MessageService } from './message.service';


const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    //'Access-Control-Allow-Origin' : '*',
    //'Access-Control-Allow-Headers': 'Content-Type'
  })
};

@Injectable({
  providedIn: 'root'
})

export class EventoService {
  private eventosUrl = 'http://127.0.0.1:8000/evento';  // URL to web api
  
  teste: Evento[];

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET eventos from the server */
  getEventos (): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.eventosUrl)
      .pipe(
        tap(_ => this.log('fetched eventos')),
        catchError(this.handleError('getEventos', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getEvento(id: number): Observable<Evento> {
    const url = `${this.eventosUrl}/${id}`;
    return this.http.get<Evento>(url)
      .pipe(
        tap(_ => this.log(`fetched evento id=${id}`)),
        catchError(this.handleError<Evento>(`getEvento id=${id}`))
      );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`EventoService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
