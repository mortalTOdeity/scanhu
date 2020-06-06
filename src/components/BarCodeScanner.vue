<template>
  <div class="barcode-scanner">
    <div class="scanner-container"
         v-show="!isLoading">
      <video poster="data:image/gif,AAAA"
             ref="scanner"></video>
      <div class="overlay-element"></div>
      <div class="laser"></div>
    </div>
    <!-- <div class="camera-radio-box">
      <van-radio-group
        v-model="currentCamera"
        @change="switchCamera"
        direction="horizontal"
      >
        <van-radio
          v-for="(camera, index) of cameras"
          :key="index"
          :name="camera.deviceId"
          >{{ camera.label }}</van-radio
        >
      </van-radio-group>
    </div> -->
    {{ decodeResult }}
    <div class="handle-button-box">
      <van-button type="primary"
                  @click="startScan">开始扫描</van-button>
    </div>
  </div>
</template>

<script>
import { BrowserMultiFormatReader, Exception } from '@zxing/library'

export default {
  name: 'BarCodeScanner',
  data () {
    return {
      decodeResult: '',
      cameras: [],
      currentCamera: '',
      isLoading: true,
      codeReader: new BrowserMultiFormatReader(),
      isMediaStreamAPISupported:
        navigator &&
        navigator.mediaDevices &&
        'enumerateDevices' in navigator.mediaDevices
    }
  },
  mounted () {
    try {
      if (!this.isMediaStreamAPISupported) {
        throw new Exception('设备不支持')
      } else {
        // 获取所有设备中的摄像头设备
        navigator.mediaDevices.enumerateDevices().then(devices => {
          for (let i = 0; i < devices.length; ++i) {
            const device = devices[i].toJSON()
            if (device.kind === 'videoinput') {
              this.cameras.push(device)
            }
          }
          if (this.cameras.length === 0) {
            this.$notify({ message: '无摄像头设备', type: 'danger' })
          } else {
            console.log(this.cameras)
            // 默认使用后置摄像头
            for (let i = 0; i < this.cameras.length; ++i) {
              if (this.cameras[i].label.includes('back')) {
                this.currentCamera = this.cameras[i].deviceId
                break
              }
            }
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  beforeDestroy () {
    this.codeReader.reset()
  },

  methods: {
    startScan () {
      this.codeReader.decodeFromVideoDevice(
        this.currentCamera,
        this.$refs.scanner,
        (result, err) => {
          if (result) {
            this.decodeResult = result.text
          }
        }
      )
      this.$refs.scanner.oncanplay = event => {
        this.isLoading = false
      }
    }
    // switchCamera (cameraId) {
    //   this.codeReader.reset()
    //   this.currentCamera = cameraId
    //   this.startScan()
    // }
  }
}
</script>

<style scoped>
.barcode-scanner {
  height: 100%;
}
.camera-radio-box,
.handle-button-box {
  text-align: center;
  padding: 10px;
}
video {
  width: 100%;
  height: 100%;
}
.scanner-container {
  position: relative;
  height: 55%;
}
.overlay-element {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  -webkit-clip-path: polygon(
    0% 0%,
    0% 100%,
    20% 100%,
    20% 20%,
    80% 20%,
    80% 80%,
    20% 80%,
    20% 100%,
    100% 100%,
    100% 0%
  );
  clip-path: polygon(
    0% 0%,
    0% 100%,
    20% 100%,
    20% 20%,
    80% 20%,
    80% 80%,
    20% 80%,
    20% 100%,
    100% 100%,
    100% 0%
  );
}
.laser {
  width: 60%;
  margin-left: 20%;
  background-color: tomato;
  height: 1px;
  position: absolute;
  top: 40%;
  z-index: 2;
  box-shadow: 0 0 4px red;
  -webkit-animation: scanning 2s infinite;
  animation: scanning 2s infinite;
}
@-webkit-keyframes scanning {
  50% {
    -webkit-transform: translateY(75px);
    transform: translateY(75px);
  }
}
@keyframes scanning {
  50% {
    -webkit-transform: translateY(75px);
    transform: translateY(75px);
  }
}
</style>
