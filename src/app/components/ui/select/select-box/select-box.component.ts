import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss']
})
export class SelectBoxComponent implements OnInit {
  public htmlEle: HTMLElement;
  public selectActions: HTMLElement;
  public textEditor: HTMLElement;
  @Input() set element(val: HTMLElement) {
    if (this.htmlEle) {
      const selectBox = document.getElementById('select_box');
      this.selectActions = document.getElementById('select_actions');
      this.textEditor = document.getElementById('text_editor');
      this.htmlEle.contentEditable = 'false';
      this.selectActions.style.display = 'flex';
      this.textEditor.style.display = 'none';
      selectBox.style.border = '1px solid #17a2b8';
    }

    this.htmlEle = val;
  }

  public bounds = {
    name: '',
    type: '',
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
    display: 'none'
  };

  @Input() set boundBox(box) {
    this.bounds = box;
  }
  constructor() { }

  ngOnInit() {
  }

  public setBounds(val) {
    if (this.selectActions) {
      // TODO: Move over select and text editor when hitting the edge and covering library
      console.log('Width is Less: ', +this.selectActions.offsetWidth > +val.left || +this.selectActions.offsetWidth > +val.width);
    }

    this.bounds = {
      ...val
    };
  }

}
