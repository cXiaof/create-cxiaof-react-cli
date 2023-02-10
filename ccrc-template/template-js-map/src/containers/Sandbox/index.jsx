import { useEffect } from 'react'

const Sandbox = () => {
  useEffect(() => {
    window.map = new maptalks.Map('map', {
      center: [121.6508, 31.1758],
      zoom: 11,
      baseLayer: new maptalks.TileLayer('base_tile', {
        urlTemplate:
          'https://wprd{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7',
        subdomains: ['01', '02', '03', '04'],
        placeholder: true,
        maxAvailableZoom: 18,
      }),
    })
    return () => {
      if (window.map instanceof maptalks.Map) window.map.remove()
    }
  }, [])

  return <div id='map' className='absolute h-full w-full'></div>
}

export default Sandbox
