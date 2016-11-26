/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FoodPostService } from './food-post.service';

describe('FoodPostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoodPostService]
    });
  });

  it('should ...', inject([FoodPostService], (service: FoodPostService) => {
    expect(service).toBeTruthy();
  }));
});
