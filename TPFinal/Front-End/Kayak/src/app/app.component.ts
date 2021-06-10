import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Kayak';
  constructor(private titleService: Title, private router: Router,
    private activatedRoute: ActivatedRoute){}

      setDocTitle(title: string) {
        this.titleService.setTitle(title);
      }

    ngOnInit() {
      const appTitle = this.titleService.getTitle();
      this.router
        .events.pipe(
          filter(event => event instanceof NavigationEnd),
          map(() => {
            let child = this.activatedRoute.firstChild;
            while (child.firstChild) {
              child = child.firstChild;
            }
            if (child.snapshot.data['title']) {
              return child.snapshot.data['title'];
            }
            return appTitle;
          })
        ).subscribe((ttl: string) => {
          this.titleService.setTitle("Kayak-"+ ttl);
        });
    }
}
