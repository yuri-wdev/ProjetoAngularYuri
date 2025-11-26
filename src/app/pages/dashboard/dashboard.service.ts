import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VeiculosAPI, Veiculo } from '../../../models/veiculo.model';

export interface VehicleData {
  id: number;
  odometro: number;
  nivelCombustivel: number;
  status: string;
  lat: number;
  long: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3001'; // Ajustado para sua API real

  // Busca lista de veículos para o Dropdown e Cards [cite: 74, 75]
  getVehicles(): Observable<Veiculo[]> {
    return this.http.get<VeiculosAPI>(`${this.apiUrl}/vehicles`).pipe(
      map(response => response.vehicles) // O PDF/Model diz que retorna um objeto { vehicles: [...] }
    );
  }

  // Busca dados de telemetria pelo VIN 
  getVehicleData(vin: string): Observable<VehicleData> {
    return this.http.post<VehicleData>(`${this.apiUrl}/vehicleData`, { vin });
  }
}