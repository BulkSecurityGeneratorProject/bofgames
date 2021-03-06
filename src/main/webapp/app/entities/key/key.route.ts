import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Key } from 'app/shared/model/key.model';
import { KeyService } from './key.service';
import { KeyComponent } from './key.component';
import { KeyDetailComponent } from './key-detail.component';
import { KeyUpdateComponent } from './key-update.component';
import { KeyDeletePopupComponent } from './key-delete-dialog.component';
import { IKey } from 'app/shared/model/key.model';

@Injectable({ providedIn: 'root' })
export class KeyResolve implements Resolve<IKey> {
  constructor(private service: KeyService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IKey> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Key>) => response.ok),
        map((key: HttpResponse<Key>) => key.body)
      );
    }
    return of(new Key());
  }
}

export const keyRoute: Routes = [
  {
    path: '',
    component: KeyComponent,
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.key.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: KeyDetailComponent,
    resolve: {
      key: KeyResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.key.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: KeyUpdateComponent,
    resolve: {
      key: KeyResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.key.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: KeyUpdateComponent,
    resolve: {
      key: KeyResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.key.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const keyPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: KeyDeletePopupComponent,
    resolve: {
      key: KeyResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'bofgamesApp.key.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
