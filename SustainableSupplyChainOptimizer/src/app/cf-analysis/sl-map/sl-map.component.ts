import { Component } from '@angular/core';
import * as  $ from 'jquery'
@Component({
  selector: 'app-sl-map',
  standalone: true,
  templateUrl: './sl-map.component.html',
  styleUrl: './sl-map.component.scss'
})
export class SlMapComponent {


  constructor() {

  }

  ngOnInit() {

    function showTooltip(evt, text) {
      debugger

    }
  }

  showTooltip(evt, text) {

    let tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = text;
    tooltip.style.display = "block";
    tooltip.style.left = evt.layerX + 10 + 'px';
    tooltip.style.top = evt.layerY + 10 + 'px';
  }

  hideTooltip() {

    var tooltip = document.getElementById("tooltip");
    tooltip.style.display = "none";
  }

  ngAfterViewInit() {

    $('.svg-menu__path__seleccion').on("click", function (e) {
      $('.active').removeClass('active');
      $(this).addClass('active');
      //alert('evento');
    });
  }

  getViewBox() {
    return "-600 -200 2000 3000"
  }
}
