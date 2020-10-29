import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
  Inject
} from "@angular/core";
import {
  MatPaginator,
  MatTableDataSource,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { Observable } from "rxjs/internal/Observable";
import { MovieService } from "src/app/shared/services/movie.service";

@Component({
  selector: "sipnosis-dialog",
  templateUrl: "sipnosis-dialog.html",
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

  getMovie(){
    this.movieService.getMoviesId(this.data.id)
        .subscribe((Data) => {
          console.log('Dialog', Data.data);
          this.movie = Data.data;
        });
  }

}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  urlTest = "http://image.tmdb.org/t/p/w500/ohj9zYG2zSD69yfM3RF4xAKTl1j.jpg";
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  obs: Observable<any>;
  movies: any[] = [];
  dataSource: MatTableDataSource<any>;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private movieService: MovieService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.movies);
  }

  ngOnInit() {
    this.getMovies();
  }

  openDialog(id: string): void {
    //console.log(item.order.id);
   
    const dialogRef = this.dialog.open(SipnosisActivityComponentDialog, {
      width: 'auto',
      data: {id}
    });
    
    /*dialogRef.afterClosed().subscribe(result => {

    });*/
  }

  getMovies() {
    this.movieService.getMovies().subscribe((data) => {
      console.log(data);
      this.movies = data["data"].results;
      this.movies.forEach((element) => {
        element.release_date = Date.parse(element.release_date);
      });

      console.log(this.movies);
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
