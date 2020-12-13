import Vue from 'vue'

import SvgIcon from '@/components/svgIcon' // svg组件
import SvgUse from "@/components/SvgUse";

// 注册到全局
Vue.component('svg-icon', SvgIcon)
Vue.component('svg-use', SvgUse)


const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
console.log(req.resolve);
requireAll(req)

