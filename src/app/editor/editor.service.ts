import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class EditorService {
  public highlightedElement: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public dragElement: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public selectedElement: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }
}
