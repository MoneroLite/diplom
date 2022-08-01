import { makeAutoObservable } from "mobx"

export default class PostStore {
    constructor() {
        this._post = [
            // {id: 1, title: 'пост1', question: 'Обсуждение поста1', date:null, idUser: 1, idCategory: 1},
            // {id: 2, title: 'пост2', question: 'Обсуждение поста2', date:null, idUser: 1, idCategory: 3},
            // {id: 3, title: 'пост3', question: 'Обсуждение поста3', date:null, idUser: 1, idCategory: 2},
        ]
        this._comment = [
            {id: 1, text: 'коммент1 к 1 посту', date:null, idUser: 3, idPost: 1},
            {id: 2, text: 'коммент2 к 1 посту', date:null, idUser: 2, idPost: 1},
            {id: 3, text: 'коммент3 к 2 посту', date:null, idUser: 2, idPost: 2},
            {id: 4, text: 'коммент4 к 1 посту', date:null, idUser: 3, idPost: 1},
            {id: 5, text: 'коммент5 к 3 посту', date:null, idUser: 2, idPost: 3},
            {id: 6, text: 'коммент6 к 2 посту', date:null, idUser: 2, idPost: 2},
            {id: 7, text: 'коммент7 к 3 посту', date:null, idUser: 2, idPost: 3},
        ]
        // mobx будет следить за изменениями этих переменных, при их изменении компоненты будут перерендериваться
        makeAutoObservable(this)
    }

    // функции для изменения состояния (action)

    // функция принимает параметрами булевое значение и присваивает его переменной _isAuth
    setPost(post){
        this._post = post
    }
    setComment(comment){
        this._comment = comment
    }

    // геттеры нужны чтобы получать какие-то переменные из нашего состояния 
    get post(){
        return this._post
    }
    get comment(){
        return this._comment
    }
}