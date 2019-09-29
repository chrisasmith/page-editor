import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {SelectionModel} from '@angular/cdk/collections';

export interface SavedPage {
  name: string;
  created: string;
  createdBy: string;
  updated?: string;
  updatedBy?: string;
  edit?: string;
  clone?: string;
  delete?: string;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  private rowId: number;
  private rowButtons = {
    edit: 'edit',
    clone: 'file_copy',
    delete: 'delete_forever',
  };

  public displayedColumns: string[] = ['name', 'created', 'createdBy', 'edit', 'clone', 'delete'];
  public dataSource = new MatTableDataSource<SavedPage>();
  public pageTemplates: any[] = new Array(20);

  public selected: number = null;
  public savedPagesData: SavedPage[] = [
    {
      name: 'Sample Saved Page',
      created: 'Sept 20, 2019 12:56 PM',
      createdBy: 'Chris Smith',
      ...this.rowButtons,
    }
  ];

  constructor(private router: Router,
              protected santizer: DomSanitizer) { }

  ngOnInit() {
    this.dataSource.data = this.savedPagesData;
    this.dataSource.paginator = this.paginator;
  }

  public updateTableText(val: string) {
    return this.santizer.bypassSecurityTrustHtml(val);
  }

  public loadEditor() {
    this.router.navigate(['editor']);
  }

  public rowAction(evt: MouseEvent, ele: SavedPage) {
    const btnEle: HTMLElement = evt.target as HTMLElement;
    console.log('Action Button: ', btnEle.textContent);
    switch (btnEle.textContent) {
      case 'edit':
        this.loadEditor();
        break;
      case 'file_copy':
        break;
      case 'delete_forever':
        break;
    }
    evt.cancelBubble = true;
    evt.preventDefault();
  }

  public onRowSelected(evt: MouseEvent, row: SavedPage, idx: number) {
   console.log('Row: ', evt, row, idx);
   this.rowId = idx;

   evt.cancelBubble = true;
   evt.preventDefault();
  }

  public setItemRowState(id: number): boolean {
    return id === this.rowId;
  }

  public openSlider(idx: number) {
    this.selected = idx;
  }
}
