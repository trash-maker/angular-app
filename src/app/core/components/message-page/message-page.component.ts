import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';

@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagePageComponent implements OnInit {
  readonly message =
    (this.state && this.state.message) ||
    this.route.snapshot.fragment ||
    this.route.snapshot.data.message ||
    'Page not found';

  constructor(private router: Router, private route: ActivatedRoute) {}

  get state(): Data | undefined {
    const currentNavigation = this.router.getCurrentNavigation();
    return (
      (this.router &&
        currentNavigation &&
        currentNavigation.extras &&
        currentNavigation.extras.state) ||
      undefined
    );
  }

  ngOnInit(): void {}
}
