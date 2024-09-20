import { Component, Input } from '@angular/core';
import * as  $ from 'jquery'
@Component({
  selector: 'app-sl-map',
  standalone: true,
  templateUrl: './sl-map.component.html',
  styleUrl: './sl-map.component.scss'
})
export class SlMapComponent {

  @Input() localData;
  ungrouped = []

  emissionsByDistrict = []


  constructor() {

  }

  ngOnInit() {
    let jsonArr = JSON.parse(this.localData) as any[]

    jsonArr.forEach(x => {
      let combined = [...this.ungrouped, ...x.companyDataList];
      this.ungrouped = combined;
    })

    let res = this.ungrouped.reduce((acc, { district, emissions }) => {
      if (!acc[district]) {
        acc[district] = 0;
      }
      acc[district] += emissions;
      return acc;
    }, {});

    let rawData: any = Object.entries(res).map(([key, value]) => {
      if (typeof value === 'number') {
        return { key, value: parseFloat(value.toFixed(2)) };
      }
      return { key, value };
    });

    // Sort the data in descending order based on value
    const sortedData = [...rawData].sort((a, b) => b.value - a.value);

    // Determine the length of each segment
    const segmentLength = Math.ceil(sortedData.length / 3);

    // Create the color mapping
    this.emissionsByDistrict = sortedData.map((item, index) => {
      let color;
      if (index < segmentLength) {
        color = { class: 'text-danger', text: 'High' }; // highest values
      } else if (index < segmentLength * 2) {
        color = { class: 'text-warning', text: 'Moderate' }; // highest values
      } else {
        color = { class: 'text-success', text: 'Low' }; // highest values
      }

      return { ...item, color };
    });

    console.log(this.emissionsByDistrict);

  }

  showTooltip(evt, text) {
    let emission = this.emissionsByDistrict.find(x => x.key == text)
    let tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = ` 
    <div class="p-4 text-start">
       <h6>District : <b class='font-weight-bold'>${text}</b></h6>

       <h6>Total Emission : <b class='font-weight-bold'>${emission.value}</b></h6>
       <h6>Intensity : <b class='font-weight-bold ${emission.color.class}'>${emission.color.text}</b></h6>
    </div>
    `;
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
