import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { RouterLink } from '@angular/router';

// CORREÇÃO 1: O arquivo está na mesma pasta, use apenas ./dashboard.service
import { DashboardService, VehicleData } from './dashboard.service';

// CORREÇÃO 2: Caminho correto para voltar até a pasta models (subir 3 níveis)
import { Veiculo } from '../../../models/veiculo.model'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  // CORREÇÃO 3: Ajustar nomes para bater com seus arquivos (dashboard.html e dashboard.css)
  templateUrl: './dashboard.html', 
  styleUrls: ['./dashboard.css'] 
})
export class Dashboard implements OnInit {
  
  private dashboardService = inject(DashboardService);

  todosVeiculos: Veiculo[] = [];
  veiculoSelecionado: Veiculo | null = null;
  
  dadosTelemetria: VehicleData | null = null;
  erroTelemetria: boolean = false;

  private searchSubject = new Subject<string>();

  ngOnInit() {
    this.carregarVeiculos();
    this.configurarBuscaVin();
  }

  carregarVeiculos() {
    this.dashboardService.getVehicles().subscribe({
      // CORREÇÃO 4: Tipagem explícita para resolver erro "implicitly has an 'any' type"
      next: (veiculos: Veiculo[]) => {
        this.todosVeiculos = veiculos;
        if (this.todosVeiculos.length > 0) {
          this.veiculoSelecionado = this.todosVeiculos[0];
        }
      },
      error: (err: any) => console.error('Erro ao carregar veículos', err)
    });
  }

  aoSelecionarVeiculo() {
    // Lógica do select
  }

  buscarVin(termo: string) {
    this.searchSubject.next(termo);
  }

  private configurarBuscaVin() {
    this.searchSubject.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((vin) => {
        this.erroTelemetria = false;
        if (!vin) return [];
        return this.dashboardService.getVehicleData(vin).pipe(
            catchError(error => {
                console.error(error);
                this.erroTelemetria = true;
                this.dadosTelemetria = null;
                return [];
            })
        );
      })
    ).subscribe((dados: any) => { // Use 'any' ou 'VehicleData' se o compilador reclamar
      if (dados && !this.erroTelemetria) {
        this.dadosTelemetria = dados as VehicleData;
      }
    });
  }
}