import { TestBed } from '@angular/core/testing';

import { RecipeViewsService } from './recipe-views.service';

describe('RecipeViewsService', () => {
  let service: RecipeViewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeViewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
