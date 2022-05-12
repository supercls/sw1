<template>
  <div class="wrapper">
    <ul class="drawing-panel">
      <input
        type="button"
        class="draw-btn"
        value="开启测距"
        @click="myDis.open()"
      />
      <input
        type="button"
        class="draw-btn"
        value="关闭测距"
        @click="myDis.close()"
      />
    </ul>
    <!--startprint-->
    <div
      id="allmap"
      onselectstart="return false;"
      oncontextmenu="closePolyLine();enableDragging();"
      style="height: 100%; position: relative"
    ></div>
    <!--endprint-->
  </div>
</template>
<script>
import iconMark from "./images/marker_red_sprite.png";
import { useStore } from "vuex";
import { defineComponent, onMounted, computed, ref } from "vue";
export default defineComponent({
  data() {
    return {
      myDis: null,
    };
  },
  setup() {
    const store = useStore();
    const Robot = computed(() => {
      return store.state.Robot;
    });
    return{
        Robot
    }
  },
  mounted() {
    var outputPath = "tiles/";
    var minLevel = 5;
    var maxLevel = 10;
    var centX =this.Robot.socket1.curLng;
    var centY = this.Robot.socket1.curLat;
    var format = ".jpg";
    var pointsStr = `${centX}$${centY}"`;

    var defaultCursor = null;
    var lineArray = new Array(); //线集合
    var currLine = ""; //当前画线
    var polyflag = true; //画线开关
    var isFixedMap = true;

    var tileLayer = new BMap.TileLayer();
    tileLayer.getTilesUrl = function (tileCoord, zoom) {
      var x = tileCoord.x;
      var y = tileCoord.y;
      var url =
        "http://192.168.20.143:9000/public/baidumaps/" +
        zoom +
        "/" +
        x +
        "/" +
        y +
        format;
      return url;
    };
    var tileMapType = new BMap.MapType("tileMapType", tileLayer, {
      minZoom: minLevel,
      maxZoom: maxLevel,
    });
    var map = new BMap.Map("allmap", { mapType: tileMapType });

    //初始化鼠标
    defaultCursor = map.getDefaultCursor();
    // 定位到地图中心点
    map.centerAndZoom(new BMap.Point(centX, centY), maxLevel);
    // 添加导航控件
    map.addControl(new BMap.NavigationControl());
    // 启用滚轮放大缩小
    map.enableScrollWheelZoom();
    map.enableContinuousZoom();
    //启用键盘操作
    map.enableKeyboard();

    this.myDis = new BMapLib.DistanceTool(map);

    var myIcon = new BMap.Icon(iconMark, new BMap.Size(52, 26));
    // 创建Marker标注，使用小车图标
    var pt = new BMap.Point(centX, centY);
    var marker = new BMap.Marker(pt, {
      icon: myIcon,
    });
    // 将标注添加到地图
    map.addOverlay(marker);

    // 监听测距过程中的鼠标事件
    this.myDis.addEventListener("drawend", function (e) {
      console.log("drawend");
      console.log(e.points);
      console.log(e.overlays);
      console.log(e.distance);
    });
    this.myDis.addEventListener("addpoint", function (e) {
      console.log("addpoint");
      console.log(e.point);
      console.log(e.pixel);
      console.log(e.index);
      console.log(e.distance);
    });
    this.myDis.addEventListener("removepolyline", function (e) {
      console.log("removepolyline");
      console.log(e);
    });

    // 创建用户自定义地标
    if (pointsStr != "") {
      var points = pointsStr.split("##");
      for (var i = 0; i < points.length; i++) {
        var point = points[i];
        var info = point.split("$");
        addMarker(
          parseFloat(info[1]),
          parseFloat(info[0]),
          info[2],
          "images/marker_red_sprite.png",
          23,
          25
        );
      }
    }

    //添加自定义Marker标注
    function addMarker(
      lng,
      lat,
      markerInfo,
      iconCursor,
      cursorWidth,
      cursorHeight
    ) {
      if (cursorWidth == null) {
        cursorWidth = 23;
      }
      if (cursorHeight == null) {
        cursorHeight = 25;
      }
      var marker;
      if (iconCursor != null) {
        var myIcon = new BMap.Icon(
          iconCursor,
          new BMap.Size(cursorWidth, cursorHeight)
        );
        marker = new BMap.Marker(new BMap.Point(lng, lat), {
          icon: myIcon,
        }); // 创建标注
      } else {
        marker = new BMap.Marker(new BMap.Point(lng, lat)); // 创建标注
      }
      map.addOverlay(marker); // 将标注添加到地图中
      if (markerInfo != null) {
        marker.addEventListener("click", function () {
          alert(markerInfo);
        });
      }
    }
  },
});
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
#allmap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
}

#l-map {
  height: 100%;
  width: 78%;
  float: left;
  border-right: 2px solid #bcbcbc;
}

#r-result {
  height: 100%;
  width: 20%;
  float: left;
}
</style>