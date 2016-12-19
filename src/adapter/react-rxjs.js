import React from 'react'
import ReactDOM from 'react-dom'

import { Subject } from 'rxjs/Subject'
import {Observable} from 'rxjs/Observable'
import {of} from 'rxjs/observable/of'

import {fromEvent} from 'rxjs/observable/fromEvent'
import {merge} from 'rxjs/observable/merge'

import {share} from 'rxjs/operator/share'
import {map} from 'rxjs/operator/map'
import {filter} from 'rxjs/operator/filter'
import {_switch} from 'rxjs/operator/switch'
import {_do} from 'rxjs/operator/do'

const O = {
  map: (source, ...args) => share.call(map.apply(source, args)),
  filter: (source, ...args) => {
    if (!(source instanceof Subject)) {
      source = of(source)
    }
    return share.call(filter.apply(source, args))
  },
  switch: (source, ...args) => share.call(_switch.apply(source, args)),
  do: (source, ...args) => share.call(_do.apply(source, args)),
  merge: (...args) => share.call(merge(...args)),
  fromEvent: (...args) => share.call(fromEvent(...args)),
  next: (subject, ...args) => subject.next(...args),
  subscribe: (source, ...args) => source.subscribe(...args),
  unsubscribe: (source, ...args) => source.unsubscribe(...args)
}

export default {
  BaseComponent: React.Component,
  createElement: React.createElement,
  findDOMNode: ReactDOM.findDOMNode,
  render: ReactDOM.render,
  O,
  Subject
}

export const jsx = React.createElement

export {
  React,
  ReactDOM,
  O,
  Subject
}
