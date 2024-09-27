export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    //postcss-px-to-viewport===================================
    'postcss-px-to-viewport-8-plugin': {
      viewportWidth: 16 * 100, // 设计稿的视口宽度
      unitPrecision: 5, // 单位转换后保留的精度
      propList: ['*'], // 能转化为vw的属性列表
      viewportUnit: 'rem', // 希望使用的视口单位
      fontViewportUnit: 'rem', // 字体使用的视口单位
      selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
      minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
      mediaQuery: true, // 媒体查询里的单位是否需要转换单位
      replace: true, //  是否直接更换属性值，而不添加备用属性
      exclude: undefined, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
      include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换
      landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
      landscapeUnit: 'rem', // 横屏时使用的单位
      landscapeWidth: 568, // 横屏时使用的视口宽度
      unitToConvert: 'px' // 要转化的单位
      //viewportWidth: 750, // UI设计稿的宽度
      //unitPrecision: 6, // 转换后的精度，即小数点位数
      //propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      //viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
      //fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
      //selectorBlackList: ["wrap"], // 指定不转换为视窗单位的类名，
      //minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      //mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
      //replace: true, // 是否转换后直接更换属性值
      //exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
      //landscape: false // 是否处理横屏情况
    }
  }
}
