import * as utils from '@/utils'

export const transGeoToFeature = (geos: any = []) => {
  let features: any[] = []
  utils.items.packAttrToArr(geos, (item) => features.push(item.toGeoJSON()))
  return features
}

export const trans84to02 = <T>(feature: T): T =>
  maptalks.CRSTransform.transform(feature, 'WGS84', 'GCJ02')

export const trans02to84 = <T>(feature: T): T =>
  maptalks.CRSTransform.transform(feature, 'GCJ02', 'WGS84')
