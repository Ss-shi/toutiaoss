import request from '../utils/request'
import { API_PHOTO, API_PROFILE } from '../constant/api'
export function uploadImg (params) {
  let form = new FormData()
  form.append('photo', params.file)
  return request({
    url: API_PHOTO,
    method: 'patch',
    data: form
  })
}
export function getUserInfo () {
  return request({ url: API_PROFILE })
}
