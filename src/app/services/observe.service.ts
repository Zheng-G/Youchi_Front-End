import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { SuggestionCarModal } from '../modals/suggestion-car-modal/suggestion-car-modal.component';
import 'rxjs/add/operator/share';
@Injectable()
export class CommonService {
    data: SuggestionCarModal;
    private subject = new Subject<any>();
 
    sendMessage(message: string) {
        this.subject.next({ text: message });
    }
 
    clearMessage() {
        this.subject.next();
    }
     
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
    
    getData():any {
        // return this.data.Send();
    }
}