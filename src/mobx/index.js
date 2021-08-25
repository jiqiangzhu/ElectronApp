import { observable, action } from 'mobx'

class Store {
  @observable number = 0
  @action add = () => {
    console.log('number', number)
    this.number++
  }
}

export default Store;
