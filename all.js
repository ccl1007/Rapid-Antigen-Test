let map = L.map("map", {
  center: [24.173188212752365, 120.67684804724759],
  zoom: 20,
});

let Icon = new L.Icon({
  iconUrl: "https://gosaico.com/images/svg/logo.svg",
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

//加入圖層
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

//定義座標
let greenIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// 加入奇點無限座標
L.marker([24.173188212752365, 120.67684804724759], { icon: Icon })
  .addTo(map)
  .bindPopup("奇點無限")
  .openPopup();

//新增Clustert插件圖層來放icon群組
let markers = new L.MarkerClusterGroup().addTo(map);

//定義資料
let data = [];

axios
  .get("https://raw.githubusercontent.com/SiongSng/Rapid-Antigen-Test-Taiwan-Map/data/data/antigen_open_street_map.json"
  )
  .then((res) => {
    data = res.data.features;
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      markers.addLayer(
        L.marker(
          [data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]],
          { icon: greenIcon }
        )
          .bindPopup(`<p><strong style="font-size: 20px;">${data[i].properties.name}</strong></p>
       <span>品牌: ${data[i].properties.brands}</br>
      <strong style="font-size: 16px;">剩餘 
      ${data[i].properties.count} 份 (每份五個)
      </strong><br>
      地址: ${data[i].properties.address}<br>
      電話: ${data[i].properties.phone}<br>
      備註: ${data[i].properties.note}<br>
      <small>最後更新時間: ${data[i].properties.updated_at}</small></span>`)
      );
    }
  });
