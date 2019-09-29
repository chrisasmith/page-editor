import {
  Component, ElementRef, NgZone,
  OnDestroy,
  OnInit, Renderer2,
  ViewChild
} from '@angular/core';
import {HighlightBoxComponent} from '../components/ui/select/highlight-box/highlight-box.component';
import {EditorService} from './editor.service';
import {skipUntil, takeUntil} from 'rxjs/operators';
import {fromEvent, Observable, Subject} from 'rxjs';
import {SelectBoxComponent} from '../components/ui/select/select-box/select-box.component';
import {LibraryService} from './panels/library/library.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  @ViewChild('highlight', {static: true} ) highlight: HighlightBoxComponent;
  @ViewChild('selectBox', {static: true} ) selectBox: SelectBoxComponent;
  @ViewChild('iconDrag', {static: true} ) iconDrag: ElementRef;

  @ViewChild('iframe', {static: true}) iframe: ElementRef;

  private unsubscribe: Subject<any> = new Subject<any>();

  public dragIcon = '';
  public isPreviewMode = false;
  public selectedElement: HTMLElement;
  public showBorders = '1';
  public srcDocContent = '';
  public isDragging = false;
  public elementInfo = {
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
  private contentArea;
  private mousedown$: Observable<MouseEvent>;
  private mouseup$: Observable<MouseEvent>;
  private mousemove$: Observable<MouseEvent>;
  private elementMouseIsOver: HTMLElement;
  private dragElement = null;

  constructor(private router: Router,
              private renderer: Renderer2,
              private sanitizer: DomSanitizer,
              private ngZone: NgZone,
              private editorSrv: EditorService,
              private librarySrv: LibraryService) { }

  ngOnInit() {
    this.editorSrv.dragElement
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((s: {id: string, icon: string}) => {
        if (!s) { return; }
        if (s.id === '') {
          this.dragElement = null;
          this.isDragging = false;
        } else  {
          this.dragElement = s.id;
        }
        this.dragIcon = s.icon;
      });

    this.contentArea = document.querySelector('#content');
    this.mousedown$ = fromEvent(this.contentArea, 'mousedown');
    this.mouseup$ = fromEvent(this.contentArea, 'mouseup');

    this.mousedown$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        if (this.dragElement) { this.isDragging = true; }
    });

    this.mouseup$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((evt: MouseEvent) => {
      if (!this.mousemove$) { this.register(); }
      this.drop(this.dragElement);

      evt.cancelBubble = true;
      evt.preventDefault();
    });

    fromEvent(this.contentArea, 'scroll' )
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        if (this.elementMouseIsOver.id || this.elementMouseIsOver.id !== '') {
          this.updateSelectionBox();
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private register() {
    this.mousemove$ = null;

    this.ngZone.runOutsideAngular(() => {
      this.mousemove$ = fromEvent(this.contentArea, 'mousemove');
    });

    this.mousemove$ = this.mousemove$.pipe(skipUntil(this.mousedown$));
    this.mousemove$ = this.mousemove$.pipe(takeUntil(this.mouseup$));
    this.mousemove$.subscribe((e: any) => {
      this.handleMouseMove(e);
    });
  }

  public drop(data) {
    if (!data) {
      return;
    }
    this.elementMouseIsOver.append(this.librarySrv.component(data));
    this.dragElement = null;
    this.isDragging = false;
  }

  public handleMouseMove(evt: MouseEvent) {
    if (this.dragElement) { this.isDragging = true; }
    if (this.isDragging) {
      this.renderer.setStyle(this.iconDrag.nativeElement, 'left', `${evt.clientX - 60}px`);
      this.renderer.setStyle(this.iconDrag.nativeElement, 'top', `${evt.clientY - 55}px`);
    }

    this.ngZone.runOutsideAngular(() => {
      this.elementMouseIsOver = document.elementFromPoint(evt.clientX, evt.clientY) as HTMLElement;
    });

    const el = evt.composedPath()[0];
    if (this.elementMouseIsOver.id || this.elementMouseIsOver.id !== '') {
      this.elementInfo = this.setElementInfo(el);
    }
    // Cancel Bubble and Prevent Default
    if (this.selectedElement) {
      if (!this.selectedElement.contentEditable) {
        evt.cancelBubble = true;
        evt.preventDefault();
      }
    } else {
      evt.cancelBubble = true;
      evt.preventDefault();
    }
  }

  public updateSelectionBox() {
    setTimeout(() => {
      this.elementInfo = this.setElementInfo(this.selectedElement);
      this.selectBox.setBounds(this.elementInfo);
    }, 5);
  }

  public setPreviewMode(): boolean {
    const previewMode = this.isPreviewMode = !this.isPreviewMode;
    if (previewMode) {
      // TODO: FIX THIS... come up with better solution
      document.getElementById('select_box').style.display = 'none';
      const content = this.contentArea as HTMLElement;
      // TODO: NEED TO MAKE THIS CLEANER...
      this.srcDocContent = `
        <html>
          <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
            <style>
                html {
                  margin: 0;
                  width: 100%;
                  height: 100%;
                }
                body {
                    margin: 0;
                    width: 100%;
                    height: 100%;
                    font-size: 1rem;
                    font-weight: 400;
                    line-height: 1.5;
                    color: #212529;
                    text-align: left;
                    background-color: #fff;
                }
                .main {
                  width: 100%;
                  height: 100%;
                }
                #content {
                  display: flex;
                  flex-direction: row;
                  flex-flow: wrap;
                  justify-items: flex-start;
                  align-items: flex-start;
                  background-color: white;
                  height: auto;
                  overflow: scroll;
                  overflow-x: hidden;
                }
            </style>
          </head>
          <body>
            <div class="main" id="main">
              ${content.outerHTML}
            </div>
            <!-- Optional JavaScript -->
            <!-- jQuery first, then Popper.js, then Bootstrap JS -->
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
          </body>
        </html>
      `;
    }
    return previewMode;
  }

  public setBordersMode() {
    this.showBorders = this.showBorders === '1' ? '0' : '1';
    const ele = document.querySelectorAll('[data-item-border]');
    ele.forEach(e => {
      e.attributes[1].value = this.showBorders;
    });
  }

  public handleMouseUp(evt: MouseEvent) {
    evt.cancelBubble = true;
    evt.preventDefault();
    // this.selectBox.htmlEle.style.display = '';
    if (this.elementMouseIsOver.id || this.elementMouseIsOver.id !== '') {
      if (this.selectedElement !== this.elementMouseIsOver) {
        this.elementMouseIsOver.contentEditable = 'false';
      }
      this.selectedElement = this.elementMouseIsOver;
      // this.editorSrv.selectedElement.next(this.selectedElement);

      // TODO: FIX THIS...
      document.getElementById('select_box').style.display = 'block';

      this.updateSelectionBox();

    }
  }

  public gotoDashboard(): void {
    this.router.navigate(['dashboard']);
  }

  private setElementInfo(el) {
    const {bottom, height, left, right, top, width, x, y} = el.getBoundingClientRect();
    return {
      name: el.nodeName,
      type: '',
      bottom,
      height,
      left,
      right,
      top,
      width,
      x,
      y,
      display: 'block'
    };
  }
}
