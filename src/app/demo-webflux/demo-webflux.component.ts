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
  demoList = [];
  showLoading = false;

  ngOnInit(): void {
  }

  findStream(): void {
    this.demoStream = [];
    this.webflux.findDemoStream().subscribe(response => {
      this.demoStream.push(JSON.parse(response.data));
    }, error => {
      console.log(error);
    });
  }

  find(): void {
    this.demoList = [];
    this.showLoading = true;
    this.webflux.findDemo().subscribe(response => {
      this.demoList = response;
      this.showLoading = false;
    }, error => {
      console.log(error);
    });
  }

}
