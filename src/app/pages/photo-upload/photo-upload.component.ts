import { Component } from '@angular/core';
import { FormService } from 'src/shared/service/form.service';

@Component({
  selector: 'photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.scss']
})
export class PhotoUploadComponent {

    imageDtos = [];

    constructor(
        private formService: FormService,
    ) {}


    ngOnInit(): void {
        const step = this.formService.getSteps().filter(x => x.component == 'photo-upload')[0];
        if (step != this.formService.activeStep) {
          this.formService.redirectToCorrectStep();
        }
    }

    openImageUpload() {
        //this will open the image upload dialog to select a file to upload

    }

    isConfirmButtonReady() {
        //logic for checking if all images have been uploaded and user can confirm selection

        return true;
    }
    confirmButton() {
        this.formService.next();
    }

    backButton() {
        this.formService.back();
    }
}

