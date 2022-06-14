import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StopService } from '../services/stop.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-stop',
  templateUrl: './add-stop.component.html',
  styleUrls: ['./add-stop.component.scss'],
})
export class AddStopComponent implements OnInit {
  stopForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private stopService: StopService,
    private toastService: ToastrService
  ) {
    this.stopForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.stopService.getStops();
  }

  getStops() {
    this.stopService.getStops();
  }

  addStop(){
    if(!this.stopForm.valid){
      this.toastService.error('invalid Form')
      return
    }
    this.stopService.addStop(this.stopForm.value);
    this.stopForm.reset()

  }
}
