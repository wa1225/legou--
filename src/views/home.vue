<template>
  <div>
    <div id="content"></div>
  </div>
</template>
<script>
import * as echarts from 'echarts';
import 'echarts-gl';

export default {
  mounted() {
    //当组件一加载就渲染 数据图表（数据可视化）
    var ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
    let mycahrt = echarts.init(document.getElementById("content"));
    let options = {
      backgroundColor: '#000',
    globe: {
        baseTexture: ROOT_PATH + '/data-gl/asset/earth.jpg',

        shading: 'lambert',

        environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',

        atmosphere: {
            show: true
        },

        light: {
            ambient: {
                intensity: 0.1
            },
            main: {
                intensity: 1.5
            }
        }
    },
    series: []
    };
    //设置配置项
    mycahrt.setOption(options)
  },
};
</script>
<style scoped>
*{
    background-color: #000;
}
#content {
  width: 100%;
  height: 85vh;
  background-color: aqua;
  margin: 0 auto;
}
</style>