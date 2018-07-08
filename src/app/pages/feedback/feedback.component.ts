import { Component, ChangeDetectorRef, OnDestroy,OnInit} from '@angular/core';
import { FEED } from '../../models/feed'
import { FEEDService } from '../../services/feed.service';
import { AppConfig } from '../../app.config';
import { NgUploaderOptions } from 'ngx-uploader';
import { Http, Response } from '@angular/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/observe.service';
import { Subscription } from 'rxjs/Subscription';
import * as $ from 'jquery';

@Component({
  selector: 'feedback',
  moduleId: module.id,
  templateUrl: './feedback.html',
  styleUrls: ['./feedback.scss'],
  providers: [CommonService]
  
})
export class FeedbackComponent implements OnDestroy {
  public feedData: FEED[];
  loadStatus: boolean = false;
  message: any;
  subscription: Subscription;
  constructor(private service: FEEDService, 
              private appConfig: AppConfig,  
              private modalService: NgbModal,
              private apiService: ApiService,
              private http: Http,
              private cdr: ChangeDetectorRef,
              private observe: CommonService
             ) { 
     
    this.service.getFEED().then((data) => {
        this.feedData = data;
        console.log(this.feedData);
    })   
  }

  ngOnChanges(changes) {
  }

   ngOnDestroy() {
       
    }
}
