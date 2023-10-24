import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-selecthouseonmap',
  templateUrl: './selecthouseonmap.component.html',
  styleUrls: ['./selecthouseonmap.component.scss']
})
export class SelecthouseonmapComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  data = [
    {
      itemsList: [
        {
          options: [
            {
              img: 'assets/map/drag-the-map-bg.png',
              type: 'Drag the map',
              name: 'Drag the map',
              description: 'Locate your house by dragging the map.'
            },
            {
              img: 'assets/map/use-zoom-bg.png',
              type: 'Use zoom controls',
              name: 'Zoom Controls',
              description: 'Then, use the controls to zoom in on your roof.'
            },
            {
              img: 'assets/map/drop-pin-bg.png',
              type: 'Drop a pin',
              name: 'Drop a pin',
              description: 'Description for Option 3'
            }
          ]
        }
      ]
    }
  ];


  // todo @sree I have removed all this code as it depended on the old method for building the form
  // data: any;
  // activeChildStep: number = 0;
  // i: number = 0;
  // @Output() previousStepEvent: EventEmitter<void> = new EventEmitter<void>();
  // @Output() nextStepEvent: EventEmitter<void> = new EventEmitter<void>();

  // onPreviousStepClick() {
  //   this.previousStepEvent.emit();
  // }

  // onNextStepClick() {
  //   this.nextStepEvent.emit();
  // }
  // constructor(private solarSlidesService: SolarslideshomeService) {}

  // ngOnInit(): void {
  //   this.data = this.solarSlidesService.getLocationData();
  // }

  // next() {
  //   if (this.activeChildStep < this.data.itemsList[0].options.length - 1) {
  //     this.activeChildStep++;
  //   } else {
  //     this. onNextStepClick()
  //     // Handle completion or navigate to the next step
  //   }
  // }

  getStarted() {
    
  }

  

}
