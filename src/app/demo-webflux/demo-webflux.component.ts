import { Component, OnInit } from '@angular/core';
import {WebfluxHttpService} from '../service/webflux-http.service';

@Component({
  selector: 'app-demo-webflux',
  templateUrl: './demo-webflux.component.html',
  styleUrls: ['./demo-webflux.component.css']
})
export class DemoWebfluxComponent implements OnInit {

  constructor(private webflux: WebfluxHttpService) { }

  demoStream = [];
  findStreamTime = '';

  demoListParallel = [];
  showLoadingParallel = false;
  findParallelTime = '';


  demoList = [];
  showLoading = false;
  findTime = '';

  ngOnInit(): void {
  }

  findStream(): void {
    this.demoStream = [];
    this.findStreamTime = '';
    const initialTime = Date.now();
    this.webflux.findDemoStream().subscribe(response => {
      const totalTime = Date.now() - initialTime;
      this.findStreamTime = 'Duracion ' + ((totalTime / 1000) % 60).toString();
      this.demoStream.push(JSON.parse(response.data));
    }, error => {
      console.log(error);
    });
  }

  findParallel(): void {
    this.demoListParallel = [];
    this.showLoadingParallel = true;
    this.findParallelTime = '';
    const initialTime = Date.now();
    this.webflux.findDemoParallel().subscribe(response => {
      const totalTime = Date.now() - initialTime;
      this.findParallelTime = 'Duracion ' + ((totalTime / 1000) % 60).toString() + ' segundos';
      this.demoListParallel = response;
      this.showLoadingParallel = false;
    }, error => {
      console.log(error);
    });
  }

  find(): void {
    this.demoList = [];
    this.showLoading = true;
    this.findTime = '';
    const initialTime = Date.now();
    this.webflux.findDemo().subscribe(response => {
      const totalTime = Date.now() - initialTime;
      this.findTime = 'Duracion ' + ((totalTime / 1000) % 60).toString() + ' segundos';
      this.demoList = response;
      this.showLoading = false;
    }, error => {
      console.log(error);
    });
  }
}
