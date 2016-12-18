import {Observable} from 'rxjs/Observable'
import {map} from 'rxjs/operator/map'
import {filter} from 'rxjs/operator/filter'
import {withLatestFrom} from 'rxjs/operator/filter'

Observable.prototype.reducer = function reducer (reducerFn) {
  return map.call(this, action => ({ reducer: reducerFn, action }))
}

Observable.prototype.filterByType = function filterByType (type) {
  return filter.call(this, action => action.type === type)
}

Observable.prototype.filterByComponent = function filterByComponent (constructor) {
  return filter.call(this, action => action.childComponent === constructor)
}

Observable.prototype.mapToLatest = function mapToLatest (sourceFirst, sourceSecond) {
  if (sourceSecond) {
    return this.mapToLatest(sourceFirst).withLatestFrom(sourceSecond, (props, state) => ({props, state}))
  }
  return withLatestFrom.call(this, sourceFirst, (first, second) => second)
}
