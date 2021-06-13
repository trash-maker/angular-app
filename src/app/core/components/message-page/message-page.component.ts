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

  private readonly currentNavigation = this.router.getCurrentNavigation();

  constructor(private router: Router, private route: ActivatedRoute) {}

  get state(): Data | undefined {
    return (
      (this.currentNavigation &&
        this.currentNavigation.extras &&
        this.currentNavigation.extras.state) ||
      undefined
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}
}
