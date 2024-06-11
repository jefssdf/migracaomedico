// UseApi.js

import { useQuasar } from 'quasar'

export const showLoading = () => {
  const $q = useQuasar()
  $q.loading.show({
    delay: 400 // ms
  })
}

export const hideLoading = () => {
  const $q = useQuasar()
  $q.loading.hide()
}
