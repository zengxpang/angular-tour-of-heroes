import { Component,OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { IHero } from '../i-hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
  constructor(private heroService: HeroService) {}
  heroes$!: Observable<IHero[]>;
  private searchTerms = new Subject<string>();

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit():void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      // 等待每次按键事件后，再过300ms再执行下一次
      debounceTime(300),

      // ignore new term if same as previous term
      // 如果遇到和之前一样的搜索词，就忽略
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      // switchMap() 会为每个从 debounce 和 distinctUntilChanged 中通过的搜索词调用搜索服务。 它会取消并丢弃以前的搜索可观察对象，只保留最近的。
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

}
