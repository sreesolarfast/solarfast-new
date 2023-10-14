import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SolarslideshomeService } from 'src/app/services/solar-slides/solarslideshome.service';

@Component({
  selector: 'app-selecthouseonmap',
  templateUrl: './selecthouseonmap.component.html',
  styleUrls: ['./selecthouseonmap.component.scss']
})
export class SelecthouseonmapComponent implements OnInit{
  data: any;
  activeChildStep: number = 0;
  i: number = 0;
  @Output() previousStepEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextStepEvent: EventEmitter<void> = new EventEmitter<void>();

  onPreviousStepClick() {
    this.previousStepEvent.emit();
  }

  onNextStepClick() {
    this.nextStepEvent.emit();
  }
  
  constructor(private solarSlidesService: SolarslideshomeService) {}

  ngOnInit(): void {
    this.data = this.solarSlidesService.getLocationData();
  }

  next() {
    if (this.activeChildStep < this.data.itemsList[0].options.length - 1) {
      this.activeChildStep++;
    } else {
      this. onNextStepClick()
      // Handle completion or navigate to the next step
    }
  }

  getStarted() {
    this. onNextStepClick()
    // Handle "Get Started" button click
  }

}
