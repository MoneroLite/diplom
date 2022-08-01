import { makeAutoObservable } from "mobx"

export default class CategoryStore {
    constructor() {
        this._category = [
            // {id: 1, title: 'Основной форум', description: 'Обсуждение общей тематики..', img: null},
            // {id: 2, title: 'Основной форум2', description: 'Обсуждение общей тематики..2', img: null},
            // {id: 3, title: 'Основной форум3', description: 'Обсуждение общей тематики..3', img: null},
            // {id: 4, title: 'Основной форум4', description: 'Обсуждение общей тематики..4', img: null}
        ]
        // mobx будет следить за изменениями этих переменных, при их изменении компоненты будут перерендериваться
        makeAutoObservable(this)
    }

    // функции для изменения состояния (action)

    // функция принимает параметрами булевое значение и присваивает его переменной _isAuth
    setCategory(category){
        this._category = category
    }

    // геттеры нужны чтобы получать какие-то переменные из нашего состояния 
    get category(){
        return this._category
    }
}