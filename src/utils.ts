type DeviceType = 'mobile' | 'tablet' | 'desktop'

export function getDeviceType(): DeviceType {
  const width = window.innerWidth
  const device = width <= 768 ? 'mobile' : width <= 1024 ? 'tablet' : 'desktop'
  return device
}
