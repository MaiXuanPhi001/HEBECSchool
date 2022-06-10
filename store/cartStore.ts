import AsyncStorage from "@react-native-async-storage/async-storage";
import { action, computed, makeAutoObservable, observable } from "mobx";

class Store{
    constructor(){
        makeAutoObservable(this)
}
@observable cart: any[] = [];
@observable totalQuantity: number = 0;
@observable total: number = 0;
@observable isLoading: boolean = false;

@computed get getCart(){
    return this.cart;
}
@computed get getTotalQuantity(){
    return this.totalQuantity;
}
@computed get getTotal(){
    return this.total;
}
@computed get getIsLoading(){
    return this.isLoading;
}

@action
addToCart = async (book: any, quantity: any) => {
    const index = this.cart.findIndex(item => item.book.id === book.id);
    if(index !== -1){
        this.cart[index].quantity += quantity;
    }else{
        this.cart.push({
            book,
            quantity
        });
}
this.totalQuantity += quantity;
this.total += Number(book.price) * quantity;
await AsyncStorage.setItem("cart", JSON.stringify(this.cart));
}
@action
clearCart = async () => {
    this.cart = [];
    this.totalQuantity = 0;
    this.total = 0;
    await AsyncStorage.setItem("cart", JSON.stringify(this.cart));
}
@action
getCartFromStore = async () => {
    const cart = await AsyncStorage.getItem("cart");
    this.totalQuantity = 0;
    this.total = 0;
    if(cart){
        this.cart = JSON.parse(cart);
        this.cart.forEach(item => {
            this.totalQuantity += item.quantity;
            this.total += Number(item.book.price) * item.quantity;
        });
    }
}
@action
updateCart = async (book: any, quantity: any) => {
    const index = this.cart.findIndex(item => item.book.id === book.id);
    if(quantity === 0){
        this.cart.splice(index, 1);
    }else{
        this.cart[index].quantity = quantity;
    }
    this.totalQuantity = 0;
    this.total = 0;
    this.cart.forEach(item => {
        this.totalQuantity += item.quantity;
        this.total += Number(item.book.price) * item.quantity; });
    await AsyncStorage.setItem("cart", JSON.stringify(this.cart));    
}
@action 
reloadCart = async () => {
    this.isLoading = true;
    const cart = await AsyncStorage.getItem("cart");
    if(cart){
        this.cart = JSON.parse(cart);
        this.totalQuantity = 0;
        this.total = 0;
        this.cart.forEach(item => {
            this.totalQuantity += item.quantity;
            this.total += Number(item.book.price) * item.quantity;
        });
    }
    this.isLoading = false;
}
}

const cartStore = new Store();
export default cartStore;