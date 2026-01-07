import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkItem, WorkItemStatus, WorkItemsService } from '../api/work-items';

@Component({
  selector: 'app-work-items',

  standalone: true,
  //imports are like mini modules needed by this component
  //CommonModule --> *ngIf,  *ngFor, date pipe, etc (read docs to learn more)
  // ReactiveForms Module --> formControl binding + validation
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './work-items.html',
  styleUrl: './work-items.css',
})
export class WorkItems implements OnInit {

  /**
   * State that the template reads.
   * When these values change, Angular re-renders the template.
   */
  items: WorkItem[] = [];
  loading = false;
  error: string | null = null;

  title = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(2)],
  });

  statuses: WorkItemStatus[] = ['Open', 'InProgress', 'Done'];

  /**
   * Dependency injection:
   * creates single shared instance of WorkItemsService.
   */
  constructor(private api: WorkItemsService) {}

  /**
   * Lifecycle hook:
   * ngOnInit runs once when the component is created --> UseEffect[] on React
   */
  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.loading = true;
    this.error = null;

    // HTTP returns an Observable -> we subscribe to get the result async
    this.api.getAll().subscribe({
      next: (items) => {
        this.items = items;
        this.loading = false;
      },
      error: (e) => {
        console.error(e);
        this.error = 'Failed to load work items.';
        this.loading = false;
      },
    });
  }

  add(): void {
    // Reactive forms can check validity without manual checks
    if (this.title.invalid) return;

    const value = this.title.value.trim();
    if (!value) return;

    this.api.create(value).subscribe({
      next: () => {
        // reset input
        this.title.setValue('');
        // reload list
        this.refresh();
      },
      error: (e) => {
        console.error(e);
        this.error = 'Failed to create work item.';
      },
    });
  }

  setStatus(item: WorkItem, status: WorkItemStatus): void {
    this.api.updateStatus(item.id, status).subscribe({
      next: () => this.refresh(),
      error: (e) => {
        console.error(e);
        this.error = 'Failed to update status.';
      },
    });
  }

  remove(item: WorkItem): void {
    this.api.delete(item.id).subscribe({
      next: () => this.refresh(),
      error: (e) => {
        console.error(e);
        this.error = 'Failed to delete work item.';
      },
    });
  }
}
