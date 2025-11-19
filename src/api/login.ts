import { post } from '@/utils/request'
import type { PromiseResult } from '@/utils/request'

export const login = (data: any): Promise<PromiseResult> => {
  return new Promise((resolve, reject) => {
    post('/home/index/login', data)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
