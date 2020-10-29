import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
  Inject,
} from '@angular/core';
import {
  MatPaginator,
  MatTableDataSource,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material';
import { Observable } from 'rxjs/internal/Observable';
import { MovieService } from 'src/app/shared/services/movie.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: "sipnosis-dialog",
  templateUrl: 'sipnosis-dialog.html',
})
export class SipnosisActivityComponentDialog {
  movie: any;
  constructor(
    private movieService: MovieService,
    public dialogRef: MatDialogRef<SipnosisActivityComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getMovie();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  getMovie() {
    this.movieService.getMoviesId(this.data.id).subscribe((Data) => {
      this.movie = Data.data;
    });
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  urlTest = 'http://image.tmdb.org/t/p/w500/ohj9zYG2zSD69yfM3RF4xAKTl1j.jpg';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  SearchForm: FormGroup;
  submitted = false;
  search = '';
  obs: Observable<any>;
  movies: any[] = [];
  dataSource: MatTableDataSource<any>;
  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private movieService: MovieService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.movies);
  }

  ngOnInit() {
    this.SearchForm = this.formBuilder.group({
      search: ['', [Validators.required, Validators.minLength(2)]],
    });
    this.getMovies();
  }
  get f() {
    return this.SearchForm.controls;
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(SipnosisActivityComponentDialog, {
      width: 'auto',
      data: { id },
    });
  }
  movieSearch() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.SearchForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Porfavor ingrese al menos dos caracteres',
      });
      return;
    }

    this.search = this.SearchForm.value.search;
    if (this.SearchForm.valid) {
      this.movieService.getMoviesSearch(this.search).subscribe((data) => {
        this.movies = data['data'].results;
        this.movies.forEach((element) => {
          element.release_date = Date.parse(element.release_date);
        });

        this.dataSource = new MatTableDataSource(this.movies);
        this.changeDetectorRef.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
      });
    }
  }

  getMovies() {
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data['data'].results;
      this.movies.forEach((element) => {
        element.release_date = Date.parse(element.release_date);
      });

      this.dataSource = new MatTableDataSource(this.movies);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    });
  }
  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}
