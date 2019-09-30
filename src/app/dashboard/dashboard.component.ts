import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatPaginator, MatTabChangeEvent, MatTable, MatTableDataSource, MatSort, MatDialog, MatDialogRef} from '@angular/material';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ConfirmComponent} from '../components/ui/confirm/confirm.component';

export interface SavedPage {
  position?: number;
  active: boolean;
  name: string;
  created: string;
  createdBy: string;
  updated?: string;
  updatedBy?: string;
  edit?: string;
  clone?: string;
  delete?: string;
  remove?: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('activeTable', {static: true}) activeTable: MatTable<SavedPage>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  private rowId: number;
  private rowButtons = {
    position: 0,
    edit: 'edit',
    clone: 'file_copy',
    delete: 'delete_forever',
    remove: 'remove_from_queue'
  };

  public savedPgsColumns: string[] = ['active', 'name', 'created', 'createdBy', 'edit', 'clone', 'delete'];
  public savedPgsData: MatTableDataSource<SavedPage>;
  public activePgsColumns: string[] = ['position', 'name', 'active', 'remove'];
  public activePgsData: MatTableDataSource<SavedPage>;
  public pageTemplates: any[] = new Array(20);
  public selected: number = null;
  public savedPagesData: SavedPage[] = [
    {
      active: true,
      name: 'Sample Saved Page One',
      created: 'Sept 20, 2019 12:56 PM',
      createdBy: 'Chris Smith',
      ...this.rowButtons,
    },
    {
      active: true,
      name: 'Sample Saved Page Two',
      created: 'Sept 20, 2019 12:56 PM',
      createdBy: 'Chris Smith',
      ...this.rowButtons,
    },
    {
      active: false,
      name: 'Sample Saved Page Three',
      created: 'Sept 20, 2019 12:56 PM',
      createdBy: 'Chris Smith',
      ...this.rowButtons,
    },
    {
      active: false,
      name: 'Sample Saved Page Four',
      created: 'Sept 20, 2019 12:56 PM',
      createdBy: 'Chris Smith',
      ...this.rowButtons,
    },
    {
      active: true,
      name: 'Sample Saved Page Five',
      created: 'Sept 20, 2019 12:56 PM',
      createdBy: 'Chris Smith',
      ...this.rowButtons,
    }
  ];
  public headerText = {
    title: '',
    subtitle: ''
  };
  private headerTextOptions = [
    {
      title: 'Saved Pages',
      subtitle: 'Pages created by you or team member.'
    },
    {
      title: `Starter Templates: (${this.pageTemplates.length})`,
      subtitle: 'Editable page designs.'
    }
  ];

  constructor(private router: Router,
              private confirmDialog: MatDialog) {}

  ngOnInit() {
    this.savedPgsData = new MatTableDataSource<SavedPage>(this.savedPagesData);
    this.savedPgsData.paginator = this.paginator;
    this.savedPgsData.sort = this.sort;
    //
    this.activePgsData = new MatTableDataSource<SavedPage>(this.savedPagesData.filter(s => s.active));
    this.activePgsData.paginator = this.paginator;

    this.headerText = this.headerTextOptions[0];
  }

  public changeHeaderText(evt: MatTabChangeEvent) {
    this.headerText = this.headerTextOptions[evt.index];
  }

  public loadEditor() {
    this.router.navigate(['editor']);
  }

  public dropTable(event: CdkDragDrop<SavedPage[]>) {
    const prevIndex = this.activePgsData.data.findIndex((d) => d === event.item.data);
    moveItemInArray(this.activePgsData.data, prevIndex, event.currentIndex);
    this.activePgsData.data = [...this.activePgsData.data];
  }

  public changeActiveState(evt: MouseEvent, ele: SavedPage) {
    if (!ele.active) {
      this.activePgsData.data = [...this.activePgsData.data, ele];
      ele.active = true;
    } else {
      this.openConfirmationDialog(ele);
    }
    evt.cancelBubble = true;
    evt.preventDefault();
  }
  public rowAction(evt: MouseEvent, ele: SavedPage) {
    const btnEle: HTMLElement = evt.target as HTMLElement;
    switch (btnEle.textContent) {
      case 'edit':
        this.loadEditor();
        break;
      case 'file_copy':
        break;
      case 'delete_forever':
        break;
      case 'remove_from_queue':
        this.openConfirmationDialog(ele);
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

  private openConfirmationDialog(ele: SavedPage) {
    this.confirmDialog.open(ConfirmComponent, {
      data: {
        delete: () => {
          this.activePgsData.data = this.activePgsData.data.filter(d => d.name !== ele.name);
          ele.active = false;
        },
        text: `Are you sure you want to remove ${ele.name} from the active screens list?`,
        title: 'Remove Active Screen!'}
    });
  }
}
