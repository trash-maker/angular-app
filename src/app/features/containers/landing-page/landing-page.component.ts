import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent implements OnInit {
  title = 'app';
  version = environment.version;

  constructor() {}

  ngOnInit(): void {}
}
