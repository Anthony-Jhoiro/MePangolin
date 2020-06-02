import {Component, OnInit} from '@angular/core';
import {PangolinsService} from "../services/pangolins.service";
import {Pangolin} from "../models/Pangolin";
import {faUndoAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {
  pangolin: Pangolin;
  returnIcon = faUndoAlt;
  foodModel = [];

  constructor(private pangolinService: PangolinsService) {
  }

  ngOnInit(): void {
    this.pangolinService.getProfile()
      .subscribe(pangolin => {
        this.pangolin = pangolin;
        this.foodModel = pangolin.food.map(e => {
          return {
            display: e,
            value: e
          };
        })
      });
  }

  onSubmit () {
    this.pangolin.food =this.foodModel.map(e=>e.value);
    this.pangolinService.updatePangolin(this.pangolin)
      .subscribe();
  }

}
