import { Injectable } from '@angular/core';
import {PropertiesModel} from './properties.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private selectedElement: HTMLElement;
  private styleDeclaration: PropertiesModel = {};


  public setElement(ele: HTMLElement) {
    this.selectedElement = ele;

    this.styleDeclaration = {};

    this.styleDeclaration = {
      ...this.getCssStyles(ele)
    };
  }

  public getCssStyles(element): PropertiesModel {
    return {
      ...window.getComputedStyle(element, null) || {}
    } as PropertiesModel;
  }

  public setStyle(element, styleProp, value) {
    return element.css(styleProp, value);
  }

  public getStyle(element, styleProp): string {
    return this.styleDeclaration[styleProp];
  }

  constructor() { }
}
