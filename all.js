let map = L.map("map", {
  center: [24.16586300126418, 120.6365095478168],
  zoom: 20,
});


//加入圖層
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

//定義座標
let Icon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/822/822586.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [30, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


//新增Clustert插件圖層來放icon群組
let markers = new L.MarkerClusterGroup().addTo(map);

//定義資料
let data = [];

axios
  .get("https://kiang.github.io/data.nhi.gov.tw/antigen.json")
  .then((res) => {
    data = res.data.features;
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      markers.addLayer(
        L.marker(
          [data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]],
          { icon: Icon }
        )
          .bindPopup(`<p><strong style="font-size: 20px;">${data[i].properties.name}</strong></p>
       <span>品牌: ${data[i].properties.brand}</br>
      <strong style="font-size: 16px;">剩餘 
      ${data[i].properties.count} 份 (每份五個)
      </strong><br>
      地址: ${data[i].properties.address}<br>
      電話: ${data[i].properties.phone}<br>
      備註: ${data[i].properties.note}<br>
      <small>最後更新時間: ${data[i].properties.updated}</small></span>`)
      );
    }
  })
  .catch((error) => {
    alert(error.message);
  });
