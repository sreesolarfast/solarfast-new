import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="mainDiv">
    <div class="container-fluid progress-bar" >
        <div class="progress-container">
          </div>
    </div>
    <div class="container-fluid stepper-content" style="padding: 0px;">
        <div class="p-grid">
            <div >
                <div>
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    </div>
</div>
`
})
export class AppComponent {
}
