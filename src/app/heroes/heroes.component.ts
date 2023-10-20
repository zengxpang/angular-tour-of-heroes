import {Component, OnInit} from '@angular/core';
import {IHero} from "../i-hero";
import {HeroService} from "../hero.service";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit{
  heroes: IHero[] = []

  constructor(private heroService: HeroService,private messageService:MessageService) {}

  getHeroes(): void {
    // 同步
    // this.heroes = this.heroService.getHeroes()

    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes)
  }

  add(name: string): void {
    name = name.trim()
    if (!name) { return }
    this.heroService.addHero({name} as IHero).subscribe(hero => this.heroes.push(hero))
  }

  delete(hero: IHero): void {
    this.heroes = this.heroes.filter(h => h !== hero)
    this.heroService.deleteHero(hero.id).subscribe()
  }

  // 你固然可以在构造函数中调用 getHeroes()，但那不是最佳实践。而是选择在 ngOnInit 生命周期钩子中调用 getHeroes()
  ngOnInit(): void {
    this.getHeroes()
  }
}
