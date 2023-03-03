import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDayTirageChad } from '../day-tirage-chad.model';

@Component({
  selector: 'jhi-day-tirage-chad-detail',
  templateUrl: './day-tirage-chad-detail.component.html',
})
export class DayTirageChadDetailComponent implements OnInit {
  dayTirage: IDayTirageChad | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dayTirage }) => {
      this.dayTirage = dayTirage;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
