import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagePageComponent implements OnInit {
  readonly message =
    this.route.snapshot.fragment ||
    this.route.snapshot.data.message ||
    'Page not found';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
