import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage'
import BarCodeScanner from '@/components/BarCodeScanner'
import QrCodeScanner from '../components/QrCodeScanner'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'barcode',
      name: 'HomePage',
      component: HomePage,
      children: [
        {
          path: 'barcode',
          name: 'BarCodeScanner',
          component: BarCodeScanner
        },
        {
          path: 'qrcode',
          name: 'QrCodeScanner',
          component: QrCodeScanner
        }
      ]
    }
  ]
})
